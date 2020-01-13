<template>
  <div>
    <el-col :span="20">
      <el-form v-show="!jsonMode" ref="projectForm" :model="projectForm" :rules="rules" label-width="100px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="projectForm.type" placeholder="请选择标注类型">
            <el-option label="单类别检测" value="Detection"/>
            <el-option label="多类别检测" value="MultiClassDetection"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSetName">
          <el-select v-model="projectForm.dataSetName" placeholder="请选择数据来源" @change="handleDatasetChange">
            <el-option v-for="item in dataset" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="类别设置" prop="classification">
          <div>
            <el-row>
              <el-input
                v-if="inputVisible"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-class"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-class" size="small" @click="showInput">+ New Class</el-button>
              <el-col :span="8">
                <el-col :span="8" class="line" style="text-align: center">选择边框颜色:</el-col>
                <el-col :span="4">
                  <el-color-picker
                    v-model="strokeColor"
                    show-alpha/>
                </el-col>
                <el-col :span="8" class="line" style="text-align: center">选择覆盖颜色:</el-col>
                <el-col :span="4">
                  <el-color-picker
                    v-model="fillColor"
                    show-alpha/>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-tag
                v-for="tag in projectForm.classification"
                :key="tag.value"
                :disable-transitions="false"
                :color="tag.strokeColor"
                closable
                type="info"
                style="font-size: 20px;color:#fff"
                @close="handleRemoveTag(tag)">
                {{ tag.value }}
              </el-tag>
            </el-row>
          </div>

        </el-form-item>
        <el-form-item
          v-for="(property, index) in projectForm.properties"
          :label="'属性' + (index+1)"
          :key="index"
          :prop="'properties.' + index + '.value'"
        >
          <el-select v-model="property.type" placeholder="请选择属性类型" @change="onPropertyTypeChange(property)">
            <el-option label="Input" value="Input"/>
            <el-option label="Binary Classification" value="Binary Classification"/>
            <el-option label="Multiple Classification" value="Multiple Classification"/>
            <el-option label="Multiple Choice" value="Multiple Choice"/>
          </el-select>
          <el-button type="danger" @click.prevent="removeProperty(property)">删除</el-button>
          <el-input v-model="property.name" style="margin-top: 10px" placeholder="请输入属性名称"/>

          <div v-if="property.type!=='Input'&& property.type!==''">
            <el-tag
              v-for="option in property.options"
              :key="option"
              :disable-transitions="false"
              closable
              @close="handleRemoveOptions(property,option)">
              {{ option }}
            </el-tag>
            <el-select
              v-model="property.default"
              :multiple="property.type ==='Multiple Choice'"
              clearable
              placeholder="请选择属性默认值">
              <el-option v-for="item in property.options" :key="item" :label="item" :value="item"/>
            </el-select>
            <el-input
              v-if="property.inputVisible"
              :ref="'property' + index"
              v-model="property.inputValue"
              class="input-new-tag"
              @keyup.enter.native="handleAddOptions(property,property.inputValue,property.type)"
              @blur="handleAddOptions(property,property.inputValue,property.type)"
            />
            <el-button v-else type="primary" class="button-new-tag" @click="showOptionInput(property, index)">+ New Option
            </el-button>
          </div>
          <el-input
            v-else-if="property.type ==='Input'"
            v-model="property.default"
            style="margin-top: 10px"
            placeholder="请输入属性默认值"/>

        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addProperty">添加属性</el-button>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" @click="submitForm('projectForm')">立即创建</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
    <json-editor v-show="jsonMode" ref="jsonEditor" v-model="jsonData"/>
  </div>
</template>

<script>
import jsonData from '@/utils/project'
import JsonEditor from '@/components/JsonEditor'
import { valProjectName, createProject, fetchDataset } from '@/api/project'

export default {
  name: 'Settings',
  components: { JsonEditor },
  data() {
    var validateProjectName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入项目名称'))
      } else {
        valProjectName(value).then(response => {
          if (response.success) {
            callback()
          } else {
            callback(new Error('项目名已存在'))
          }
        })
      }
    }
    return {
      jsonMode: false,
      jsonData: {},
      inputVisible: false,
      inputValue: '',
      strokeColor: 'rgba(19, 206, 102, 1)',
      fillColor: 'rgba(19, 206, 102, 0.5)',
      dataset: [],
      categories: {},
      projectForm: {
        name: 'Fast Wash Test',
        type: 'Detection',
        dataSetName: '',
        classification: [{
          value: 'target',
          fillColor: 'rgba(19, 206, 102, 0.2)',
          strokeColor: 'rgba(19, 206, 102, 1)'
        }, {
          value: 'ignore',
          fillColor: 'rgba(30, 195, 201, 0.2)',
          strokeColor: 'rgba(30, 195, 201, 1)'
        }],
        properties: [],
        status: 'new',
        progress: 0
      },
      rules: {
        name: [
          { validator: validateProjectName, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择标注类型', trigger: 'change' }
        ],
        dataSetName: [
          { required: true, message: '请选择数据来源', trigger: 'change' }
        ],
        classification: [
          { type: 'array', required: true, message: '请至少添加一个类别', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.setDefaultValue(jsonData)
    this.getDataset()
    this.getRandomColor()
  },
  methods: {
    getDataset() {
      fetchDataset().then(response => {
        if (response.success) {
          response.data.forEach(item => {
            this.dataset.push(item['dataSetName'])
            item['categories'].forEach((ctg,index) => {
              this.getRandomColor()
              // ctg['id'] = (index+1).toString()
              ctg['fillColor'] = this.fillColor
              ctg['strokeColor'] = this.strokeColor
            })
            this.categories[item['dataSetName']] = item['categories']
          })
        } else {
          this.$message({
            message: '获取数据集失败',
            type: 'warning'
          })
        }
      })
    },
    handleDatasetChange(val) {
      if (val !== '') {
        this.projectForm.classification = []
        this.categories[val].forEach(ctg => {
          this.projectForm.classification.push({
            id: ctg.id,
            value: ctg.name,
            fillColor: ctg.fillColor,
            strokeColor: ctg.strokeColor
          })
        })
      }
    },
    setJsonMode(val) {
      if (val) {
        this.jsonData = this.projectForm
        // this.jsonData.properties.forEach(item => {
        //   item.inputVisible = undefined
        //   item.inputValue = undefined
        // })
        this.jsonMode = val
      } else {
        try {
          this.projectForm = JSON.parse(this.jsonData)
          // this.projectForm.properties.forEach(item => {
          //   item.inputVisible = false
          //   item.inputValue = ''
          // })
          this.jsonMode = val
        } catch (e) {
          console.log(e)
          this.$message({
            message: 'JSON格式错误',
            type: 'warning'
          })
        }
      }
    },
    setDefaultValue(value) {
      try {
        var defaultValue = JSON.parse(value)
        if (defaultValue !== null) {
          this.projectForm.name = defaultValue.projectName
          this.projectForm.type = defaultValue.projectType
          this.projectForm.classification = defaultValue.classification
          // console.log(defaultValue)
          if (defaultValue.properties !== undefined) {
            defaultValue.properties.forEach(item => {
              this.projectForm.properties.push({
                name: item.name,
                type: item.type,
                options: item.options,
                default: item.default,
                inputVisible: false,
                inputValue: ''
              })
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    removeProperty(item) {
      var index = this.projectForm.properties.indexOf(item)
      if (index !== -1) {
        this.projectForm.properties.splice(index, 1)
      }
    },
    addProperty() {
      this.projectForm.properties.push({
        name: '',
        type: '',
        options: [],
        default: '',
        inputVisible: false,
        inputValue: ''
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var index = 0
          this.projectForm.properties.forEach(item => {
            item.id = index++
            item.inputVisible = undefined
            item.inputValue = undefined
          })
          createProject(this.projectForm).then(response => {
            if (response.success) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '创建失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemoveTag(tag) {
      this.projectForm.classification.splice(this.projectForm.classification.indexOf(tag), 1)
    },
    handleRemoveOptions(property, option) {
      property.options.splice(property.options.indexOf(option), 1)
      if (property.default === option) {
        property.default = ''
      }
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showOptionInput(property, index) {
      property.inputVisible = true
      this.$nextTick(_ => {
        // console.log(this.$refs)
        // console.log(this.$refs['property' + index])
        this.$refs['property' + index][0].focus()
      })
    },

    getRandomColor() {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      this.fillColor = 'rgba(' + r + ',' + g + ',' + b + ',0.3)'
      this.strokeColor = 'rgba(' + r + ',' + g + ',' + b + ',1)'
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        let exist = false
        this.projectForm.classification.forEach(item => {
          if (item.value === inputValue) {
            exist = true
          }
        })
        if (exist) {
          this.inputVisible = false
          this.inputValue = ''
          this.$message({
            message: '类别已存在',
            type: 'warning'
          })
          return
        }
        this.projectForm.classification.push({
          value: inputValue,
          fillColor: this.fillColor,
          strokeColor: this.strokeColor
        })
        this.getRandomColor()
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    handleAddOptions(property, option, type) {
      if (option) {
        let error = false
        if (property.options.length >= 2 && type === 'Binary Classification') {
          this.$message({
            message: '只能有两个选项',
            type: 'warning'
          })
          error = true
        }
        if (property.options.indexOf(option) !== -1) {
          this.$message({
            message: '选项已存在',
            type: 'warning'
          })
          error = true
        }
        if (!error) {
          property.options.push(option)
        }
      }
      property.inputVisible = false
      property.inputValue = ''
    },
    onPropertyTypeChange(property) {
      property.options = []
      if (property.type === 'Multiple Choice') {
        property.default = []
      } else {
        property.default = ''
      }
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-class {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-class {
  width: 120px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-new-tag {
  margin-top: 10px;
  height: 40px;
  /*line-height: 30px;*/
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  height: 40px;
  width: 120px;
  margin-top: 10px;
  vertical-align: bottom;
}
</style>
