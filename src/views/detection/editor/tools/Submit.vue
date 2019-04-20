<template>

  <el-button type="primary" icon="el-icon-success" @click.native="onSubmit">提交</el-button>
</template>
<script>
import paper from 'paper'
export default {
  name: 'Submit',
  data() {
    return {
      frameData: {}
    }
  },
  methods: {
    onSubmit() {
      if (!('gt_items' in this.frameData)) {
        this.frameData.gt_items = {}
      }
      if (!('gtboxes' in this.frameData.gt_items)) {
        this.frameData.gt_items.gtboxes = []
      }
      const items = paper.project.getItems({
        className: function(className) {
          return (className === 'Path')
        }
      })
      for (const item of items) {
        const re_tl = this.Abs2rel(item.point)
        const re_wh = this.Abs2rel(item.size)
        this.frameData.gt_items.gtboxes.push({
          box: [re_tl.x, re_tl.y, re_wh.x, re_wh.y],
          labeled: 'GT',
          tag: item.data.class
        })
      }
      console.log(this.frameData)
      // paper.project.layers.forEach(layer => {
      //   console.log(layer)
      //   layer.children.forEach(
      //     (value, index) => {
      //       if (index !== 0) {
      //         console.log(value)
      //         if (!('gt_items' in this.frameData)) {
      //           this.frameData.gt_items = {}
      //         }
      //         if (!('gtboxes' in this.frameData.gt_items)) {
      //           this.frameData.gt_items.gtboxes = []
      //         }
      //         const re_tl = this.Abs2rel(value.point)
      //         const re_wh = this.Abs2rel(value.size)
      //         this.frameData.gt_items.gtboxes.push({
      //           box: [re_tl.x, re_tl.y, re_wh.x, re_wh.y],
      //           labeled: 'GT',
      //           tag: value.data.class
      //         })
      //       }
      //     }
      //   )
      // })
    },
    Abs2rel(pt) {
      return {
        x: 1.0 * pt[0] / paper.view.viewSize.width,
        y: 1.0 * pt[1] / paper.view.viewSize.height
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

</style>
