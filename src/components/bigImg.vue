<!--<img src="../../assets/images/qq.jpg" alt="" style="width: 60px;height:60px;" @click="clickImg($event)">-->
<!--clickImg (e) {-->
  <!--this.showImg = true-->
  <!--this.imgSrc = e.currentTarget.src-->
<!--}-->

<!--imgSrc &#45;&#45; 地址-->
<!--showImg &#45;&#45; 控制弹窗显示-->
<!--<big-img :imgSrc="imgSrc" v-if="showImg" @clickit="showImg = false"></big-img>-->
<template>
  <!--<div class="img-view" @click="bigImg">-->
    <!--<img src="../../static/image/prev.png" class="imgbtn prev" @click="prev(url)"><img src="" alt="">-->
    <!--<img src="../../static/image/next.png" class="imgbtn next" @click="next(url)"><img src="" alt="">-->
    <!--<div class="scrollbar">-->
      <!--<img :src="imgSrc" class="showImg">-->
    <!--</div>-->
  <!--</div>-->
  <div class="initChangeImg" v-if="showImgDialog" @click="hideDialog">
    <div class="imgPre" :style="objStyle">
      <div class="imgInner" :class="{'scrollbar':showScroll}">
        <img :src="imgSrc" alt="" class="showImg">
      </div>
      <img src="../../static/image/prev.png" class="imgbtn prev" @click="prev(imgSrc)" v-if="isShowBtn"><img src="" alt="">
      <img src="../../static/image/next.png" class="imgbtn next" @click="next(imgSrc)" v-if="isShowBtn"><img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bigImg',
  // props: ['imgSrc'],
  props: {
    imgSrcList: {}, // 接收传入的图片对象
    imgSrcListIndex: 0, // 接收传入img对象的index
    showImgDialog: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      showScroll: false,
      isShowBtn: true,
      objStyle: {
        width: (window.innerWidth/1.5)+'px',
        height: (window.innerHeight/1.1)+'px'
      },
      imgSrc: ''
    }
  },
  watch: {
    'showImgDialog' () {
      // 默认显示
      if (this.showImgDialog == true) {
        this.imgSrc = this.imgSrcList[this.imgSrcListIndex].url
        this.setScroll()
      }
      // 判断是否出现 上 下 切换的图片
      if (this.imgSrcList.length >= 2) {
        this.isShowBtn = true
      } else {
        this.isShowBtn = false
      }
    }
  },
  methods: {
    // 关闭弹窗
    hideDialog(event){
      let _this = this
      let ele = document.getElementsByClassName('imgPre')[0]
      if (ele) {
        if (!ele.contains(event.target)) {
          _this.$emit('closeDialog')
        }
      }
    },
    // 下一张
    next(url) {
      this.imgSrcList.forEach((item, index) => {
        if (url === item.url) {
          var addIndex = index + 1
          if (addIndex !== this.imgSrcList.length) {
            this.imgSrc = this.imgSrcList[addIndex].url
            this.setScroll()
          }
        }
      })
    },
    // 上一张
    prev(url) {
      this.imgSrcList.forEach((item, index) => {
        if (url === item.url) {
          var reIndex = index - 1
          if (reIndex >= 0) {
            this.imgSrc = this.imgSrcList[reIndex].url
            this.setScroll()
          }
        }
      })
    },
    // 判断图片高度，设置滚动条
    setScroll(){
      setTimeout(()=>{
        let imgHeiht = document.getElementsByClassName('showImg')[0].clientHeight
        // 图片高度大于屏幕高度
        imgHeiht > (window.innerHeight/1.1) ? this.showScroll = true : this.showScroll = false
      },1)
    }
  }
}
</script>

<style scoped lang="scss">
  /*.img-view {*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*background: rgba(0,0,0,.1);*/
    /*z-index: 999;*/
    /*display: flex;*/
    /*align-content: center;*/
    /*img{*/
      /*margin: auto;*/
      /*max-width: 90%;*/
      /*max-height: 90%;*/
    /*}*/
  /*}*/
  .initChangeImg{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imgPre{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 50px;
      overflow: hidden;
      .imgInner{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          max-width: 100%;
        }
        &.scrollbar{
          overflow-y: scroll;
        }
      }
      .imgbtn{
        position: absolute;
        cursor: pointer;
        &.prev{
          top:50%;
          left: 0;
        }
        &.next{
          top:50%;
          right: 0;
        }
      }
    }
  }
</style>
