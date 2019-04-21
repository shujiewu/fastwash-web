<template>
  <div class="component-item">
    <el-form v-if="propertyList.length > 0 && selectedItems.length > 0" ref="form" :model="form" label-width="80px">
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
        <el-button>重置</el-button>
      </el-form-item>
      <!--      <el-form-item label="选择框">-->
      <!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
      <!--          <el-option label="区域一" value="shanghai"/>-->
      <!--          <el-option label="区域二" value="beijing"/>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="多选框">-->
      <!--        <el-checkbox-group v-model="form.type">-->
      <!--          <el-checkbox label="美食/餐厅线上活动" name="type"/>-->
      <!--          <el-checkbox label="地推活动" name="type"/>-->
      <!--          <el-checkbox label="线下主题活动" name="type"/>-->
      <!--          <el-checkbox label="单纯品牌曝光" name="type"/>-->
      <!--        </el-checkbox-group>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="单选框">-->
      <!--        <el-radio-group v-model="form.resource">-->
      <!--          <el-radio label="True"/>-->
      <!--          <el-radio label="False"/>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="onSubmit">保存</el-button>-->
      <!--        <el-button>重置</el-button>-->
      <!--      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Property',
  data() {
    return {
      form: {
      },
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
        // console.log(this.multiChoice)
      }
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      if (this.selectedItems.length > 0) {
        this.selectedItems[0].data.prop = this.form
      }
      console.log(this.selectedItems[0].data)
      // this.propertyList.forEach(property =>
    }
  }
}
</script>

<style scoped>
  .component-item{
    min-height: 400px;
  }
</style>
