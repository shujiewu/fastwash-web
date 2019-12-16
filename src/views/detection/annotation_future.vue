<template>
  <div>
    <!--<el-col :lg="4" class="settings">-->
    <!--</el-col>-->
    <el-col :lg="24">
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
    </el-col>
    <!--<el-row>-->
      <!--<toolbar ref="toolbar" class="toolbar-group" @nextItem="getItem" @resetItem="resetItem" @deleteItem="deleteItem"/>-->
    <!--</el-row>-->
    <!--<el-row>-->
      <!--<el-col :lg="18">-->
        <!--<editor ref="editor" @setProgress="setProgress"/>-->
      <!--</el-col>-->
      <!--<el-col :lg="6" class="settings">-->
        <!--<el-collapse v-model="activeNames">-->
          <!--<el-collapse-item name="1">-->
            <!--<template slot="title">-->
              <!--<span class="title">所有标注</span>-->
            <!--</template>-->
            <!--<annotation-table class="content"/>-->
          <!--</el-collapse-item>-->
          <!--<el-collapse-item name="2">-->
            <!--<template slot="title">-->
              <!--<span class="title">类别设置</span>-->
            <!--</template>-->
            <!--<classification class="content"/>-->
          <!--</el-collapse-item>-->
          <!--<el-collapse-item name="3">-->
            <!--<template slot="title">-->
              <!--<span class="title">属性设置</span>-->
            <!--</template>-->
            <!--<property class="content"/>-->
          <!--</el-collapse-item>-->
        <!--</el-collapse>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
import { getProjectConfig } from '@/api/detection'
import toolbar from './editor/ToolbarFuture'
import editor from './editor/EditorFuture'
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
      activeNames: ['1','2', '3']
    }
  },
  mounted() {
  },
  created() {
    this.projectName = this.$route.params && this.$route.params.projectName
    this.fetchData()
  },
  methods: {
    ...mapActions({
      setClassification: 'detection/setClassification',
      setProperty: 'detection/setProperty'
    }),
    fetchData() {
      getProjectConfig(this.projectName).then(response => {
        this.setClassification(response.data.classification)
        this.setProperty(response.data.properties)
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
