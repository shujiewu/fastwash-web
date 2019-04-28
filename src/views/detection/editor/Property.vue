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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
    propertyList: function(val) {
      if (this.propertyList.length > 0) {
        this.input = this.propertyList.filter(property => property.type === 'Input')
        this.binaryClass = this.propertyList.filter(property => property.type === 'Binary Classification')
        this.multiClass = this.propertyList.filter(property => property.type === 'Multiple Classification')
        this.multiChoice = this.propertyList.filter(property => property.type === 'Multiple Choice')
      }
    },
    selectedItems: function(val) {
      // /bug
      if (this.selectedItems.length > 0 && this.selectedItems[0].data.prop !== undefined) {
        // this.form = this.selectedItems[0].data.prop
      } else {
        this.initForm()
        // console.log(this.form)
        // if (this.multiChoice.length !== 0) {
        //   this.form = {}
        //   this.multiChoice.forEach(item => {
        //     this.form[item.id] = []
        //   })
        // } else {
        //   this.form = {}
        // }
      }
    }
  },
  mounted() {
  },
  methods: {
    initForm() {
      // this.form = {
      //   '1': '1',
      //   '2': '2',
      //   '3': '3',
      //   '4': '4'
      // }

      // console.log(1111)
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
      // console.log(this.form)
    },
    onSubmit() {
      if (this.selectedItems.length > 0) {
        this.selectedItems[0].data.prop = this.form
      }
    },
    onReset() {
      if (this.selectedItems.length > 0 && this.selectedItems[0].data.prop !== undefined) {
        this.form = this.selectedItems[0].data.prop
      } else {
        this.initForm()
        // if (this.multiChoice.length !== 0) {
        //   this.form = {}
        //   this.multiChoice.forEach(item => {
        //     this.form[item.id] = []
        //   })
        // } else {
        //   this.form = {}
        // }
      }
    }
  }
}
</script>

<style scoped>
  .component-item{
    min-height: 250px;
  }
</style>
