<!--dialogUpload &#45;&#45; 控制弹窗是否显示-->
<!--intiTitle  &#45;&#45; 自定义弹窗名称-->
<!--import-url   &#45;&#45; 上传地址-->
<!--templateName &#45;&#45; 模板-->
<!--errorTitle   &#45;&#45; 上传错误的提示-->
<!--@on-cancel   &#45;&#45; 关闭弹窗-->
<!--@on-success  &#45;&#45; 成功后的操作-->

<!--<upload-->
  <!--:dialog-visible="dialogUpload"-->
  <!--intiTitle="附件上传名称"-->
  <!--import-url="https://jsonplaceholder.typicode.com/posts/"-->
  <!--templateName="兼职竞拍上传模板.xlsx"-->
  <!--errorTitle="这里是上次错误后的原因显示"-->
  <!--@on-cancel="dialogUpload = false"-->
  <!--@on-success="handSuccess"-->
<!--&gt;</upload>-->
<template>
  <el-dialog :visible.sync="dialogVisible" :title="intiTitle" top="40vh" width="40%" :before-close="handleCancel">
    <el-form size="mini" label-width="100px">
      <el-form-item label="导入模板">
        <el-upload
          v-loading="loading"
          class="upload-demo"
          :action="importUrl"
          :on-progress="handProgress"
          :on-error="handError"
          :on-success="handSuccess">
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="模板名称">
        <a target="_blank" :href="templateHref">{{templateName}}</a>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
/**
 * Excel导入组件
 * @author yyb
 */
export default {
  name: 'upload',
  props: {
    /**
     * 控制对话框的显示隐藏
     */
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 对话框标题
     */
    intiTitle: {
      type: String,
      required: true
    },
    /**
     * 模板名称,带后缀,必须保持和后台的模板名称一致，否则无法下载
     */
    templateName: {
      type: String,
      required: true
    },
    /**
     * 导入的后台URL地址,形如：/auction/import
     */
    importUrl: {
      type: String,
      required: true
    },
    errorTitle: {
      type: String,
      required: false
    }
  },
  computed: {
    templateHref () {
      return `/download/excel-template?filePath=${this.templateName}`
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handProgress () {
      this.loading = true
    },
    handError () {
      this.loading = false
      this.$message.error(this.errorTitle)
    },
    handSuccess (response, file, fileList) {
      this.loading = false
      this.$emit('on-success', fileList)
      this.handleCancel()
    },
    /* 取消选择 */
    handleCancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>
<style lang="scss">
  .el-upload-list{
    width: 400px;
    display: inline-block;
    vertical-align: top;
  }
  .el-upload-list__item:first-child{
    margin-top: 4px;
    margin-left: 10px;
  }

</style>
