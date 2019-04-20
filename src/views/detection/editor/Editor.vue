<template>
  <div class="editor">
    <div class="editor_container">
      <img
        id="bg_img"
        src=" "
        class="img2">
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
export default {
  name: 'Editor',
  data() {
    return {
      flag: true,
      // canvas对象
      context: {},
      // 是否处于绘制状态
      canvasMoveUse: false,
      // 前后端交互 接受/发送的数据
      FrameData: null,
      // 前端接受到的数据
      ReceiveData: null,
      // 背景图片缓存
      img: new Image(),
      container_dom: null,
      bg_dom: null,
      cvs_dom: null,
      ctx: null,
      // 每个框的标注属性显示 GT/FP/IGNORE, 需要被选择
      box_type: 'GT',
      // box 的选项
      options: [
        {
          value: 'GT',
          label: 'GT'
        },
        {
          value: 'FP',
          label: 'FP'
        },
        {
          value: 'IGNORE',
          label: 'IGNORE'
        }
      ]
    }
  },
  mounted() {
    paper.setup('detection_canvas')
    // document.getElementById('pan').click()
    this.load()
  },
  methods: {
    load() {
      if (this.flag) {
        this.resetCanvas()
      }
    },
    resetCanvas() {
      this.bg_dom = document.getElementById('bg_img')
      this.cvs_dom = document.getElementById('detection_canvas')
      getItem().then(response => {
        this.drawBackground(response)
      })
    },
    drawBackground(data) {
      this.bg_dom.src = 'data:image/png;base64,' + data.img
      const load = () => {
        paper.view.viewSize.width = this.bg_dom.width
        paper.view.viewSize.height = this.bg_dom.height

        this.drawBoxes(data)
        console.log(data)
      }
      this.bg_dom.onload = load

      // const raster = new paper.Raster('data:image/png;base64,' + data.img)
      // raster.position = paper.view.center
      // const load = () => {
      //   raster.size = new paper.Size(paper.view.viewSize.width, paper.view.viewSize.height)
      //   console.log(raster)
      // }
      // raster.onLoad = load

      const resize = event => {
        console.log(paper.view.center)
        console.log(event)

        // 修改所有item
        // raster.position = paper.view.center
        // raster.size = new paper.Size(paper.view.viewSize.width, paper.view.viewSize.height)
        // paper.view.center = new paper.Point(paper.view.center.x + event.delta.x, paper.view.center.y + event.delta.y)
      }
      paper.view.onResize = resize
    },
    drawBoxes(data) {
      if ('dt_items' in data) {
        // this.Draw_boxes(ctx, data['dt_items'], "yellow", "dt_items");
        if ('dtboxes' in data['dt_items']) {
          for (const index in data['dt_items']['dtboxes']) {
            // console.log('load dt',index, t_boxes['dtboxes'][index], color, dt_or_gt_items)
            // this.Draw_rect(ctx, data['dt_items']['dtboxes'][index], index, 'yellow', 'dt_items')
            this.drawItem(data['dt_items']['dtboxes'][index], 'dt_items')
            // if (!('labeled' in this.FrameData['dt_items']['dtboxes'][index])) {
            //   this.FrameData['dt_items']['dtboxes'][index]['labeled'] = 'GT'
            // }
            // this.FrameInfo['dt_nums'] += 1
          }
        }
      }

      // draw gt boxes
      if ('gt_items' in data) {
        // this.Draw_boxes(ctx, data['gt_items'], "green", "gt_items");
        if ('gtboxes' in data['gt_items']) {
          for (const index in data['gt_items']['gtboxes']) {
            // console.log('load gt',index, t_boxes['gtboxes'][index], color, dt_or_gt_items)
            // this.Draw_rect(ctx, data['gt_items']['gtboxes'][index], Number(index) + Number(this.FrameInfo['dt_nums']), 'green', 'gt_items')
            this.drawItem(data['gt_items']['gtboxes'][index], 'gt_items')
            // if (!('labeled' in this.FrameData['gt_items']['gtboxes'][index])) {
            //   this.FrameData['gt_items']['gtboxes'][index]['labeled'] = 'GT'
            // }
            // this.FrameInfo['gt_nums'] += 1
          }
        }
      }
    },

    drawItem(item, type) {
      if (item) {
        var tl = this.Rel2abs(
          {
            x: item['box'][0],
            y: item['box'][1]
          }
        )
        // var br = this.Rel2abs(
        //   {
        //     x: item['box'][0] + item['box'][2],
        //     y: item['box'][1] + item['box'][3]
        //   }
        // )
        var wh = this.Rel2abs(
          {
            x: item['box'][2],
            y: item['box'][3]
          }
        )
        const tag = item['tag']

        // this.FrameInfo[type].push({
        //   tl: tl,
        //   br: br,
        //   type: tag,
        //   color: 'yellow',
        //   box_type: 'true_box'
        // })

        const newPaperItem = new paper.Path.Rectangle({
          point: [tl.x, tl.y],
          size: [wh.x, wh.y],
          data: {
            type: 'rectangle',
            class: item.tag,
            data: item.data
          },
          locked: false
        })
        newPaperItem.strokeWidth = 4
        this.drawItemColor(newPaperItem, item, type)
      }
    },
    drawItemColor(paperItem, stateItem, type) {
      const defaultColors = this.defaultColors()
      if (paperItem.closed) {
        if (stateItem.color && stateItem.color.fill) {
          if (typeof stateItem.color.fill === 'string') {
            paperItem.fillColor = stateItem.color.fill
            paperItem.fillColor.alpha = 0.2
          } else {
            paperItem.fillColor = new paper.Color({
              hue: stateItem.color.fill.hue,
              saturation: stateItem.color.fill.saturation,
              lightness: stateItem.color.fill.lightness,
              alpha: stateItem.color.fill.alpha
            })
          }
        }
      }

      if (stateItem.color && stateItem.color.stroke) {
        if (typeof stateItem.color.stroke === 'string') {
          paperItem.strokeColor = stateItem.color.stroke
        } else {
          paperItem.strokeColor = new paper.Color({
            hue: stateItem.color.stroke.hue,
            saturation: stateItem.color.stroke.saturation,
            lightness: stateItem.color.stroke.lightness,
            alpha: stateItem.color.stroke.alpha
          })
        }
      } else {
        if (type === 'dt_items') {
          paperItem.fillColor = defaultColors[0].fill
          paperItem.strokeColor = defaultColors[0].stroke
        } else {
          paperItem.fillColor = defaultColors[1].fill
          paperItem.strokeColor = defaultColors[1].stroke
        }
      }
    },
    defaultColors() {
      return [{
        fill: {
          hue: 82,
          saturation: 0.64,
          lightness: 0.64,
          alpha: 0.7
        },
        stroke: {
          hue: 82,
          saturation: 0.64,
          lightness: 0.64,
          alpha: 1
        }
      }, {
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
      }]
    },
    Rel2abs(pt) {
      console.log(pt)
      return {
        x: Math.round(pt.x * this.bg_dom.width),
        y: Math.round(pt.y * this.bg_dom.height)
      }
    }

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
