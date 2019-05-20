<template>
  <div>
    <el-row>
      <div class="header">
        <i style="font-size: 26px" class="el-icon-setting"/>
        <span style="font-size: 24px">新建项目</span>
        <el-switch
          v-model="jsonMode"
          style="float: right"
          active-text="json模式"
          active-color="#13ce66"/>
      </div>

    </el-row>
    <el-row style="margin: 20px">
      <settings ref="settings"/>
    </el-row>
  </div>
<!--  <div class="app-container">-->
<!--    <el-card class="box-card">-->
<!--      <div slot="header" class="clearfix">-->
<!--        <i class="el-icon-setting"/>-->
<!--        <span>新建项目</span>-->
<!--        <el-switch-->
<!--          v-model="jsonMode"-->
<!--          style="float: right"-->
<!--          active-text="json模式"-->
<!--          active-color="#13ce66"/>-->
<!--      </div>-->
<!--      <settings ref="settings"/>-->
<!--    </el-card>-->
<!--  </div>-->
</template>

<script>
import settings from './settings'
export default {
  name: 'Info',
  components: {
    settings
  },
  data() {
    return {
      jsonMode: false
    }
  },
  watch: {
    jsonMode: function(val) {
      this.$refs.settings.setJsonMode(val)
    }
  }
}
</script>
<style scoped>
  .header {
    /*border-bottom: solid 1px rgba(255,255,255,0.10);*/
    /*padding-right: 10px;*/
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    background-color:  #fff;
    height: 60px;
    margin-top: 2px;
    padding: 18px;
    margin-bottom: 2px;
    /*padding: 3px;*/
  }
</style>
