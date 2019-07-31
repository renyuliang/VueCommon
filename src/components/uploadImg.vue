<template>
  <div>
    <el-upload
      v-loading="loading"
      :class="{'upload-demo': !initClass ? 'avatar-uploader' : initClass}"
      :action="importUrl"
      :show-file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :accept="uploadType === 'image' ? 'image/jpeg,image/jpg,image/png' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
      :on-progress="handProgress"
      :on-error="handError"
      :on-success="handSuccess">
      <div v-if="!initClass">
        <el-button size="small" type="primary">{{ uploadTitle }}</el-button>
      </div>
      <div v-if="initClass">
        <div class="avatar"></div>
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'uploadImg',
  props: {
    // 上传URL
    importUrl: {
      type: String,
      required: true
    },
    // 上传按钮文案
    uploadTitle: {
      type: String,
      required: true
    },
    // 是否显示上传列表
    fileList: {
      type: Boolean,
      default: false
    },
    // 判断上传类型,默认Excel, 上传图片时，参数传入 image
    uploadType: {
      type: String,
      default: 'excel'
    },
    initClass: false // 上传按钮隐藏，显示样式
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handProgress () {
      this.loading = true
    },
    handError (err, file, fileList) {
      this.loading = false
      this.$message.error('上传失败！');
    },
    handSuccess (response, file, fileList) {
      this.loading = false
      this.$emit('on-success', fileList)
    },
    beforeAvatarUpload(file) {
      if (this.uploadType === 'image') {
        var testmsg=/^image\/(jpeg|png|jpg)$/.test(file.type)
        const isLt4M = file.size / 1024/1024 <=4//图片大小不超过2MB
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        if(!isLt4M) {
          this.$message.error('上传图片大小不能超过 4M!')
          return
        }
        return testmsg  && isLt4M
      } else {
        const isText = file.type === 'application/vnd.ms-excel'
        const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        return (isText | isTextComputer)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
    position: absolute;
    border: 1px solid #bac1ca;
  }
</style>
