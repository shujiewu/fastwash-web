<template>
  <el-button type="success" @click.native="initialiseTool">选择</el-button>
</template>

<script>
import paper from 'paper'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
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

  created() {
    let hitResult = null

    const toolDown = event => {
      hitResult = paper.project.hitTest(event.point, this.hitOptions)
      if (hitResult.type === 'pixel') {
        return
      }
      this.selectionGroup.bounds.selected = false
      if (hitResult) {
        if (hitResult.type === 'bounds') {
          this.toolMode = 'transform'
        } else if (event.modifiers.shift && !hitResult.item.selected) {
          hitResult.item.selected = true
        } else if (event.modifiers.shift && hitResult.item.selected) {
          hitResult.item.selected = false
        } else if (hitResult.item.selected) {
          this.toolMode = 'move'
        } else {
          paper.project.deselectAll()
          hitResult.item.selected = true
          this.toolMode = 'move'
        }
      } else {
        paper.project.deselectAll()
        this.toolMode = 'select'
      }
    }

    const toolDrag = event => {
      if (this.toolMode === 'select') {
        const selectionRect = new paper.Shape.Rectangle(
          event.downPoint,
          event.point
        )
        selectionRect.strokeColor = '#4D88D4'
        selectionRect.fillColor = '#A3C5E8'
        selectionRect.opacity = 0.3
        selectionRect.strokeWidth = this.strokeWidth

        // Constantly update tracking rect by removing it and re-drawing.
        selectionRect.removeOn({
          drag: true,
          down: true,
          up: true
        })

        // Select items inside the selection rectangle.
        paper.project.deselectAll()
        paper.project.getItems({
          class: 'Path',
          inside: selectionRect.bounds,
          match: this.matchFilter
        }).forEach((item) => {
          item.selected = true
        })
      } else if (this.toolMode === 'move') {
        if (this.selectionGroup.children.length > 0) {
          this.selectionGroup.position = this.selectionGroup.position.add(event.delta)
        } else {
          hitResult.item.position = hitResult.item.position.add(event.delta)
        }

        // if (this.saveState.changesSaved) {
        //   this.flagAnnotationEdits()
        // }
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

        this.selectionGroup.scale(horizScaleFactor, vertScaleFactor, transfromCenter)

        // if (this.saveState.changesSaved) {
        //   this.flagAnnotationEdits()
        // }
      }
    }

    const toolUp = event => {
      this.selectionGroup = new paper.Group(paper.project.selectedItems)
      if (!this.selectionGroup.isEmpty()) {
        this.selectionGroup.bounds.selected = true
      }
      this.setSelectedItems(paper.project.selectedItems)
    }

    const toolMove = event => {
      if (
        this.selectionGroup &&
        this.selectionGroup.hitTest(event.point, this.hitOptions)
      ) {
        const hit = this.selectionGroup.hitTest(event.point, this.hitOptions)
        if (hit.name === 'bottom-right' || hit.name === 'top-left') {
          paper.view.element.style.cursor = 'nwse-resize'
        } else if (hit.name === 'bottom-left' || hit.name === 'top-right') {
          paper.view.element.style.cursor = 'nesw-resize'
        } else if (hit.type === 'fill') {
          paper.view.element.style.cursor = 'move'
        }
      } else {
        const canvas = document.getElementById('detection_canvas')
        canvas.style.cursor = 'auto'
      }
    }

    const toolKeyUp = event => {
      if (this.active) {
        if (event.key === 'backspace' || event.key === 'delete') {
          // Check for current selection
          if (paper.project.selectedItems) {
          // Remove current selection group bounds
            this.selectionGroup.bounds.selected = false

            // For each item selected remove if item is not a layer
            paper.project.selectedItems.forEach(item => {
              if (item.className !== 'Layer') {
                item.remove()
              }
            })

            // Flag the annotation has been edited and the changes are not saved
            this.flagAnnotationEdits()
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
    prepareCanvas() {

    },
    setSelectedItems() {

    },
    flagAnnotationEdits() {

    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolMove.activate()
      this.strokeWidth = 2
      const hitTolerance = this.strokeWidth * 2
      this.active = true
      this.hitOptions = {
        segments: true,
        stroke: true,
        bounds: true,
        handles: true,
        fill: true,
        tolerance: hitTolerance,
        match: this.matchFilter
      }
      console.log(paper.project.selectedItems)
      this.selectionGroup = new paper.Group(paper.project.selectedItems)
    },

    matchFilter(itemToCheck) {
      if (itemToCheck.item && itemToCheck.item.layer.name === 'guide') {
        return false
      } else if (itemToCheck.layer && itemToCheck.layer.name === 'guide') {
        return false
      } else if (!itemToCheck.locked) {
        return true
      }
    }
  }
}
</script>
