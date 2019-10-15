<!--调用方式-->
<!--<chose-One-->
  <!--intiTitle="单选标题"-->
  <!--:dialog-visible="dialogChoseOne"-->
  <!--:searchInitList="searchInitList"-->
  <!--:tableInitProps="tableInitProps"-->
  <!--:tableInitUrl="'../../static/queryPage.json'"-->
  <!--@on-cancel="dialogChoseOne = false"-->
  <!--@on-confirm="confirmName"/>-->
<template>
  <el-dialog
    :title="intiTitle"
    :visible.sync="dialogVisible"
    width="1040px"
    top="7vh"
    :close-on-click-modal="false" :before-close="handleCancel">
    <div class="pub-search">
      <el-form :inline="true" size="mini">
        <el-form-item :label="item.title" :key="index" v-for="(item,index) in searchInitList">
          <el-input :maxlength="item.maxlength" v-model="item.modelName" :placeholder="item.placeholder" v-if="item.searchStyle === 'input'"/>
          <el-select v-model="item.modelName" :placeholder="item.placeholder"  v-if="item.searchStyle === 'select'">
            <el-option
              v-for="(item2,index) in item.options"
              :key="index"
              :label="item2.label"
              :value="item2.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="public_chose_people">
      <el-row>
        <el-col :span="24" class="visit_add_center">
          <template>
            <el-table
              ref="table"
              :data="tableList"
              style="width: 100%"
              class="tableset tabledialog"
              row-key="id"
              highlight-current-row
              @row-click="handleRowClick">
              <el-table-column
                v-for="(item,index) in tableInitProps"
                :key="index"
                :prop="item.name"
                :label="item.label"
                align="center">
              </el-table-column>
            </el-table>
          </template>
          <div class="page">
            <el-pagination
              layout="prev, pager, next"
              background
              @current-change="handleCurrentChange"
              :current-page="query.pageNum"
              :page-size="query.pageSize"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="sureChoose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'choseOne',
  event: 'change',
  props: {
    // 弹窗标题
    intiTitle: {
      type: String,
      default: ''
    },
    // 弹窗
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 搜索内容设置
    searchInitList: Array,
    // table 列表项
    tableInitProps: Array,
    // table 接口请求
    tableInitUrl: ''
  },
  data () {
    return {
      tableList: [],
      total: 0, // 总条数
      query: {
        pageNum: 1,
        pageSize: 8
      },
      selectUser: ''
    }
  },
  mounted () {
    this.loadPage()
  },
  methods: {
    // 筛选
    search () {
      this.query.pageNum = 1
      var params = {}
      // 动态获取搜索条件值
      for (var i = 0; i < this.searchInitList.length; i++) {
        params[this.searchInitList[i].searchName] = this.searchInitList[i].modelName
      }
      Object.assign(this.query, params)
      this.loadPage()
    },
    // 重置
    reset () {
      this.query.pageNum = 1
      var params = {}
      // 动态获取搜索条件值
      for (var i = 0; i < this.searchInitList.length; i++) {
        params[this.searchInitList[i].searchName] = '' // 接口字段置空
        this.searchInitList[i].modelName = '' // model置空
      }
      Object.assign(this.query, params)
      this.loadPage()
    },
    // 加载table列表
    loadPage () {
      this.$axios.get(this.tableInitUrl, this.query)
        .then((res) => {
          this.tableList = res.data.list
          this.total = res.data.total
        })
    },
    // 医院分页处理
    handleCurrentChange (pageNum) {
      this.query.pageNum = pageNum
      this.loadPage()
    },
    // 行点击
    handleRowClick (row) {
      this.selectUser = row
    },
    handleCancel () {
      this.$emit('on-cancel')
    },
    sureChoose () {
      if (this.selectUser.length <= 0) {
        this.$message.error('请选择')
        return
      }
      this.$emit('on-confirm', this.selectUser)
    }
  }
}
</script>
<style lang="scss" scoped>
  .public_chose_people .visit_add_center { position: relative; }

  .public_chose_people .visit_add_center .el-table td, .public_chose_people .visit_add_center .el-table th { padding: 7px 0; }

  .public_chose_people .visit_add_center .table td { padding: 8px 4px !important; font-size: 14px; }

  .public_chose_people .visit_add_center .page { text-align: center;margin-top: 15px;}

  .public_chose_people .visit_add_center.col-xs-8 .el-table__body-wrapper tr:hover td { cursor: pointer; background-color: #707B98 !important; color: #ffffff; }

  .pub-search .el-input{
    width: 160px;
  }
</style>
