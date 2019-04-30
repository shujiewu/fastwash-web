<template>
  <el-radio-button id="rectangle" label="rectangle" @click.native="initialiseTool">绘制</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
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

  computed: {
    ...mapState({
      state: state => state.detection.state
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
          const items = paper.project.getItems({
            className: function(className) {
              return (className === 'Path')
            }
          })

          const newRect = new paper.Path.Rectangle(event.downPoint, event.point)
          newRect.strokeColor = new paper.Color(getDefaultColor().stroke)
          newRect.fillColor = new paper.Color(getDefaultColor().fill)
          newRect.strokeWidth = this.strokeWidth
          newRect.data.status = 'newAnnotation'
          newRect.data.class = ''
          newRect.data.id = items.length + 1
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
      paper.project.layers[0].activate()
    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolRect.activate()
      this.strokeWidth = 2
    }
  }
}
</script>
