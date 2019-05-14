<template>
  <div class="app-container">
    <el-table v-loading="listLoading" ref="annotationTable" :data="list" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column align="center" label="Position" >
        <template slot-scope="scope">
          <span>{{ scope.row.box }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Class">
        <template slot-scope="scope">
          <span>{{ scope.row.tag }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Property">
        <template slot-scope="scope">
          <span>{{ scope.row.prop }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <!--      <el-table-column min-width="300px" label="Title">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <template v-if="row.edit">-->
      <!--            <el-input v-model="row.title" class="edit-input" size="small" />-->
      <!--            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">-->
      <!--              cancel-->
      <!--            </el-button>-->
      <!--          </template>-->
      <!--          <span v-else>{{ row.title }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column align="center" label="Actions" width="120">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(row)">-->
      <!--            Ok-->
      <!--          </el-button>-->
      <!--          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit=!row.edit">-->
      <!--            Edit-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AnnotationTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        newAnnotation: 'success',
        originalAnnotation: 'primary',
        editAnnotation: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      currentRow: null
    }
  },
  computed: {
    ...mapState({
      annotationEditsFlag: state => state.detection.annotationEditsFlag,
      currentAnnotation: state => state.detection.currentAnnotation,
      shape: state => state.detection.shape,
      selectedItems: state => state.detection.selectedItems
    })
  },
  watch: {
    annotationEditsFlag: function(val) {
      if (val === true) {
        this.setAnnotationEditsFlag(false)
        const items = paper.project.getItems({
          // className: function(className) {
          //   return (className === 'Path')
          // }
          data: {
            type: 'box'
          }
        })
        this.list = []
        for (const item of items) {
          const re_tl = this.Abs2rel([item.bounds.x, item.bounds.y])
          const re_wh = this.Abs2rel([item.bounds.width, item.bounds.height])
          // console.log(item)
          this.list.push({
            id: item.data.id,
            box: [re_tl.x, re_tl.y, re_wh.x, re_wh.y],
            status: item.data.status,
            tag: item.data.class,
            prop: item.data.prop
          })
        }
      }
    },
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        if (this.selectedItems[0].data.id !== undefined) {
          var select = this.list.filter(item => item.id === this.selectedItems[0].data.id)
          this.$refs.annotationTable.setCurrentRow(select[0])
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions({
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag'
    }),
    setCurrent(row) {
      this.$refs.annotationTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      if (val !== null) {
        this.currentRow = val
        // const items = paper.project.getItems({
        //   className: function(className) {
        //     return (className === 'Path')
        //   }
        // })
        // paper.project.selectedItems = items.filter(item => item.data.id === val.id)
        // console.log(paper.project.selectedItems)
      }
    },
    async getList() {
      this.listLoading = true
      this.listLoading = false
    },
    Abs2rel(pt) {
      return {
        x: Math.round(this.shape[1] * pt[0] / paper.view.viewSize.width),
        y: Math.round(this.shape[0] * pt[1] / paper.view.viewSize.height)
      }
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
