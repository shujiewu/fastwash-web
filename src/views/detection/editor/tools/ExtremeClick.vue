<template>
  <el-radio-button id="extreme-click" label="extreme-click" @click.native="initialiseTool">极限点击</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
import { colorToRGBA, getDefaultColor } from '@/utils/color'
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      toolCircle: null,
      strokeWidth: 2, // Default value
      radius: 2000,
      circleList: []
    }
  },

  computed: {
    ...mapState({
      state: state => state.detection.state,
      classification: state => state.detection.classification
    })
  },

  created() {
    const toolDown = event => {
      if (this.state === 'edit') {
        this.toolCircle.minDistance = this.strokeWidth * 4
      }
    }
    const toolUp = event => {
      if (this.state === 'edit') {
        const newCircle = new paper.Path.Circle(event.downPoint, this.radius)
        newCircle.strokeColor = new paper.Color(getDefaultColor().stroke)
        newCircle.strokeWidth = this.strokeWidth
        newCircle.fillColor = new paper.Color(getDefaultColor().stroke)
        this.circleList.push(newCircle)
        if (this.circleList.length === 4) {
          var left = Number.MAX_VALUE
          var top = Number.MAX_VALUE
          var right = Number.MIN_VALUE
          var bottom = Number.MIN_VALUE
          this.circleList.forEach(item => {
            left = Math.min(left, item.position.x)
            top = Math.min(top, item.position.y)
            right = Math.max(right, item.position.x)
            bottom = Math.max(bottom, item.position.y)
            item.remove()
          })
          this.circleList = []

          const items = paper.project.getItems({
            // className: function(className) {
            //   return (className === 'Path')
            // }
            data: {
              type: 'box'
            }
          })
          var ltPoint = new paper.Point(left, top)
          var rbPoint = new paper.Point(right, bottom)

          const newRect = new paper.Path.Rectangle(ltPoint, rbPoint)
          newRect.strokeColor = colorToRGBA(this.classification[0].strokeColor)
          newRect.fillColor = colorToRGBA(this.classification[0].fillColor)
          newRect.strokeWidth = 2
          newRect.data.status = 'newAnnotation'
          newRect.data.class = this.classification[0].value
          newRect.data.id = items.length + 1
          newRect.data.type = 'box'
          this.setAnnotationEditsFlag(true)
          // newRect.data.id = items.length + 1
        }
      }

      // Flag the annotation has been edited and the changes are not saved
      // this.flagAnnotationEdits()
    }

    // Add the defined functions to the tool object.
    // UNSATISFACTORY: mutating PaperJS project state directly without
    // dispatching view action.
    this.toolCircle = new paper.Tool()
    this.toolCircle.onMouseDown = toolDown
    this.toolCircle.onMouseUp = toolUp

    // const toolUp1 = event => {
    //   if (this.state === 'edit') {
    //     if (Math.abs(event.delta.x) > 10 && Math.abs(event.delta.y) > 10) {
    //       const items = paper.project.getItems({
    //         className: function(className) {
    //           return (className === 'Path')
    //         }
    //       })
    //       newRect.data.status = 'newAnnotation'
    //       newRect.data.class = 'target'
    //       newRect.data.id = items.length + 1
    //       this.setAnnotationEditsFlag(true)
    //     }
    //   }
    // }
  },

  methods: {
    ...mapActions({
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag'
    }),
    prepareCanvas() {
      // paper.project.layers[0].activate()
    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolCircle.activate()
      this.radius = 2
      this.strokeWidth = 2
    }
  }
}
</script>
