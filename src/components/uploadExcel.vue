<template>
  <el-dialog :visible.sync="dialogVisible" :title="intiTitle" top="40vh" width="40%" :before-close="handleCancel">
    <el-form size="mini" label-width="100px">
      <el-form-item label="导入模板">
        <upload-img
          import-url="https://jsonplaceholder.typicode.com/posts/"
          uploadTitle="附件上传"
          :fileList="true"
          @on-success="handSuccessExcel">
        </upload-img>
      </el-form-item>
      <el-form-item label="模板名称">
        <a target="_blank" :href="templateHref">{{templateName}}</a>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import uploadImg from './uploadImg'
/**
 * Excel导入组件
 * @author yyb
 */
export default {
  name: 'upload',
  components: { uploadImg },
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
    }
  },
  computed: {
    templateHref () {
      return `/download/excel-template?filePath=${this.templateName}`
    }
  },
  methods: {
    handSuccessExcel (val) {
      this.$emit('on-getVal', val)
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
