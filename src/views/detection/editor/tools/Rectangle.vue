<template>
  <el-radio-button id="rectangle" label="rectangle" @click.native="initialiseTool">绘制</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
import { addBox } from '@/utils/detection'

/** 绘制box的前端操作 **/
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
      classification: state => state.detection.classification,
      currentClassId: state => state.detection.currentClassId
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
        // 防止过小的框被绘制, 只有x和y大于10个像素才会被绘制
        if (Math.abs(event.delta.x) > 10 && Math.abs(event.delta.y) > 10) {
          addBox(event.downPoint, event.point, this.classification[Number(this.currentClassId)-1], undefined, 'newAnnotation', this.strokeWidth)
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
