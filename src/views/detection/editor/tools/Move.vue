<template>
  <el-radio-button id="move" label="move" @click.native="initialiseTool">修改</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'

/** 拖拽操作 **/
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toolMove: null,
      hitOptions: null,
      strokeWidth: 2,
      selectionItem: null,
      hitResult: null,
      toolMode: ''
    }
  },
  computed: {
    ...mapState({
      state: state => state.detection.state,
      selectedItems: state => state.detection.selectedItems
    })
  },
  watch: {
    // 监听被选中的box变化
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        if (this.selectedItems[0] !== this.selectionItem) {
          this.selectionItem = this.selectedItems[0]
          this.toolMode = 'move'
        }
      } else {
        this.hitResult = null
        this.selectionItem = null
      }
    }
  },
  created() {
    // 鼠标按下事件
    const toolDown = event => {
      // 如果已经有选中的box,判断该box的hit事件
      if (this.selectionItem !== null) {
        this.hitResult = this.selectionItem.hitTest(event.point, this.hitOptions)
      }
      // 如果box时间未命中,则判断全局hit事件
      if (this.hitResult === null) {
        this.hitResult = paper.project.hitTest(event.point, this.hitOptions)
      }
      // 如果hit事件存在
      if (this.hitResult) {
        if (this.state === 'edit') {
          if (this.hitResult.type === 'bounds' || this.hitResult.type === 'stroke') {
            // 拖拽box的操作
            this.toolMode = 'transform'
          } else {
            // 移动box的操作
            paper.project.deselectAll()
            this.hitResult.item.selected = true
            this.toolMode = 'move'
          }
          // 设置被选中的box
          if (paper.project.selectedItems.length > 0) {
            this.selectionItem = paper.project.selectedItems[0]
            this.setSelectedItems(paper.project.selectedItems)
          } else {
            this.selectionItem = null
            this.setSelectedItems([])
          }
        } else {
          paper.project.deselectAll()
          this.hitResult.item.selected = true
          this.selectionItem = this.hitResult.item
          this.setSelectedItems(paper.project.selectedItems)
          this.toolMode = 'select'
        }
      } else {
        paper.project.deselectAll()
        this.selectionItem = null
        this.setSelectedItems([])
        this.toolMode = 'select'
      }
    }

    // 鼠标抬起事件
    const toolUp = event => {

    }

    // 鼠标拖动事件
    const toolDrag = event => {
      if (this.toolMode === 'move' && this.selectionItem !== null) {
        if (this.selectionItem.parent.children.length > 0) {
          this.selectionItem.parent.children.forEach(item => {
            item.position = item.position.add(event.delta)
          })
        } else {
          this.hitResult.item.position = this.hitResult.item.position.add(event.delta)
        }
        if (this.hitResult.item.data.status === 'originalAnnotation') {
          this.hitResult.item.data.status = 'editAnnotation'
        }
        this.setAnnotationEditsFlag(true)
      } else if (this.toolMode === 'transform' && this.selectionItem !== null) {
        let newWidth = null
        let newHeight = null
        let transfromCenter = null

        if (this.hitResult && this.hitResult.name === 'top-left') {
          newWidth = event.point.x - this.selectionItem.bounds.topRight.x
          newHeight = event.point.y - this.selectionItem.bounds.bottomLeft.y
          transfromCenter = this.selectionItem.bounds.bottomRight
        } else if (this.hitResult && this.hitResult.name === 'top-right') {
          newWidth = event.point.x - this.selectionItem.bounds.topLeft.x
          newHeight = event.point.y - this.selectionItem.bounds.bottomRight.y
          transfromCenter = this.selectionItem.bounds.bottomLeft
        } else if (this.hitResult && this.hitResult.name === 'bottom-right') {
          newWidth = event.point.x - this.selectionItem.bounds.bottomLeft.x
          newHeight = event.point.y - this.selectionItem.bounds.topRight.y
          transfromCenter = this.selectionItem.bounds.topLeft
        } else if (this.hitResult && this.hitResult.name === 'bottom-left') {
          newWidth = event.point.x - this.selectionItem.bounds.bottomRight.x
          newHeight = event.point.y - this.selectionItem.bounds.topLeft.y
          transfromCenter = this.selectionItem.bounds.topRight
        } else if (this.hitResult && this.hitResult.type === 'stroke' && this.hitResult.location.index === 0) {
          newWidth = event.point.x - this.selectionItem.bounds.rightCenter.x
          newHeight = this.selectionItem.bounds.height
          transfromCenter = this.selectionItem.bounds.rightCenter
        } else if (this.hitResult && this.hitResult.type === 'stroke' && this.hitResult.location.index === 2) {
          newWidth = event.point.x - this.selectionItem.bounds.leftCenter.x
          newHeight = this.selectionItem.bounds.height
          transfromCenter = this.selectionItem.bounds.leftCenter
        } else if (this.hitResult && this.hitResult.type === 'stroke' && this.hitResult.location.index === 1) {
          newWidth = this.selectionItem.bounds.width
          newHeight = event.point.y - this.selectionItem.bounds.bottomCenter.y
          transfromCenter = this.selectionItem.bounds.bottomCenter
        } else if (this.hitResult && this.hitResult.type === 'stroke' && this.hitResult.location.index === 3) {
          newWidth = this.selectionItem.bounds.width
          newHeight = event.point.y - this.selectionItem.bounds.topCenter.y
          transfromCenter = this.selectionItem.bounds.topCenter
        }
        // if (!isNaN(newWidth) && !isNaN(newHeight) && !isNaN(this.selectionItem.bounds.width) && !isNaN(this.selectionItem.bounds.height)) {

        if (Math.abs(newWidth) < 2 || Math.abs(newHeight) < 2) {
          return
        }

        const width = this.selectionItem.bounds.width
        const height = this.selectionItem.bounds.height

        const horizScaleFactor = Math.abs(newWidth / width)
        const vertScaleFactor = Math.abs(newHeight / height)

        if (this.selectionItem.data.status === 'originalAnnotation') {
          this.selectionItem.data.status = 'editAnnotation'
        }

        if (this.selectionItem.parent.children.length > 0) {
          this.selectionItem.parent.children.filter(item => item !== this.selectionItem).forEach(item => {
            if (item.className === 'PointText') {
              item.position = new paper.Point(this.selectionItem.bounds.x + item.bounds.width / 2 + 4, this.selectionItem.bounds.y + item.bounds.height / 2)
            } else {
              item.position = new paper.Point(this.selectionItem.bounds.x + item.bounds.width / 2, this.selectionItem.bounds.y + item.bounds.height / 2)
            }
          })
        }
        if (horizScaleFactor !== Infinity && vertScaleFactor !== Infinity) {
          this.selectionItem.scale(horizScaleFactor, vertScaleFactor, transfromCenter)
        }

        this.setAnnotationEditsFlag(true)
      }
    }

    // 鼠标移动事件
    const toolMove = event => {
      if (this.selectionItem && this.selectionItem.hitTest(event.point, this.hitOptions) && this.state === 'edit') {
        const hit = this.selectionItem.hitTest(event.point, this.hitOptions)
        if (hit.name === 'bottom-right' || hit.name === 'top-left') {
          paper.view.element.style.cursor = 'nwse-resize'
        } else if (hit.name === 'bottom-left' || hit.name === 'top-right') {
          paper.view.element.style.cursor = 'nesw-resize'
        } else if (hit.type === 'stroke' && (hit.location.index === 0 || hit.location.index === 2)) {
          paper.view.element.style.cursor = 'ew-resize'
        } else if (hit.type === 'stroke' && (hit.location.index === 1 || hit.location.index === 3)) {
          paper.view.element.style.cursor = 'ns-resize'
        } else if (hit.type === 'fill') {
          paper.view.element.style.cursor = 'move'
        }
      } else {
        const canvas = document.getElementById('detection_canvas')
        if (canvas !== null) {
          canvas.style.cursor = 'auto'
        }
      }
    }

    // 删除box事件
    const toolKeyUp = event => {
      if (this.active) {
        if (event.key === 'delete') {
          if (paper.project.selectedItems.length > 0) {
            this.selectionItem = paper.project.selectedItems[0]
            this.selectionItem.bounds.selected = false
            var id = ''
            paper.project.selectedItems.forEach(box => {
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
            this.selectionItem = null
            this.setAnnotationEditsFlag(true)
          }
        }
      }
    }

    this.toolMove = new paper.Tool()
    this.toolMove.onMouseDown = toolDown
    this.toolMove.onMouseDrag = toolDrag
    this.toolMove.onMouseMove = toolMove
    this.toolMove.onKeyUp = toolKeyUp
    this.toolMove.onMouseUp = toolUp
  },

  methods: {
    ...mapActions({
      setSelectedItems: 'detection/setSelectedItems',
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag'
    }),
    prepareCanvas() {

    },
    resetSelection() {
      this.selectionItem.bounds.selected = false
    },
    setSelection() {
      this.selectionItem.bounds.selected = false
    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolMove.activate()
      this.strokeWidth = 2
      const hitTolerance = 6
      this.hitOptions = {
        bounds: true,
        stroke: true,
        handles: true,
        fill: true,
        tolerance: hitTolerance,
        match: this.matchFilter
      }
      this.selectionItem = paper.project.selectedItems.length > 0 ? paper.project.selectedItems[0] : null
    },

    // 如果box被锁定,则不会被判断为选中
    matchFilter(itemToCheck) {
      if (!itemToCheck.locked) {
        return true
      }
    }
  }
}
</script>
