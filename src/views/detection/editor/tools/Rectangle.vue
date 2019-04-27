<template>
  <el-button id="rectangle" type="success" @click.native="initialiseTool">绘制</el-button>
</template>

<script>
import paper from 'paper'
import { getDefaultColor } from '@/utils/color'
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
      newRect.strokeColor = new paper.Color(getDefaultColor().stroke)
      newRect.fillColor = new paper.Color(getDefaultColor().fill)
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
    initialiseTool() {
      this.prepareCanvas()
      this.toolRect.activate()
      this.strokeWidth = 2
    }
  }
}
</script>
