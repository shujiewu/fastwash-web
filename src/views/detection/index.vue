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
          </el-card>
        </div>
      </el-col>
      <el-col :lg="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>类别设置</span>
          </div>
          <classification/>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>属性设置</span>
          </div>
          <property/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import toolbar from './editor/Toolbar'
import editor from './editor/Editor'
import classification from './editor/Classification'
import property from './editor/Property'
export default {
  components: {
    toolbar,
    editor,
    classification,
    property
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
    // this.fetchData()
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
</style>
