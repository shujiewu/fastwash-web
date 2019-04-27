<template>
  <!--  <el-container>-->
  <div class="header">
    <el-button-group>
      <tool-move
        id="tool-move"
        :active="(activeTool === 'move')"
        @click.native="activeTool = 'move'"/>
      <tool-rectangle
        id="tool-rectangle"
        :active="(activeTool === 'rectangle')"
        @click.native="activeTool = 'rectangle'"/>
    </el-button-group>
    <el-select v-model="state" placeholder="切换模式" @change="onStateChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-button-group style="float: right">
      <el-button type="primary" icon="el-icon-warning" @click="resetItem">重置</el-button>
      <tool-submit/>
      <el-button type="primary" @click="nextItem">下一张<i class="el-icon-arrow-right el-icon--right"/></el-button>
    </el-button-group>
  </div>
<!--  </el-container>-->
</template>

<script>
import toolRectangle from './tools/Rectangle.vue'
import toolMove from './tools/Move.vue'
import toolSubmit from './tools/Submit.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Toolbar',
  components: {
    'toolRectangle': toolRectangle,
    'toolMove': toolMove,
    'toolSubmit': toolSubmit
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
  methods: {
    ...mapActions({
      setState: 'detection/setState'
    }),
    nextItem() {
      this.$emit('nextItem')
      this.setState('edit')
      this.state = 'edit'
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
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        this.$emit('resetItem')
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
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
