<template>
  <div class="component-item">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="输入框">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="选择框">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"/>
          <el-option label="区域二" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="多选框">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"/>
          <el-checkbox label="地推活动" name="type"/>
          <el-checkbox label="线下主题活动" name="type"/>
          <el-checkbox label="单纯品牌曝光" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选框">
        <el-radio-group v-model="form.resource">
          <el-radio label="True"/>
          <el-radio label="False"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Property',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options5: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value10: []
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>
  .component-item{
    min-height: 400px;
  }
</style>
