<template>
  <el-radio-button id="rectangle" label="rectangle" @click.native="initialiseTool">绘制</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
// import { colorToRGBA } from '@/utils/color'
import { addBox } from '@/utils/detection'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      toolRect: null,
      strokeWidth: 2
    }
  },

  computed: {
    ...mapState({
      state: state => state.detection.state,
      classification: state => state.detection.classification
    })
  },

  created() {
    const toolDrag = event => {
      if (this.state === 'edit') {
        const trackingRect = new paper.Path.Rectangle(event.downPoint, event.point)
        trackingRect.strokeColor = new paper.Color('#2661D8')
        trackingRect.strokeColor.alpha = 0.7
        trackingRect.strokeWidth = this.strokeWidth
        trackingRect.removeOn({
          drag: true,
          up: true
        })
      }
    }
    const toolUp = event => {
      if (this.state === 'edit') {
        if (Math.abs(event.delta.x) > 10 && Math.abs(event.delta.y) > 10) {
          addBox(event.downPoint, event.point, this.classification[0], undefined, 'newAnnotation', this.strokeWidth)

          // const items = paper.project.getItems({
          //   data: {
          //     type: 'box'
          //   }
          // })
          // // console.log(items)
          // const newRect = new paper.Path.Rectangle(event.downPoint, event.point)
          // newRect.strokeColor = colorToRGBA(this.classification[0].strokeColor)// new paper.Color(getDefaultColor().stroke)
          // newRect.fillColor = colorToRGBA(this.classification[0].fillColor) // new paper.Color(getDefaultColor().fill)
          // newRect.strokeWidth = this.strokeWidth
          // newRect.data.status = 'newAnnotation'
          // newRect.data.class = this.classification[0].value
          // newRect.data.id = items.length + 1
          // newRect.data.type = 'box'
          //
          // const textRect = new paper.Path.Rectangle(event.downPoint, new paper.Size(14, 10))
          // textRect.strokeColor = colorToRGBA(this.classification[0].strokeColor)// new paper.Color(getDefaultColor().stroke)
          // textRect.fillColor = textRect.strokeColor // new paper.Color(getDefaultColor().fill)
          // textRect.strokeWidth = this.strokeWidth
          // textRect.data.status = 'newAnnotation'
          // textRect.data.class = this.classification[0].value
          // textRect.data.id = items.length + 1
          // textRect.data.type = 'background'
          // textRect.locked = true
          //
          // const text = new paper.PointText({
          //   point: [newRect.bounds.topLeft.x + 2, newRect.bounds.topLeft.y + 10],
          //   content: newRect.data.id,
          //   fillColor: 'black',
          //   // strokeColor: newRect.strokeColor,
          //   fontFamily: 'Normal',
          //   // fontWeight: 'bold',
          //   fontSize: 14
          // })
          // text.locked = true
          //
          // // Create a group from the two paths:
          // const group = new paper.Group({
          //   children: [newRect, textRect, text]
          // })

          this.setAnnotationEditsFlag(true)
        }
      }
    }

    this.toolRect = new paper.Tool()
    this.toolRect.onMouseDrag = toolDrag
    this.toolRect.onMouseUp = toolUp
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
      this.toolRect.activate()
      this.strokeWidth = 2
      paper.view.element.style.cursor = 'auto'
    }
  }
}
</script>
