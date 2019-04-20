<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :lg="18">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <toolbar/>
            </div>
            <editor/>
            <!--            <el-button type="primary">加载</el-button>-->
          </el-card>
        </div>
      </el-col>
      <el-col :lg="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>类别设置</span>
          </div>
          <div class="component-prop">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择类别">
                <el-select
                  v-model="value10"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择标签">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="覆盖颜色">
                <el-col :span="8">
                  <el-color-picker v-model="color1" class="float:right"/>
                </el-col>
                <el-col :span="8" class="line" style="text-align: center;font-weight: bold">边框颜色</el-col>
                <el-col :span="8">
                  <el-color-picker v-model="color2" show-alpha/>
                </el-col>
              </el-form-item>
            </el-form>
            <!--            <el-form :inline="true" :model="form" label-width="80px">-->
            <!--              <el-form-item label="边框颜色">-->
            <!--                <el-color-picker v-model="color1" class="float:right"/>-->
            <!--              </el-form-item>-->
            <!--              <el-form-item label="覆盖颜色">-->
            <!--                <el-color-picker v-model="color2" show-alpha/>-->
            <!--              </el-form-item>-->
            <!--            </el-form>-->
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>属性设置</span>
          </div>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import toolbar from './editor/Toolbar'
import editor from './editor/Editor'

export default {
  components: {
    toolbar,
    editor
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
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
      value10: [],
      color1: '#409EFF',
      color2: 'rgba(19, 206, 102, 0.8)'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 720px;
  }
  .component-prop{
    min-height: 150px;
  }
  .component-item{
    min-height: 450px;
  }
</style>
