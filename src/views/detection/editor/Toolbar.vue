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
      <el-button type="success">删除</el-button>
    </el-button-group>
    <!--    <el-select v-model="value" placeholder="显示选择">-->
    <!--      <el-option-->
    <!--        v-for="item in options"-->
    <!--        :key="item.value"-->
    <!--        :label="item.label"-->
    <!--        :value="item.value"/>-->
    <!--    </el-select>-->
    <el-button-group style="float: right">
      <tool-submit/>
      <el-button type="primary">下一张<i class="el-icon-arrow-right el-icon--right"/></el-button>
    </el-button-group>
  </div>
<!--  </el-container>-->
</template>

<script>
import toolRectangle from './tools/Rectangle.vue'
import toolMove from './tools/Move.vue'
import toolSubmit from './tools/Submit.vue'
export default {
  name: 'Toolbar',
  components: {
    'toolRectangle': toolRectangle,
    'toolMove': toolMove,
    'toolSubmit': toolSubmit
  },
  data() {
    return {
      activeTool: 'move'
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
