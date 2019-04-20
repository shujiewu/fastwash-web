<template>
  <el-button type="success" @click.native="initialiseTool">绘制</el-button>
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
      toolRect: null,
      strokeWidth: 2
    }
  },

  created() {
    const toolDrag = event => {
      const trackingRect = new paper.Path.Rectangle(event.downPoint, event.point)
      trackingRect.strokeColor = new paper.Color('#2661D8')
      trackingRect.strokeColor.alpha = 0.7
      trackingRect.strokeWidth = this.strokeWidth
      trackingRect.removeOn({
        drag: true,
        up: true
      })
    }
    const toolUp = event => {
      const newRect = new paper.Path.Rectangle(event.downPoint, event.point)
      newRect.strokeColor = new paper.Color(this.getColor().stroke)
      newRect.fillColor = new paper.Color(this.getColor().fill)
      newRect.strokeWidth = this.strokeWidth
      newRect.data.type = 'rectangle'
      newRect.data.class = ''
      this.flagAnnotationEdits()
    }

    this.toolRect = new paper.Tool()
    this.toolRect.onMouseDrag = toolDrag
    this.toolRect.onMouseUp = toolUp
  },

  methods: {
    prepareCanvas() {
      paper.project.layers[0].activate()
    },
    flagAnnotationEdits() {

    },
    getColor() {
      return {
        fill: {
          hue: 329,
          saturation: 0.89,
          lightness: 0.9,
          alpha: 0.7
        },
        stroke: {
          hue: 329,
          saturation: 0.89,
          lightness: 0.9,
          alpha: 1
        }
      }
    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolRect.activate()
      this.strokeWidth = 2
    }
  }
}
</script>
