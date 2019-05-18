<template>
  <el-radio-button id="zoom-click" label="zoom-click" @click.native="initialiseTool">显示</el-radio-button>
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
      toolZoom: null
    }
  },
  mounted() {
    // var scrollDiv = document.getElementById('detection_canvas')
    // // 绑定事件
    // scrollDiv.addEventListener('scroll', function() {
    //   console.log(scrollDiv.scrollTop)
    // })
    document.getElementById('detection_canvas').addEventListener('mousewheel', this.handleScroll, true)
  },
  created() {
    const toolDown = event => {
    }
    const toolUp = event => {
    }
    const toolDrag = event => {
      paper.view.center = new paper.Point(paper.view.center.x - event.delta.x, paper.view.center.y - event.delta.y)
    }

    this.toolZoom = new paper.Tool()
    this.toolZoom.onMouseDown = toolDown
    this.toolZoom.onMouseDrag = toolDrag
    this.toolZoom.onMouseUp = toolUp
  },

  methods: {
    prepareCanvas() {
    },
    initialiseTool() {
      this.prepareCanvas()
      this.toolZoom.activate()
      paper.view.element.style.cursor = 'move'
    },
    handleScroll(e) {
      // console.log(e)
      // var direction = e.deltaY > 0 ? 'down' : 'up' // 该语句可以用来判断滚轮是向上滑动还是向下
      // console.log(e.deltaY)
      paper.view.zoom = paper.view.zoom + e.deltaY / 1000
      if (paper.view.zoom <= 0.05) {
        paper.view.zoom = 0.05
      } else if (paper.view.zoom >= 3.5) {
        paper.view.zoom = 3.5
      }
    }
  }
}
</script>
