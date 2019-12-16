<template>
  <div class="header">
    <el-col :lg="18">
      <el-radio-group v-model="activeTool" fill="#67C23A">
        <tool-move
          id="tool-move"
          ref="toolMove"
          :active="(activeTool === 'move')"
          @click.native="activeTool = 'move'"/>
        <tool-rectangle
          id="tool-rectangle"
          :active="(activeTool === 'rectangle')"
          @click.native="activeTool = 'rectangle'"/>
        <extreme-click
          id="extreme-click"
          :active="(activeTool === 'extreme-click')"
          @click.native="activeTool = 'extreme-click'"/>
        <!--<tool-zoom-->
          <!--id="tool-zoom"-->
          <!--:active="(activeTool === 'zoom')"-->
          <!--@click.native="activeTool = 'zoom'"/>-->
      </el-radio-group>
        <el-select v-model="currentClassId" clearable placeholder="切换类别" @change="onClassChange" style="margin-left: 10px">
          <el-option
            v-for="item in this.classification"
            :key="item.id"
            :label="item.value"
            :value="item.id"/>
        </el-select>
      <div style="float: right">
        <el-select v-model="state" placeholder="切换模式" @change="onStateChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>

        <el-button-group >
          <el-button type="primary" icon="el-icon-delete-solid" @click="deleteItem">清空</el-button>
          <el-button type="primary" icon="el-icon-warning" @click="resetItem">重置</el-button>
          <el-button type="primary" @click="onSubmit">提交<i class="el-icon-arrow-right el-icon--right"/></el-button>
        </el-button-group>
      </div>
    </el-col>
    <el-col :lg="6">
      <div style="margin-left: 10px">

        <!--<el-button type="text" style="margin-right:5px; font-size: 18px;">标注进度：{{ total-remain }}/{{ total }}</el-button>-->
        <!--<el-button type="primary" @click="onExport">导出<i class="el-icon-download el-icon&#45;&#45;right"/></el-button>-->
      </div>

    </el-col>
  </div>
</template>

<script>
import toolRectangle from './tools/Rectangle.vue'
import extremeClick from './tools/ExtremeClick.vue'
import toolMove from './tools/Move.vue'
import toolZoom from './tools/Zoom'
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
import { transformSubmit } from '@/utils/proto'
import { exportResult, submitAnnotation,submitCrowdTask } from '@/api/detection'
import { uint8ToString } from '@/utils/utils'

/** 工具栏 **/
export default {
  name: 'Toolbar',
  components: {
    'toolRectangle': toolRectangle,
    'toolMove': toolMove,
    'extremeClick': extremeClick,
    'toolZoom': toolZoom
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
      state: 'edit',
      selectBox: '',
      remain: 0,
      total: 0,
      percentage: 0,
      selectClass: this.currentClassId
      // boxList: []
    }
  },
  computed: {
    ...mapState({
      originalAnnotation: state => state.detection.originalAnnotation,
      currentAnnotation: state => state.detection.currentAnnotation,
      boxCount: state => state.detection.boxCount,
      selectedItems: state => state.detection.selectedItems,
      classification: state => state.detection.classification,
      currentClassId: state => state.detection.currentClassId,
    })
  },
  watch: {
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        if (this.selectedItems[0].data.id !== undefined && this.selectedItems[0].data.id !== this.selectBox) {
          this.selectBox = this.selectedItems[0].data.id
        }
      }
    }
  },
  /** in the future **/
  created() {
    this.projectName = this.$route.params && this.$route.params.projectName
    this.dataset = this.$route.query.dataset
    this.fileName = this.$route.query.fileName
    this.action = this.$route.query.action
    this.classId = this.$route.query.classId
  },
  mounted() {
    document.addEventListener('keydown', this.handleEvent)
  },
  methods: {
    ...mapActions({
      setState: 'detection/setState',
      saveAnnotation: 'detection/saveAnnotation',
      setSelectedItems: 'detection/setSelectedItems',
      setCurrentClassId: 'detection/setCurrentClassId'
    }),
    handleEvent(event) {
      if (event.key === 's' && event.ctrlKey) {
        this.setActiveTool('move')
        event.preventDefault()
        event.returnValue = false
        return false
      } else if (event.keyCode === 'm' && event.ctrlKey) {
        this.setActiveTool('zoom')
        event.preventDefault()
        event.returnValue = false
        return false
      } else if (event.keyCode === ',' && event.ctrlKey) {
        this.setActiveTool('rectangle')
        event.preventDefault()
        event.returnValue = false
        return false
      } else if (event.keyCode === '.' && event.ctrlKey) {
        this.setActiveTool('extreme-click')
        event.preventDefault()
        event.returnValue = false
        return false
      }
    },
    setActiveTool(val) {
      this.activeTool = val
    },
    onSelectBoxChange() {
      const items = paper.project.getItems({
        data: {
          type: 'box',
          id: this.selectBox
        }
      })
      if (items.length > 0) {
        paper.project.deselectAll()
        this.$refs.toolMove.resetSelection()
        items[0].selected = true
        this.setSelectedItems(paper.project.selectedItems)
      }
    },
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
    onClassChange(value) {
      this.setCurrentClassId(value)
      // this.$router.push({path:'/detection/annotation/'+ this.projectName, query:{dataset:this.dataset, classId: this.selectClass===''?0:this.selectClass}})
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
    setProgress(remain, total) {
      this.remain = remain
      this.total = total
      if (remain !== undefined && total !== undefined && remain > 0 && total > 0) {
        this.percentage = Math.round((total - remain) / total * 100)
      }
    },
    onExport() {
      exportResult().then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '导出失败'
          })
        }
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
          classification: { value: item.class, id: item.classId},
          property: item.prop,
          status: item.status,
          type:"crowdAnnotated"
          // itemTextUtf8: JSON.stringify({
          //
          // })
        })
        // console.log(frameResult)
      }
      // frameResult = transformSubmit(frameResult)
      // const data = {
      //  data: btoa(uint8ToString(frameResult))
      // }
      /** in the future **/
      submitCrowdTask(frameResult,this.projectName).then(response => {
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
      // submitAnnotation(frameResult, this.action, this.projectName).then(response => {
      //   if (response.success) {
      //     this.$notify({
      //       title: '成功',
      //       message: '提交成功',
      //       type: 'success'
      //     })
      //     this.nextItem()
      //   } else {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '提交失败'
      //     })
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .header {
    background-color:  #fff;
    height: 60px;
  }
</style>
