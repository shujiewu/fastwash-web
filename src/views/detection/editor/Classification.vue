<template>
  <div class="component-item">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择类别">
        <el-select
          v-model="selectedTag"
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签"
          @change="handleChange">
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-col :span="8">
          <el-color-picker v-model="strokeColor" show-alpha @change="handleStrokeColorChange"/>
        </el-col>
        <el-col :span="8" class="line" style="text-align: center;font-weight: bold">覆盖颜色</el-col>
        <el-col :span="8">
          <el-color-picker v-model="fillColor" show-alpha @change="handleFillColorChange"/>
        </el-col>
      </el-form-item>
    </el-form>
    <!--            <el-form :inline="true" :model="form" label-width="80px">-->
    <!--              <el-form-item label="边框颜色">-->
    <!--                <el-color-picker v-model="color1" class="float:right"/>-->
    <!--              </el-form-item>-->
    <!--              <el-form-item label="覆盖颜色">-->
    <!--                <el-color-picker v-model="color2" show-alpha/>-->
    <!--              </el-form-item>-->
    <!--            </el-form>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Classification',
  data() {
    return {
      form: {
        name: '',
        region: ''
      },
      tags: [{
        value: 'vehicle',
        label: 'vehicle'
      }, {
        value: 'vehicle2',
        label: 'vehicle2'
      },
      {
        value: 'vehicle3',
        label: 'vehicle3'
      }],
      selectedTag: [],
      strokeColor: 'rgba(19, 206, 102, 1)',
      fillColor: 'rgba(19, 206, 102, 0.5)'
    }
  },
  computed: {
    ...mapState({
      selectedItems: state => state.detection.selectedItems
    })
  },
  watch: {
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        this.selectedTag = this.selectedItems[0].data.class
        this.strokeColor = `rgba(${this.selectedItems[0].strokeColor.red * 255},${this.selectedItems[0].strokeColor.green * 255},${this.selectedItems[0].strokeColor.blue * 255},${this.selectedItems[0].strokeColor.alpha})`// this.selectedItems[0].fillColor
        this.fillColor = `rgba(${this.selectedItems[0].fillColor.red * 255},${this.selectedItems[0].fillColor.green * 255},${this.selectedItems[0].fillColor.blue * 255},${this.selectedItems[0].fillColor.alpha})`// this.selectedItems[0].fillColor
      }
    }
  },
  methods: {
    handleChange(value) {
      if (this.selectedItems.length > 0) {
        this.selectedItems[0].data.class = value
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
      color = this.colorToRGBA(color)
      if (this.selectedItems.length > 0) {
        this.selectedItems.every(
          (value, index, array) => {
            value.strokeColor.red = color.red
            value.strokeColor.green = color.green
            value.strokeColor.blue = color.blue
            value.strokeColor.alpha = color.alpha
          })
      }
    },
    handleFillColorChange(color) {
      color = this.colorToRGBA(color)
      if (this.selectedItems.length > 0) {
        if (this.selectedItems.length > 0) {
          this.selectedItems.every(
            (value, index, array) => {
              value.fillColor.red = color.red
              value.fillColor.green = color.green
              value.fillColor.blue = color.blue
              value.fillColor.alpha = color.alpha
            })
        }
      }
    }
  }
}
</script>

<style scoped>
  .component-item{
    min-height: 150px;
  }
</style>
