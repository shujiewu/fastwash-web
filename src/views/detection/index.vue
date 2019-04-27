<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :lg="18">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <toolbar @nextItem="getItem" @resetItem="resetItem"/>
            </div>
            <editor ref="editor"/>
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
import { getConfig } from '@/api/detection'
import toolbar from './editor/Toolbar'
import editor from './editor/Editor'
import classification from './editor/Classification'
import property from './editor/Property'
import { mapActions } from 'vuex'
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
