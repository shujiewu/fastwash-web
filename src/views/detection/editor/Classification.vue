<template>
  <div class="component-item">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择类别">
        <el-select
          v-model="selectedTag"
          :disabled="!hasSelection"
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签"
          @change="handleChange">
          <el-option
            v-for="item in classification"
            :key="item.value"
            :label="item.value"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-col :span="8">
          <el-color-picker
            :disabled="!hasSelection"
            v-model="strokeColor"
            show-alpha
            @change="handleStrokeColorChange"/>
        </el-col>
        <el-col :span="8" class="line" style="text-align: center;font-weight: bold">覆盖颜色</el-col>
        <el-col :span="8">
          <el-color-picker :disabled="!hasSelection" v-model="fillColor" show-alpha @change="handleFillColorChange"/>
        </el-col>
      </el-form-item>
      <!--      <el-form-item label="显示">-->
      <!--        <el-col :span="20">-->
      <!--          <div class="block">-->
      <!--            <el-slider v-model="alpha" :show-tooltip="false" @change="handleAlpha"/>-->
      <!--          </div>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import paper from 'paper'
export default {
  name: 'Classification',
  data() {
    return {
      form: {
      },
      selectedTag: '',
      hasSelection: false,
      strokeColor: 'rgba(19, 206, 102, 1)',
      fillColor: 'rgba(19, 206, 102, 0.5)',
      alpha: 50
    }
  },
  computed: {
    ...mapState({
      selectedItems: state => state.detection.selectedItems,
      classification: state => state.detection.classification
    })
  },
  watch: {
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        this.hasSelection = true
        this.selectedTag = this.selectedItems[0].data.class
        this.strokeColor = `rgba(${this.selectedItems[0].strokeColor.red * 255},${this.selectedItems[0].strokeColor.green * 255},${this.selectedItems[0].strokeColor.blue * 255},${this.selectedItems[0].strokeColor.alpha})`// this.selectedItems[0].fillColor
        this.fillColor = `rgba(${this.selectedItems[0].fillColor.red * 255},${this.selectedItems[0].fillColor.green * 255},${this.selectedItems[0].fillColor.blue * 255},${this.selectedItems[0].fillColor.alpha})`// this.selectedItems[0].fillColor
      } else {
        this.hasSelection = false
        // this.selectedTag = []
      }
    }
  },
  methods: {
    ...mapActions({
      setClassificationFillColor: 'detection/setClassificationFillColor',
      setClassificationStrokeColor: 'detection/setClassificationStrokeColor'
    }),
    handleChange(value) {
      if (this.selectedItems.length > 0) {
        this.selectedItems[0].data.class = value
        this.fillColor = (this.classification.filter(item => item.value === value))[0].fillColor
        this.strokeColor = (this.classification.filter(item => item.value === value))[0].strokeColor
        this.selectedItems[0].fillColor = this.colorToRGBA(this.fillColor)
        this.selectedItems[0].strokeColor = this.colorToRGBA(this.strokeColor)
      }
    },

    colorToRGBA(color) {
      const parts = color.replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? val : val / 255)
      return {
        red: parts[0],
        green: parts[1],
        blue: parts[2],
        alpha: parts[3]
      }
    },

    handleStrokeColorChange(color) {
      this.setClassificationStrokeColor({ tag: this.selectedTag, strokeColor: color })
      color = this.colorToRGBA(color)
      const items = paper.project.getItems({
        className: function(className) {
          return (className === 'Path')
        }
      })
      for (const item of items) {
        if (item.data.class === this.selectedTag) {
          item.strokeColor.red = color.red
          item.strokeColor.green = color.green
          item.strokeColor.blue = color.blue
          item.strokeColor.alpha = color.alpha
        }
      }
    },
    handleFillColorChange(color) {
      this.setClassificationFillColor({ tag: this.selectedTag, fillColor: color })
      color = this.colorToRGBA(color)
      const items = paper.project.getItems({
        className: function(className) {
          return (className === 'Path')
        }
      })
      for (const item of items) {
        if (item.data.class === this.selectedTag) {
          item.fillColor.red = color.red
          item.fillColor.green = color.green
          item.fillColor.blue = color.blue
          item.fillColor.alpha = color.alpha
        }
      }
    },
    handleAlpha() {
      const items = paper.project.getItems({
        className: function(className) {
          return (className === 'Path')
        }
      })
      for (const item of items) {
        if (item.data.class === this.selectedTag) {
          item.fillColor.alpha = 0
          item.strokeColor.alpha = 0
        }
      }
    }
  }
}
</script>

<style scoped>
  .component-item {
    min-height: 100px;
  }
</style>
