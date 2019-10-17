<template>
  <div id="editor_dom" class="editor" @mousewheel.prevent>
    <div v-loading="loading" id="bg_img" class="editor_container">
      <canvas
        id="detection_canvas"
        resize="true"
        class="annotation_canvas"/>
    </div>
  </div>
</template>

<script>
import { getImage } from '@/api/detection'
import paper from 'paper'
import { transformResponse } from '@/utils/proto'
import { mapState, mapActions } from 'vuex'
import { uint8ToString } from '@/utils/utils'
import { addBox } from '@/utils/detection'

export default {
  name: 'Editor',
  data() {
    return {
      flag: true,
      loading: true,
      bg_dom: null,
      editor_dom: null,
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
  created() {
    this.projectName = this.$route.params && this.$route.params.projectName
    this.dataset = this.$route.query.dataset
    this.imageId = this.$route.query.imageId
    this.action = this.$route.query.action
  },
  methods: {
    ...mapActions({
      setSelectedItems: 'detection/setSelectedItems',
      setOriginalAnnotation: 'detection/setOriginalAnnotation',
      saveAnnotation: 'detection/saveAnnotation',
      setAnnotationEditsFlag: 'detection/setAnnotationEditsFlag',
      setShape: 'detection/setShape'
    }),
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
    setProgress(remain, total) {
      this.$emit('setProgress', remain, total)
    },
    resetCanvas() {
      this.bg_dom = document.getElementById('bg_img')
      this.editor_dom = document.getElementById('editor_dom')
      this.cvs_dom = document.getElementById('detection_canvas')
      getImage(this.projectName, this.dataset, this.imageId, this.action).then(response => {
        this.setProgress(response.unannotated_nums, response.all_nums)
        const frameResult = response.data// transformResponse(response.data)
        this.drawBackground(frameResult)
      })
    },
    drawOriginAnnotation() {
      if (this.originalAnnotation != null) {
        // 保存当前
        this.saveAnnotation()
        paper.project.activeLayer.removeChildren()
        this.drawBoxes(this.originalAnnotation)
        this.setAnnotationEditsFlag(true)
      }
    },
    deleteAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        // paper.project.clear()
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    resetAnnotation() {
      if (this.originalAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        this.drawBoxes(this.originalAnnotation)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    drawSaveAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.activeLayer.removeChildren()
        for (const index in this.currentAnnotation) {
          this.drawItem(this.currentAnnotation[index], 'current', index)
        }
        this.setAnnotationEditsFlag(true)
      }
    },
    drawBackground(frameResult) {
      // var shape = frameResult.detImg.description.split('_').map(i => parseInt(i))
      var shape = []
      shape[0] = frameResult.detImg.height
      shape[1] = frameResult.detImg.width
      this.setShape(shape)
      // console.log(this.bg_dom.offsetHeight)
      // this.cvs_dom.width = this.bg_dom.offsetWidth
      // console.log(this.bg_dom.offsetWidth)
      if(frameResult.detImg.height>frameResult.detImg.width)
        this.bg_dom.style.width = (shape[1] * this.bg_dom.offsetHeight / shape[0]) + 'px'
      else
        this.bg_dom.style.height = (shape[0] * this.bg_dom.offsetWidth / shape[1]) + 'px'
      this.cvs_dom.width = this.bg_dom.offsetWidth
      this.cvs_dom.height = this.bg_dom.offsetHeight

      paper.view.viewSize.width = this.cvs_dom.offsetWidth
      paper.view.viewSize.height = this.cvs_dom.offsetHeight

      var raster = new paper.Raster('data:image/png;base64,' + frameResult.detImg.blob)

      if(frameResult.detImg.height>frameResult.detImg.width){
        this.cvs_dom.style.left=(this.editor_dom.offsetWidth/2-this.bg_dom.offsetWidth/2)+'px'
      }
      raster.position = paper.view.center
      const load = () => {
        raster.width = paper.view.viewSize.width
        raster.height = paper.view.viewSize.height
        raster.locked = true
        var boxLayer = new paper.Layer()
        paper.project.addLayer(boxLayer)
        boxLayer.activate()
        this.drawBoxes(frameResult)
        frameResult.detImg.blob = ""
        this.setOriginalAnnotation(frameResult)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
        this.loading = false
      }
      raster.onLoad = load
    },
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

        // var cls_prop = eval('(' + item.itemTextUtf8 + ')')
        // item.class = cls_prop['class']
        // item.prop = cls_prop['prop']
        item.class = item.classification
        item.prop = item.property

        if (type === 'original') {
          status = 'originalAnnotation'
          iclass = this.classification.filter(c => c.value === item.class.value)[0]
        } else {
          status = item.status === undefined ? 'originalAnnotation' : item.status
          iclass = this.classification.filter(c => c.value === item.class.value)[0]
        }

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
    position: relative;
    /*flex: 1 1 auto;*/
    /*margin: 10px;*/
    /*height: 100%;*/
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
