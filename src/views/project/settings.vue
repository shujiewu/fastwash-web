<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择标注类型">
          <el-option label="Detection" value="Detection"/>
          <el-option label="Video" value="Video"/>
        </el-select>
      </el-form-item>
      <el-form-item label="类别设置" prop="classification">
        <div>
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in ruleForm.domains"
        :label="'属性' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }"
      >
        <el-select v-model="ruleForm.region" placeholder="请选择属性类型">
          <el-option label="输入" value="input"/>
          <el-option label="二分类" value="Video"/>
          <el-option label="多分类" value="Detection"/>
          <el-option label="多标签" value="Video"/>
        </el-select>
        <el-input v-model="domain.value"/><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">添加属性</el-button>
      </el-form-item>
      <el-form-item label="数据来源" required>
        <!--        <el-col :span="11">-->
        <!--          <el-form-item prop="date1">-->
        <!--            <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%;"/>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="2" class="line">-</el-col>-->
        <!--        <el-col :span="11">-->
        <!--          <el-form-item prop="date2">-->
        <!--            <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%;"/>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        domains: [{
          value: ''
        }]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        classification: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.ruleForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
