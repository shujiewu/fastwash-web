<template>
  <div class="component-item">
    <el-form v-show="propertyList.length > 0 && selectedItems.length > 0" ref="form" :model="form" label-width="80px">
      <el-form-item v-for="item in input" :key="item.id" :label="item.name">
        <el-input v-model="form[item.id]"/>
      </el-form-item>
      <el-form-item v-for="item in binaryClass" :key="item.id" :label="item.name">
        <el-radio-group v-model="form[item.id]">
          <el-radio :label="item.options[0]"/>
          <el-radio :label="item.options[1]"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="item in multiClass" :key="item.id" :label="item.name">
        <el-select v-model="form[item.id]" placeholder="请选择">
          <el-option
            v-for="option in item.options"
            :label="option"
            :value="option"
            :key="option"/>
        </el-select>
      </el-form-item>
      <el-form-item v-for="item in multiChoice" :key="item.id" :label="item.name">
        <el-select v-model="form[item.id]" multiple placeholder="请选择">
          <el-option
            v-for="option in item.options"
            :label="option"
            :value="option"
            :key="option"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'

/** 属性设置 **/
export default {
  name: 'Property',
  data() {
    return {
      form: {},
      input: [],
      binaryClass: [],
      multiClass: [],
      multiChoice: []
    }
  },
  computed: {
    ...mapState({
      propertyList: state => {
        return state.detection.property
      },
      selectedItems: state => state.detection.selectedItems
    })
  },
  watch: {
    // 监听全局属性列表的变化
    propertyList: function(val) {
      if (this.propertyList.length > 0) {
        this.input = this.propertyList.filter(property => property.type === 'Input')
        this.binaryClass = this.propertyList.filter(property => property.type === 'Binary Classification')
        this.multiClass = this.propertyList.filter(property => property.type === 'Multiple Classification')
        this.multiChoice = this.propertyList.filter(property => property.type === 'Multiple Choice')
      }
    },
    // 监听被选中的box变化
    selectedItems: function(val) {
      if (this.selectedItems.length > 0) {
        if (this.selectedItems[0].data.prop !== undefined) {
          this.form = this.selectedItems[0].data.prop
        } else {
          this.initForm()
        }
      }
    },
    // 监听form变化, 并修改box对应的属性
    form: {
      deep: true,
      handler: function(newVal) {
        if (this.selectedItems.length > 0) {
          this.selectedItems[0].data.prop = JSON.parse(JSON.stringify(newVal))
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    initForm() {
      this.form = {}
      if (this.input.length !== 0) {
        this.input.forEach(item => {
          this.$set(this.form, item.id, item.default)
        })
      }
      if (this.binaryClass.length !== 0) {
        this.binaryClass.forEach(item => {
          this.$set(this.form, item.id, item.default)
        })
      }
      if (this.multiClass.length !== 0) {
        this.multiClass.forEach(item => {
          this.$set(this.form, item.id, item.default)
        })
      }
      if (this.multiChoice.length !== 0) {
        this.multiChoice.forEach(item => {
          this.$set(this.form, item.id, item.default)
        })
      }
    },
    onSubmit() {
      if (this.selectedItems.length > 0) {
        this.selectedItems[0].data.prop = JSON.parse(JSON.stringify(this.form))
      }
    },
    onReset() {
      if (this.selectedItems.length > 0 && this.selectedItems[0].data.prop !== undefined) {
        this.form = this.selectedItems[0].data.prop
      } else {
        this.initForm()
      }
    }
  }
}
</script>

<style scoped>
  .component-item{
    margin-left: 20px;
    margin-top: 10px;
  }
</style>
