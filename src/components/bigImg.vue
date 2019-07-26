<!--<img src="../../assets/images/qq.jpg" alt="" style="width: 60px;height:60px;" @click="clickImg($event)">-->
<!--clickImg (e) {-->
  <!--this.showImg = true-->
  <!--this.imgSrc = e.currentTarget.src-->
<!--}-->

<!--imgSrc &#45;&#45; 地址-->
<!--showImg &#45;&#45; 控制弹窗显示-->
<!--<big-img :imgSrc="imgSrc" v-if="showImg" @clickit="showImg = false"></big-img>-->
<template>
  <div class="img-view" @click="bigImg">
    <img :src="imgSrc">
  </div>
</template>

<script>
export default {
  name: 'bigImg',
  // props: ['imgSrc'],
  props: {
    imgSrc: {
      type: String,
      require: true
    }
  },
  methods: {
    bigImg () {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>

<style scoped lang="scss">
  .img-view {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.1);
    z-index: 999;
    display: flex;
    align-content: center;
    img{
      margin: auto;
      max-width: 90%;
      max-height: 90%;
    }
  }
</style>
