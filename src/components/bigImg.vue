<!--<div>-->
        <!--<span style="margin-right: 50px" v-for="(item,index) in imgList">-->
          <!--<img :src="item.url" alt="" style="width: 60px;height:60px;" @click="clickImg(index)">-->
        <!--</span>-->
<!--</div>-->

<!--<big-img :imgSrcList="imgSrcList" :imgSrcListIndex="imgSrcListIndex" :showImgDialog="showImg" @closeDialog="showImg = false"></big-img>-->

<!--clickImg (index) {-->
  <!--this.showImg = true-->
  <!--this.imgSrcList = this.imgList-->
  <!--this.imgSrcListIndex = index-->
<!--}-->
<template>
<div class="initChangeImg" v-if="showImgDialog" @click="hideDialog">
    <div class="imgPre" :style="objStyle">
      <div class="imgInner" :class="{'scrollbar':showScroll}">
        <img :src="imgSrc" alt="" class="showImg">
      </div>
      <img src="../../static/image/prev.png" class="imgbtn prev" @click="prev(imgSrc)" v-if="isShowBtnPrev"><img src="" alt="">
      <img src="../../static/image/next.png" class="imgbtn next" @click="next(imgSrc)" v-if="isShowBtnNext"><img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bigImg',
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
      isShowBtnPrev: true,
      isShowBtnNext: true,
      changeIndex: 0, // 判断当前图片的index
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
        this.changeIndex = this.imgSrcListIndex
        this.setScroll()
      }
      // 判断是否是第一个
      this.isShowBtnPrev = this.changeIndex == 0 ? false : true
      // 判断是否是最后一个
      this.isShowBtnNext = this.changeIndex >= (this.imgSrcList.length - 1) ? false : true
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
          this.changeIndex = index + 1
          // 判断是否是最后一张
          this.isShowBtnNext = this.changeIndex >= (this.imgSrcList.length - 1) ? false : true
          this.isShowBtnPrev = true
          if (this.changeIndex !== this.imgSrcList.length) {
            this.imgSrc = this.imgSrcList[this.changeIndex].url
            this.setScroll()
          }
        }
      })
    },
    // 上一张
    prev(url) {
      this.imgSrcList.forEach((item, index) => {
        if (url === item.url) {
          this.changeIndex = index - 1
          // 判断是否是第一张
          this.isShowBtnPrev = this.changeIndex == 0 ? false : true
          this.isShowBtnNext = true
          if (this.changeIndex >= 0) {
            this.imgSrc = this.imgSrcList[this.changeIndex].url
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
        if (imgHeiht > (window.innerHeight/1.1)) {
          this.showScroll = true
          this.objStyle.height = (window.innerHeight/1.1)+"px"
        } else {
          this.showScroll = false
          this.objStyle.height = imgHeiht+"px"
        }
      },1)
    }
  }
}
</script>

<style scoped lang="scss">
  .initChangeImg{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 999999;
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
