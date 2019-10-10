<template>
  <div style="padding: 20px">
    <div class="a_span">
      <router-link to="/compents/zujian">
        <span>常用组件</span>
      </router-link>
      <router-link to="/compents/jsVerifier">
        <span>js验证</span>
      </router-link>
      <router-link to="/compents/jsFunction">
        <span>js常用方法</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .a_span{
    padding-bottom: 20px;
    a{
      display: inline-block;
      padding:10px 20px;
      background: green;
      color: #fff;
    }
  }
  .input{
    border:1px solid #999;
    padding: 4px;
    width: 200px;
    outline: none;
    margin-right: 20px;
  }
  .el-collapse{
    margin-top: 20px;
    width: 50%;
  }
  .el-collapse-item__header{
    background: lightblue;
  }
</style>
