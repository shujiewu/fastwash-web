<template>
  <div>
    <el-row>
      <toolbar ref="toolbar" class="toolbar-group" @nextItem="getItem" @resetItem="resetItem" @deleteItem="deleteItem"/>
    </el-row>
    <el-row>
      <el-col :lg="18">
        <editor ref="editor" @setProgress="setProgress"/>
      </el-col>
      <el-col :lg="6" class="settings">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="title">所有标注</span>
            </template>
            <annotation-table class="content"/>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <span class="title">类别设置</span>
            </template>
            <classification class="content"/>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span class="title">属性设置</span>
            </template>
            <property class="content"/>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
  <!--      <el-card :body-style="{ padding: '0px' }" class="box-card">-->
  <!--        <div slot="header" class="clearfix">-->
  <!--          <toolbar @nextItem="getItem" @resetItem="resetItem" @deleteItem="deleteItem"/>-->
  <!--        </div>-->

  <!--      </el-card>-->

  <!--      </el-col>-->
  <!--      <el-col :lg="6">-->

  <!--        <el-card class="box-card">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span>设置</span>-->
  <!--          </div>-->

  <!--        </el-card>-->
  <!--        <el-card class="box-card">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span>属性设置</span>-->
  <!--          </div>-->

  <!--        </el-card>-->
  <!--        <el-card class="box-card">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span>所有标注</span>-->
  <!--          </div>-->
  <!--          <annotationTable/>-->
  <!--        </el-card>-->
  <!--      </el-col>-->

  <!--    <div style="margin-bottom: 10px" >-->
  <!--      <span class="title">标注进度：</span>-->
  <!--      <span>{{ total-remain }}</span>-->
  <!--      <span>/</span>-->
  <!--      <span>{{ total }}</span>-->
  <!--&lt;!&ndash;      <el-progress :percentage="percentage" :show-text="false" :stroke-width="14" style="margin-top: 10px"/>&ndash;&gt;-->
  <!--    </div>-->
  <!--    <el-row>-->
  <!--      <el-card class="box-card">-->
  <!--        <div slot="header" class="clearfix">-->
  <!--          <span>当前标注</span>-->
  <!--        </div>-->
  <!--        <annotationTable/>-->
  <!--      </el-card>-->
  <!--    </el-row>-->
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
      percentage: 0,
      activeNames: ['2', '3']
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
    deleteItem() {
      this.$refs.editor.deleteAnnotation()
    },
    setProgress(remain, total) {
      this.$refs.toolbar.setProgress(remain, total)
      // this.remain = remain
      // this.total = total
      // if (remain !== undefined && total !== undefined && remain > 0 && total > 0) {
      //   this.percentage = Math.round((total - remain) / total * 100)
      // }
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

  .editor {
    border-top: 1px solid rgba(0,0,0,.12);
    border-right: 1px solid rgba(0,0,0,.12);
    margin-top: 1px;
    padding:10px
    /*box-shadow: 0 1px 1px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);*/
  }

  .settings {
    margin-top:1px
    /*border-left: 1px solid rgba(0,0,0,.12)*/
    /*box-shadow: 0 1px 1px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);*/
  }
  .title {
    margin-left: 10px;
    font-size: 18px
  }
  .content {
    margin: 10px;
  }
  .toolbar-group {
    margin-top: 2px;
    padding: 10px;
    /*border-bottom: 1px solid rgba(0,0,0,.12)*/
  }
</style>
