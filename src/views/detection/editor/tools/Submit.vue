<template>

  <el-button type="primary" icon="el-icon-success" @click.native="onSubmit">提交</el-button>
</template>
<script>
// import paper from 'paper'
// import protoRoot from '@/proto/proto'
import { mapState, mapActions } from 'vuex'
import { transformSubmit } from '@/utils/proto'
import { submitItem } from '@/api/detection'
import { uint8ToString } from '@/utils/utils'

export default {
  name: 'Submit',
  data() {
    return {
      frameData: {}
    }
  },
  computed: {
    ...mapState({
      originalAnnotation: state => state.detection.originalAnnotation,
      currentAnnotation: state => state.detection.currentAnnotation
    })
  },
  methods: {
    ...mapActions({
      saveAnnotation: 'detection/saveAnnotation'
    }),
    onSubmit() {
      // 先保存当前再提交
      this.saveAnnotation()
      let frameResult = this.originalAnnotation
      frameResult.items = []
      for (const index in this.currentAnnotation) {
        const item = this.currentAnnotation[index]
        frameResult.items.push({
          box: item.box,
          itemTextUtf8: JSON.stringify({
            class: item.class,
            prop: item.prop,
            status: item.status
          })
        })
      }
      frameResult = transformSubmit(frameResult)

      // 测试反序列化是否可以
      // var b64encoded = btoa(String.fromCharCode.apply(null, frameResult))
      // var b64encoded = ''
      // var len = frameResult.byteLength
      // for (var i = 0; i < len; i++) {
      //   b64encoded += String.fromCharCode(frameResult[i])
      // }
      // b64encoded = window.btoa(b64encoded)
      // var u8_2 = new Uint8Array(atob(b64encoded).split('').map(function(c) {
      //   return c.charCodeAt(0)
      // }))
      // const MessageResponse = protoRoot.lookup('sputnik.pb.FrameResult')
      // const decodedResponse = MessageResponse.decode(u8_2)
      // console.log(decodedResponse)
      const data = {
        data: btoa(uint8ToString(frameResult))
      }
      console.log(data)
      submitItem(data).then(response => {
        if (response.success) {
          console.log(response)
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '提交失败'
          })
        }
      })
      // if (!('gt_items' in this.frameData)) {
      //   this.frameData.gt_items = {}
      // }
      // if (!('gtboxes' in this.frameData.gt_items)) {
      //   this.frameData.gt_items.gtboxes = []
      // }
      // const items = paper.project.getItems({
      //   className: function(className) {
      //     return (className === 'Path')
      //   }
      // })
      // for (const item of items) {
      //   const re_tl = this.Abs2rel([item.bounds.x, item.bounds.y])
      //   const re_wh = this.Abs2rel([item.bounds.width, item.bounds.height])
      //   this.frameData.gt_items.gtboxes.push({
      //     box: [re_tl.x, re_tl.y, re_wh.x, re_wh.y],
      //     labeled: 'GT',
      //     tag: item.data.class,
      //     prop: item.data.prop
      //   })
      // }
      // console.log(this.frameData)
      // this.frameData = []
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
    }
  }
}
</script>

<style scoped>

</style>
