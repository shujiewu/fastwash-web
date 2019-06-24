<template>
  <div>
    <el-table
      v-loading="listLoading"
      ref="annotationTable"
      :data="list"
      :show-header="showHeader"
      highlight-current-row
      style="width: 100%"
      size="mini"
      @current-change="handleCurrentChange">

      <el-table-column align="center" label="Id" min-width="10">
        <template slot-scope="scope">
          <div :style="{ background: tagFilter(scope.row.tag), color:'#FFFFFF'}">{{ scope.row.id }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Position" min-width="45">
        <template slot-scope="scope">
          <span>{{ scope.row.box }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" min-width="25">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusNameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        min-width="15">>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'

/** 标注列表 **/
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
    },
    statusNameFilter(status) {
      const statusMap = {
        newAnnotation: 'new',
        originalAnnotation: 'original',
        editAnnotation: 'edit'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      showHeader: false,
      currentRow: null
    }
  },
  computed: {
    ...mapState({
      annotationEditsFlag: state => state.detection.annotationEditsFlag,
      currentAnnotation: state => state.detection.currentAnnotation,
      shape: state => state.detection.shape,
      selectedItems: state => state.detection.selectedItems,
      classification: state => state.detection.classification
    })
  },
  watch: {
    // 监听是否被修改的事件, 用于每一行的改变状态
    annotationEditsFlag: function(val) {
      if (val === true) {
        this.setAnnotationEditsFlag(false)
        const items = paper.project.getItems({
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
        if (this.selectedItems.length > 0) {
          if (this.selectedItems[0].data.id !== undefined) {
            var select = this.list.filter(item => item.id === this.selectedItems[0].data.id)
            this.$refs.annotationTable.setCurrentRow(select[0])
          }
        } else {
          this.$refs.annotationTable.setCurrentRow(null)
        }
      }
    },
    // 监听是否被选中的事件
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        if (this.selectedItems[0].data.id !== undefined) {
          var select = this.list.filter(item => item.id === this.selectedItems[0].data.id)
          this.$refs.annotationTable.setCurrentRow(select[0])
        }
      } else {
        this.$refs.annotationTable.setCurrentRow(null)
      }
    }
  },
  methods: {
    ...mapActions({
      setSelectedItems: 'detection/setSelectedItems',
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag'
    }),
    tagFilter(tag) {
      var res = '#fff'
      this.classification.forEach(item => {
        if (item.value === tag) {
          res = item.strokeColor
        }
      })
      return res
    },
    setCurrent(row) {
      this.$refs.annotationTable.setCurrentRow(row)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleCurrentChange(val) {
      if (val !== null) {
        this.currentRow = val
        const items = paper.project.getItems({
          data: {
            type: 'box',
            id: val.id
          }
        })
        if (items.length > 0) {
          paper.project.deselectAll()
          items[0].selected = true
          this.setSelectedItems(paper.project.selectedItems)
        }
      }
    },
    // 列表中删除box
    handleDelete(val) {
      if (val !== null) {
        var id = val.id
        const items = paper.project.getItems({
          data: {
            type: 'box',
            id: id
          }
        })
        items.forEach(box => {
          if (box.data.type === 'box') {
            id = box.data.id
          }
          box.parent.remove()
        })
        if (id !== '') {
          const items = paper.project.getItems({
            className: 'Path'
          })
          const textItems = paper.project.getItems({
            className: 'PointText'
          })
          textItems.forEach(item => {
            if (item.content > id) {
              item.content = item.content - 1
            }
          })
          items.forEach(item => {
            if (item.data.id > id) {
              item.data.id = item.data.id - 1
            }
          })
        }
        this.setSelectedItems([])
        this.setAnnotationEditsFlag(true)
      }
    },
    Abs2rel(pt) {
      return {
        x: Math.round(this.shape[1] * pt[0] / paper.view.viewSize.width),
        y: Math.round(this.shape[0] * pt[1] / paper.view.viewSize.height)
      }
    }
  }
}
</script>

<style>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
