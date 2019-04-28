<template>
  <el-radio-button id="move" label="move" @click.native="initialiseTool">选择</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
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
      selectionGroup: null,
      toolMode: ''
    }
  },
  computed: {
    ...mapState({
      state: state => state.detection.state
    })
  },
  created() {
    let hitResult = null
    const toolDown = event => {
      hitResult = paper.project.hitTest(event.point, this.hitOptions)
      this.selectionGroup.bounds.selected = false
      if (hitResult) {
        if (this.state === 'edit') {
          if (hitResult.type === 'bounds') {
            this.toolMode = 'transform'
          } else {
            paper.project.deselectAll()
            hitResult.item.selected = true
            this.toolMode = 'move'
          }
        } else {
          paper.project.deselectAll()
          hitResult.item.selected = true
          this.toolMode = 'select'
        }
      } else {
        paper.project.deselectAll()
        this.toolMode = 'select'
      }
    }

    // 鼠标拖动事件
    const toolDrag = event => {
      if (this.toolMode === 'move') {
        if (this.selectionGroup.children.length > 0) {
          this.selectionGroup.position = this.selectionGroup.position.add(event.delta)
        } else {
          hitResult.item.position = hitResult.item.position.add(event.delta)
        }
        if (hitResult.item.data.status === 'originalAnnotation') {
          hitResult.item.data.status = 'editAnnotation'
        }
        this.setAnnotationEditsFlag(true)
      } else if (this.toolMode === 'transform') {
        let newWidth = null
        let newHeight = null
        let transfromCenter = null
        if (hitResult && hitResult.name === 'top-left') {
          newWidth = event.point.x - this.selectionGroup.bounds.topRight.x
          newHeight = event.point.y - this.selectionGroup.bounds.bottomLeft.y
          transfromCenter = this.selectionGroup.bounds.bottomRight
        } else if (hitResult && hitResult.name === 'top-right') {
          newWidth = event.point.x - this.selectionGroup.bounds.topLeft.x
          newHeight = event.point.y - this.selectionGroup.bounds.bottomRight.y
          transfromCenter = this.selectionGroup.bounds.bottomLeft
        } else if (hitResult && hitResult.name === 'bottom-right') {
          newWidth = event.point.x - this.selectionGroup.bounds.bottomLeft.x
          newHeight = event.point.y - this.selectionGroup.bounds.topRight.y
          transfromCenter = this.selectionGroup.bounds.topLeft
        } else if (hitResult && hitResult.name === 'bottom-left') {
          newWidth = event.point.x - this.selectionGroup.bounds.bottomRight.x
          newHeight = event.point.y - this.selectionGroup.bounds.topLeft.y
          transfromCenter = this.selectionGroup.bounds.topRight
        }

        const horizScaleFactor = Math.abs(newWidth / this.selectionGroup.bounds.width)
        const vertScaleFactor = Math.abs(newHeight / this.selectionGroup.bounds.height)

        // hitResult.item.position = hitResult.item.position.add(event.delta)
        // if (hitResult.item.data.status === 'originalAnnotation') {
        //   hitResult.item.data.status = 'editAnnotation'
        // }

        if (paper.project.selectedItems.length > 0) {
          if (paper.project.selectedItems[0].data.status === 'originalAnnotation') {
            paper.project.selectedItems[0].data.status = 'editAnnotation'
          }
        }

        this.selectionGroup.scale(horizScaleFactor, vertScaleFactor, transfromCenter)
        this.setAnnotationEditsFlag(true)
      }
    }

    // 鼠标抬起事件
    const toolUp = event => {
      this.selectionGroup = new paper.Group(paper.project.selectedItems)
      if (!this.selectionGroup.isEmpty()) {
        this.selectionGroup.bounds.selected = true
      }
      this.setSelectedItems(paper.project.selectedItems)
    }

    // 鼠标移动事件
    const toolMove = event => {
      if (this.selectionGroup && this.selectionGroup.hitTest(event.point, this.hitOptions) && this.state === 'edit') {
        const hit = this.selectionGroup.hitTest(event.point, this.hitOptions)
        if (hit.name === 'bottom-right' || hit.name === 'top-left') {
          paper.view.element.style.cursor = 'nwse-resize'
        } else if (hit.name === 'bottom-left' || hit.name === 'top-right') {
          paper.view.element.style.cursor = 'nesw-resize'
        } else if (hit.name === 'bottom' || hit.name === 'top') {
          paper.view.element.style.cursor = 'nesw-resize'
        } else if (hit.type === 'fill') {
          paper.view.element.style.cursor = 'move'
        }
      } else {
        const canvas = document.getElementById('detection_canvas')
        canvas.style.cursor = 'auto'
      }
    }

    // 删除事件
    const toolKeyUp = event => {
      if (this.active) {
        if (event.key === 'delete') {
          if (paper.project.selectedItems) {
            this.selectionGroup.bounds.selected = false
            paper.project.selectedItems.forEach(item => {
              if (item.className !== 'Layer') {
                item.remove()
              }
            })
            this.setSelectedItems(paper.project.selectedItems)
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
    initialiseTool() {
      this.prepareCanvas()
      this.toolMove.activate()
      this.strokeWidth = 2
      const hitTolerance = 4
      this.hitOptions = {
        bounds: true,
        handles: true,
        fill: true,
        tolerance: hitTolerance,
        match: this.matchFilter
      }
      this.selectionGroup = new paper.Group(paper.project.selectedItems)
    },

    matchFilter(itemToCheck) {
      if (!itemToCheck.locked) {
        return true
      }
    }
  }
}
</script>
