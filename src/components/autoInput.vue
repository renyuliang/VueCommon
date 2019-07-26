<!--inputName &#45;&#45; 变量名-->
<!--listenVlaue &#45;&#45; 返回的值-->
<!--<auto-input v-model.trim="inputName" :dataUrl="'/basic/yx-hospital-name-like-list'" @listenVal="listenVlaue" ></auto-input>-->
<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="showVal"
      :fetch-suggestions="querySearch"
      placeholder="请输入关键字"
      :trigger-on-focus="false"
      :maxlength="50"
      @select="changeSelect"
      clearable
    >
      <!--自定义显示，可取消-->
      <template slot-scope="{ item }">
        <div class="value" style="color: red">{{ item.value }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'autoInput',
  props: {
    value: '',
    dataUrl: '' // 接口
  },
  data () {
    return {
      showVal: '',
      selection: null
    }
  },
  watch: {
    value (val) {
      this.showVal = val
    }
  },
  created () {
    this.showVal = this.value
  },
  mounted () {
    this.loadAll()
  },
  methods: {
    // querySearch (queryString, cb) {
    //   // this.dataUrl 传值时为医院接口或学术题库产品接口，否者为产品名称接口
    //   this.$axios.get(this.dataUrl || '/basic/yx-drug-name-like-list', { name: queryString, applicableProducts: queryString }).then((res) => {
    //     // this.$axios.get('/basic/yx-drug-name-like-list', { name: queryString }).then((res) => {
    //     const data = res.data
    //     if (data && data.length > 0) {
    //       data.forEach(v => {
    //         v.name = v.name || v.applicableProducts
    //         v.value = v.name
    //       })
    //     }
    //     cb(data)
    //   })
    // },
    // createFilter (queryString) {
    //   return (restaurant) => {
    //     return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    //   }
    // },
    // 模拟数据
    loadAll () {
      let _this = this
      _this.$axios.get(this.dataUrl).then((res) => {
        this.restaurants = res.data.data
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    changeSelect (val) {
      this.$emit('listenVal', val)
    }
  }
}
</script>
