<template>
  <!--  <el-container>-->
  <div class="header">
    <el-radio-group v-model="activeTool" fill="#67C23A">
      <tool-move
        id="tool-move"
        :active="(activeTool === 'move')"
        @click.native="activeTool = 'move'"/>
      <tool-rectangle
        id="tool-rectangle"
        :active="(activeTool === 'rectangle')"
        @click.native="activeTool = 'rectangle'"/>
<!--      <el-radio-button label="深圳"></el-radio-button>-->
      <extreme-click
        id="extreme-click"
        :active="(activeTool === 'extreme-click')"
        @click.native="activeTool = 'extreme-click'"/>
    </el-radio-group>
    <el-select v-model="state" placeholder="切换模式" @change="onStateChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-button-group style="float: right">
      <el-button type="primary" icon="el-icon-delete-solid" @click="deleteItem">清空</el-button>
      <el-button type="primary" icon="el-icon-warning" @click="resetItem">重置</el-button>
      <el-button type="primary" @click="onSubmit">提交<i class="el-icon-arrow-right el-icon--right"/></el-button>
    </el-button-group>

  </div>
<!--  </el-container>-->
</template>

<script>
import toolRectangle from './tools/Rectangle.vue'
import extremeClick from './tools/ExtremeClick.vue'
import toolMove from './tools/Move.vue'
import toolSubmit from './tools/Submit.vue'

import { mapState, mapActions } from 'vuex'
import { transformSubmit } from '@/utils/proto'
import { submitItem } from '@/api/detection'
import { uint8ToString } from '@/utils/utils'
export default {
  name: 'Toolbar',
  components: {
    'toolRectangle': toolRectangle,
    'toolMove': toolMove,
    'toolSubmit': toolSubmit,
    'extremeClick': extremeClick
  },
  data() {
    return {
      activeTool: 'move',
      options: [{
        value: 'original',
        label: '原始标注'
      }, {
        value: 'edit',
        label: '当前标注'
      }],
      state: 'edit'
    }
  },
  computed: {
    ...mapState({
      originalAnnotation: state => state.detection.originalAnnotation,
      currentAnnotation: state => state.detection.currentAnnotation
    })
  },
  methods: {
    ...mapActions({
      setState: 'detection/setState',
      saveAnnotation: 'detection/saveAnnotation'
    }),
    nextItem() {
      this.$emit('nextItem')
      this.setState('edit')
      this.state = 'edit'
    },
    deleteItem() {
      this.$confirm('此操作将清空当前标注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteItem')
      }).catch(() => {
      })
    },
    onStateChange(value) {
      this.setState(value)
    },
    resetItem() {
      this.$confirm('此操作将重置当前标注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('resetItem')
      }).catch(() => {
      })
    },
    onSubmit() {
      // 先保存当前再提交
      this.saveAnnotation()
      let frameResult = this.originalAnnotation
      frameResult.items = []
      for (const index in this.currentAnnotation) {
        const item = this.currentAnnotation[index]
        frameResult.items.push({
          box: item.box,
          itemTextUtf8: JSON.stringify({
            class: item.class,
            prop: item.prop,
            status: item.status
          })
        })
      }
      frameResult = transformSubmit(frameResult)
      // 测试反序列化是否可以
      // var b64encoded = btoa(String.fromCharCode.apply(null, frameResult))
      // var b64encoded = ''
      // var len = frameResult.byteLength
      // for (var i = 0; i < len; i++) {
      //   b64encoded += String.fromCharCode(frameResult[i])
      // }
      // b64encoded = window.btoa(b64encoded)
      // var u8_2 = new Uint8Array(atob(b64encoded).split('').map(function(c) {
      //   return c.charCodeAt(0)
      // }))
      // const MessageResponse = protoRoot.lookup('sputnik.pb.FrameResult')
      // const decodedResponse = MessageResponse.decode(u8_2)
      // console.log(decodedResponse)
      const data = {
        data: btoa(uint8ToString(frameResult))
      }
      // console.log(data)
      submitItem(data).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          })
          this.nextItem()
        } else {
          this.$notify.error({
            title: '错误',
            message: '提交失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .header {
    /*box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);*/
    background-color:  #fff;
    /*padding: 3px;*/
  }
</style>
