<template>
  <div class="editor" @mousewheel.prevent>
    <div v-loading="loading" id="bg_img" class="editor_container">
      <canvas
        id="detection_canvas"
        resize="true"
        class="annotation_canvas"/>
    </div>
  </div>
</template>

<script>
import { getItem } from '@/api/detection'
import paper from 'paper'
import { transformResponse } from '@/utils/proto'
import { mapState, mapActions } from 'vuex'
import { uint8ToString } from '@/utils/utils'
import { addBox } from '@/utils/detection'

/** 图片操作界面 **/
export default {
  name: 'Editor',
  data() {
    return {
      flag: true,
      loading: true,
      bg_dom: null,
      cvs_dom: null
    }
  },
  computed: {
    ...mapState({
      selectedItems: state => state.detection.selectedItems,
      classification: state => state.detection.classification,
      originalAnnotation: state => state.detection.originalAnnotation,
      state: state => state.detection.state,
      currentAnnotation: state => state.detection.currentAnnotation,
      shape: state => state.detection.shape
    })
  },
  watch: {
    state: function(val) {
      if (val === 'original') {
        this.drawOriginAnnotation()
      } else {
        this.drawSaveAnnotation()
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    ...mapActions({
      setSelectedItems: 'detection/setSelectedItems',
      setOriginalAnnotation: 'detection/setOriginalAnnotation',
      saveAnnotation: 'detection/saveAnnotation',
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag',
      setShape: 'detection/setShape'
    }),
    // 加载数据
    load() {
      if (this.flag) {
        this.loading = true
        paper.setup('detection_canvas')
        document.getElementById('tool-move').click()
        this.setSelectedItems([])
        this.setOriginalAnnotation(null)
        this.setShape([])
        this.resetCanvas()
      }
    },
    // 设置进度, 调用父组件的方法
    setProgress(remain, total) {
      this.$emit('setProgress', remain, total)
    },
    // 重置当前标注界面
    resetCanvas() {
      this.bg_dom = document.getElementById('bg_img')
      this.cvs_dom = document.getElementById('detection_canvas')
      getItem().then(response => {
        this.setProgress(response.unannotated_nums, response.all_nums)
        const frameResult = transformResponse(response.data)
        this.drawBackground(frameResult)
      })
    },
    // 绘制原始的标注
    drawOriginAnnotation() {
      if (this.originalAnnotation != null) {
        // 保存当前
        this.saveAnnotation()
        paper.project.activeLayer.removeChildren()
        this.drawBoxes(this.originalAnnotation)
        this.setAnnotationEditsFlag(true)
      }
    },
    // 清空所有标注
    deleteAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        // paper.project.clear()
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    // 重置为原始标注
    resetAnnotation() {
      if (this.originalAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        this.drawBoxes(this.originalAnnotation)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    // 切换回当前标注
    drawSaveAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        for (const index in this.currentAnnotation) {
          this.drawItem(this.currentAnnotation[index], 'current', index)
        }
        this.setAnnotationEditsFlag(true)
      }
    },
    // 绘制背景
    drawBackground(frameResult) {
      var shape = frameResult.detImg.description.split('_').map(i => parseInt(i))
      this.setShape(shape)

      // this.cvs_dom.width = this.bg_dom.offsetWidth
      this.bg_dom.style.height = (shape[0] * this.bg_dom.offsetWidth / shape[1]) + 'px'
      this.cvs_dom.width = this.bg_dom.offsetWidth
      this.cvs_dom.height = this.bg_dom.offsetHeight
      paper.view.viewSize.width = this.cvs_dom.offsetWidth
      paper.view.viewSize.height = this.cvs_dom.offsetHeight
      var raster = new paper.Raster('data:image/png;base64,' + btoa(uint8ToString(frameResult.detImg.blob)))
      raster.position = paper.view.center
      const load = () => {
        raster.width = paper.view.viewSize.width
        raster.height = paper.view.viewSize.height
        raster.locked = true
        var boxLayer = new paper.Layer()
        paper.project.addLayer(boxLayer)
        boxLayer.activate()
        // 绘制box
        this.drawBoxes(frameResult)
        frameResult.detImg = {}
        this.setOriginalAnnotation(frameResult)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
        this.loading = false
      }
      raster.onLoad = load
    },
    // 绘制box
    drawBoxes(frameResult) {
      if ('items' in frameResult) {
        for (const index in frameResult['items']) {
          this.drawItem(frameResult['items'][index], 'original', index)
        }
      }
    },
    drawItem(item, type, index) {
      if (item) {
        var tl = this.Rel2abs(
          {
            x: item.box.x / this.shape[1],
            y: item.box.y / this.shape[0]
          }
        )
        var wh = this.Rel2abs(
          {
            x: (item.box.w) / this.shape[1],
            y: (item.box.h) / this.shape[0]
          }
        )
        var status = ''
        var iclass = {}
        if (type === 'original') {
          status = 'originalAnnotation'
          iclass = this.classification[0]
        } else {
          status = item.status === undefined ? 'originalAnnotation' : item.status
          iclass = this.classification.filter(c => c.value === item.class)[0]
        }

        /** property **/
        /**
          var status = ''
          var iclass = {}
          var cls_prop = eval('(' + item.itemTextUtf8 + ')')
          item.class = cls_prop['class']
          item.prop = cls_prop['prop']
          if (type === 'original') {
            status = 'originalAnnotation'
            iclass = this.classification.filter(c => c.value === item.class)[0] //this.classification[0]
          } else {
            status = item.status === undefined ? 'originalAnnotation' : item.status
            iclass = this.classification.filter(c => c.value === item.class)[0]
          }
        **/

        addBox([tl.x, tl.y], [wh.x, wh.y], iclass, item.prop, status, 2)
      }
    },
    Rel2abs(pt) {
      return {
        x: Math.round(pt.x * paper.view.viewSize.width),
        y: Math.round(pt.y * paper.view.viewSize.height)
      }
    }
  }
}
</script>

<style scoped>
  .annotation_canvas {
    height: 100%;
    width: 100%;
  }
  .pointers-no {
    pointer-events: none;
  }
  .editor {
    /*box-shadow: 0 3px 3px 0 rgba(0,0,0,.12), 0 3px 3px 0 rgba(0,0,0,.12);*/
    /*padding: 10px;*/
  }
  .editor_container {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    pointer-events: auto;
    height: 100%;
    width: 100%;
  }
  .img2 {
    height: 100%;
    width: 100%;
  }
</style>
