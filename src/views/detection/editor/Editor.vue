<template>
  <div class="editor">
    <div v-loading="loading" class="editor_container">
      <img
        id="bg_img"
        src=" "
        class="img2">
      <canvas
        id="detection_canvas"
        class="annotation_canvas"/>
    </div>
    <div style="margin-top: 10px">
      <span>画布大小</span>
      <el-slider v-model="zoom" @change="onZoomChange"/>
    </div>
  </div>
</template>

<script>
import { getItem } from '@/api/detection'
import paper from 'paper'
// import { getDefaultColor } from '@/utils/color'
import { transformResponse } from '@/utils/proto'
import { mapState, mapActions } from 'vuex'
import { uint8ToString } from '@/utils/utils'
import { addBox } from '@/utils/detection'

export default {
  name: 'Editor',
  data() {
    return {
      zoom: 0,
      flag: true,
      loading: true,
      // 背景图片缓存
      img: new Image(),
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
    },
    zoom: function(val) {
      console.log(val)
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
    onZoomChange(val) {
      console.log(val)
    },
    resetCanvas() {
      this.bg_dom = document.getElementById('bg_img')
      this.cvs_dom = document.getElementById('detection_canvas')
      getItem().then(response => {
        this.setProgress(response.unannotated_nums, response.all_nums)
        const frameResult = transformResponse(response.data)

        this.drawBackground(frameResult)
      })
    },
    drawOriginAnnotation() {
      if (this.originalAnnotation != null) {
        // 保存当前
        this.saveAnnotation()
        paper.project.clear()
        this.drawBoxes(this.originalAnnotation)
        this.setAnnotationEditsFlag(true)
      }
    },
    deleteAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.clear()
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    resetAnnotation() {
      if (this.originalAnnotation != null) {
        paper.project.clear()
        this.drawBoxes(this.originalAnnotation)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
      }
    },
    drawSaveAnnotation() {
      if (this.currentAnnotation != null) {
        paper.project.clear()
        for (const index in this.currentAnnotation) {
          this.drawItem(this.currentAnnotation[index], 'current', index)
        }
        this.setAnnotationEditsFlag(true)
      }
    },
    drawBackground(frameResult) {
      this.bg_dom.src = 'data:image/png;base64,' + btoa(uint8ToString(frameResult.detImg.blob)) // 'data:image/png;base64,' + data.img
      const load = () => {
        paper.view.viewSize.width = this.bg_dom.width
        paper.view.viewSize.height = this.bg_dom.height

        var shape = frameResult.detImg.description.split('_').map(i => parseInt(i))
        this.setShape(shape)
        console.log(shape)
        this.drawBoxes(frameResult)

        frameResult.detImg = {}
        this.setOriginalAnnotation(frameResult)
        this.saveAnnotation()
        this.setAnnotationEditsFlag(true)
        this.loading = false
      }
      this.bg_dom.onload = load
      const resize = event => {
        // 修改所有item
        // raster.position = paper.view.center
        // raster.size = new paper.Size(paper.view.viewSize.width, paper.view.viewSize.height)
        // paper.view.center = new paper.Point(paper.view.center.x + event.delta.x, paper.view.center.y + event.delta.y)
      }
      paper.view.onResize = resize
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
        if (type === 'original') {
          status = 'originalAnnotation'
          iclass = this.classification[0]
        } else {
          status = item.status === undefined ? 'originalAnnotation' : item.status
          iclass = this.classification.filter(c => c.value === item.class)[0]
        }
        addBox([tl.x, tl.y], [wh.x, wh.y], iclass, item.prop, status, 2)

        //
        // const newPaperItem = new paper.Path.Rectangle({
        //   point: [tl.x, tl.y],
        //   size: [wh.x, wh.y],
        //   data: {
        //     id: index,
        //     status: status,
        //     // 这里需要修改
        //     class: iclass,
        //     prop: item.prop,
        //     type: 'box'
        //   },
        //   locked: false
        // })
        // newPaperItem.strokeWidth = 2
        // this.drawItemColor(newPaperItem, item)
      }
    },
    // drawItem(item, type, index) {
    //   if (item) {
    //     var tl = this.Rel2abs(
    //       {
    //         x: item.box.x / this.shape[1],
    //         y: item.box.y / this.shape[0]
    //       }
    //     )
    //     var wh = this.Rel2abs(
    //       {
    //         x: item.box.w / this.shape[1],
    //         y: item.box.h / this.shape[0]
    //       }
    //     )
    //     var status = ''
    //     var iclass = ''
    //     if (type === 'original') {
    //       status = 'originalAnnotation'
    //       iclass = 'target'
    //     } else {
    //       status = item.status === undefined ? 'originalAnnotation' : item.status
    //       iclass = item.class
    //     }
    //
    //     const newPaperItem = new paper.Path.Rectangle({
    //       point: [tl.x, tl.y],
    //       size: [wh.x, wh.y],
    //       data: {
    //         id: index,
    //         status: status,
    //         // 这里需要修改
    //         class: iclass,
    //         prop: item.prop,
    //         type: 'box'
    //       },
    //       locked: false
    //     })
    //     newPaperItem.strokeWidth = 2
    //     this.drawItemColor(newPaperItem, item)
    //   }
    // },
    // drawItemColor(paperItem, stateItem) {
    //   if (stateItem.color && stateItem.color.stroke) {
    //     if (typeof stateItem.color.stroke === 'string') {
    //       paperItem.strokeColor = stateItem.color.stroke
    //     } else {
    //       paperItem.strokeColor = new paper.Color({
    //         hue: stateItem.color.stroke.hue,
    //         saturation: stateItem.color.stroke.saturation,
    //         lightness: stateItem.color.stroke.lightness,
    //         alpha: stateItem.color.stroke.alpha
    //       })
    //     }
    //   } else {
    //     const defaultColors = this.classColors(paperItem.data.class)
    //     paperItem.fillColor = defaultColors.fill
    //     paperItem.strokeColor = defaultColors.stroke
    //   }
    // },
    // classColors(tag) {
    //   if (this.classification.length > 0) {
    //     const item = this.classification.filter(i => i.value === tag)
    //     if (item.length > 0) {
    //       const fillColor = item[0].fillColor.replace(/rgba|rgb|\(|\)/gm, '')
    //         .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? val : val / 255)
    //       const strokeColor = item[0].strokeColor.replace(/rgba|rgb|\(|\)/gm, '')
    //         .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? val : val / 255)
    //       return {
    //         fill: {
    //           red: fillColor[0],
    //           green: fillColor[1],
    //           blue: fillColor[2],
    //           alpha: fillColor[3]
    //         },
    //         stroke: {
    //           red: strokeColor[0],
    //           green: strokeColor[1],
    //           blue: strokeColor[2],
    //           alpha: strokeColor[3]
    //         }
    //       }
    //     } else {
    //       return getDefaultColor()
    //     }
    //   }
    // },
    Rel2abs(pt) {
      return {
        x: Math.round(pt.x * this.bg_dom.width),
        y: Math.round(pt.y * this.bg_dom.height)
      }
    }
    // var text = new paper.PointText(new paper.Point(30, 30))
    // text.fillColor = 'black'
    // text.content = 'Hello world'
    //
    // var text2 = new paper.PointText({
    //   point: [50, 50],
    //   content: 'The contents of the point text',
    //   fillColor: 'black',
    //   strokColor: 'white',
    //   fontFamily: 'Courier New',
    //   fontWeight: 'bold',
    //   fontSize: 25
    // })

    // const raster = new paper.Raster('data:image/png;base64,' + data.img)
    // raster.position = paper.view.center
    // const load = () => {
    //   raster.size = new paper.Size(paper.view.viewSize.width, paper.view.viewSize.height)
    //   console.log(raster)
    // }
    // raster.onLoad = load
  }
}
</script>

<style scoped>
  .annotation_canvas {
    position: absolute;
    /*flex: 1 1 auto;*/
    /*margin: 10px;*/
    height: auto;
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
  }
  .img2 {
    height: 100%;
    width: 100%;
  }
</style>
