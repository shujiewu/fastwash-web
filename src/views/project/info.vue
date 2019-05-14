<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-setting"/>
            <span>项目设置</span>
          </div>
          <settings/>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>类别设置</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>属性设置</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import settings from './settings'
export default {
  name: 'Info',
  components: {
    settings
  }
}
</script>
<style scoped>

</style>
