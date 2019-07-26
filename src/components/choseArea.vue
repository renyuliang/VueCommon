<!--areaName  &#45;&#45;  变量名-->
<!--howLevel   &#45;&#45;  判断显示2级 or 3级, 默认显示3级-->
<!--showAllStatus  &#45;&#45;  判断子级是否显示全部-->
<!--getAreaName  &#45;&#45;  返回值-->
<!--<chose-area v-model="areaName" :howLevel='2' showAllStatus = 'true' @on-change="getAreaName"/>-->
<template>
  <div>
    <el-cascader :filterable="true" :options="options" @change="selectArea" placeholder="请选择地区"/>
  </div>
</template>

<script>
/**
 * 选择地区组件
 *  @author yyb
 */
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus } from 'element-china-area-data'
export default {
  name: 'chooseArea',
  // model: { event: 'on-change', prop: 'value' },
  props: {
    // 判断显示2级 or 3级,默认显示3级
    howLevel: {
      type: Number,
      default: 3
    },
    // 判断是否显示全部
    showAllStatus: false
  },
  data () {
    return {
      options: this.howLevel === 2 ? (this.showAllStatus === true ? provinceAndCityDataPlus : provinceAndCityData) : (this.showAllStatus === true ? regionDataPlus : regionData)
    }
  },
  methods: {
    selectArea (arr) {
      // console.log(CodeToText[arr[0]])
      // console.log(CodeToText[arr[1]])
      // console.log(CodeToText[arr[2]])
      this.$emit('on-change', arr)
    }
  }
}
</script>
