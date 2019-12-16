<template>
  <el-radio-button id="extreme-click" label="extreme-click" @click.native="initialiseTool">极限点击</el-radio-button>
</template>

<script>
import paper from 'paper'
import { mapState, mapActions } from 'vuex'
import { getDefaultColor } from '@/utils/color'
import { addBox } from '@/utils/detection'
/** 极限点击的前端操作 **/
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
      classification: state => state.detection.classification,
      currentClassId: state => state.detection.currentClassId
    })
  },

  created() {
    // 鼠标按下的事件
    const toolDown = event => {
      if (this.state === 'edit') {
        this.toolCircle.minDistance = this.strokeWidth * 4
      }
    }
    // 鼠标抬起的事件：绘制点，如果超过4个点，则添加框，并清空点
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

          var ltPoint = new paper.Point(left, top)
          var rbPoint = new paper.Point(right, bottom)
          addBox(ltPoint, rbPoint, this.classification[Number(this.currentClassId)-1], undefined, 'newAnnotation', this.strokeWidth)
          this.setAnnotationEditsFlag(true)
        }
      }
    }

    this.toolCircle = new paper.Tool()
    this.toolCircle.onMouseDown = toolDown
    this.toolCircle.onMouseUp = toolUp
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
      paper.view.element.style.cursor = 'auto'
    }
  }
}
</script>
