<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :lg="18">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <toolbar @nextItem="getItem" @resetItem="resetItem"/>
            </div>
            <editor ref="editor" @setProgress="setProgress"/>
            <div style="margin-top: 20px" >
              <span>标注进度：</span>
              <span>{{ total-remain }}</span>
              <span>/</span>
              <span>{{ total }}</span>
              <el-progress :percentage="percentage" :show-text="false" :stroke-width="14" style="margin-top: 10px"/>
            </div>
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
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>当前标注</span>
        </div>
        <annotationTable/>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getConfig } from '@/api/detection'
import toolbar from './editor/Toolbar'
import editor from './editor/Editor'
import classification from './editor/Classification'
import property from './editor/Property'
import annotationTable from './editor/AnnotationTable'
import { mapActions } from 'vuex'
export default {
  components: {
    toolbar,
    editor,
    classification,
    property,
    annotationTable
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
      remain: 0,
      total: 0,
      percentage: 0
    }
  },
  mounted() {
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      setClassification: 'detection/setClassification',
      setProperty: 'detection/setProperty'
    }),
    fetchData() {
      getConfig().then(response => {
        this.setClassification(response.data.classification)
        this.setProperty(response.data.property)
      })
    },
    getItem() {
      this.$refs.editor.load()
    },
    resetItem() {
      this.$refs.editor.resetAnnotation()
    },
    setProgress(remain, total) {
      this.remain = remain
      this.total = total
      if (remain !== undefined && total !== undefined && remain > 0 && total > 0) {
        this.percentage = Math.round((total - remain) / total * 100)
      }
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
