<!--调用方式-->
<!--dialogChoseMore     -&#45;&#45;  控制弹窗是否显示-->
<!--confirmHospitalList     -&#45;&#45;  返回值-->
<!--hospitalList            -&#45;&#45;  已经选择的项目-->
<!--<chose-hospital :dialog-visible="dialogChoseMore" @on-cancel="dialogChoseMore = false" @on-confirm="confirmHospitalList" :checkedList="hospitalList"/>-->
<template>
  <el-dialog
    :title="intiTitle"
    :visible.sync="dialogVisible"
    width="1040px"
    top="7vh"
    :close-on-click-modal="false" :before-close="handleCancel">
    <div>
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
          <el-col :span="17" class="visit_add_center">
            <template>
              <el-table
                ref="table"
                :data="tableList"
                v-loading="loading"
                style="width: 100%"
                class="tableset tabledialog"
                row-key="id"
                highlight-current-row
                @row-click="handleRowClick"
                @select="handleSelectionChange"
                @select-all="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="30"
                  align="center">
                </el-table-column>
                <el-table-column
                  v-for="(item,index) in tableInitProps"
                  :key="index"
                  :prop="item.name"
                  :label="item.label"
                  :formatter="item.formatFunction"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
              </el-table>
            </template>
            <div class="page">
              <el-pagination
                layout="total, prev, pager, next"
                background
                @current-change="handleCurrentChange"
                :current-page="query.pageNum"
                :page-size="query.pageSize"
                :total="total">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="7" class="visit_add_right">
            <h1>已选择</h1>
            <div class="right_span scrollbar">
              <span v-for="(item, index) in selectList" :key="item.id" v-cloak :title="item.name.length>6 ? item.name:''">{{item.name.length>6? (item.name.substring(0,6)+'...'): item.name}}<a href="javascript:" :id="item.id" @click="deleteChose(index)"><i class="el-icon-close"></i></a></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="sureChoose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'choseMore',
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
      tableInitUrl: '',
      // 已选择
      checkedList: {}
    },
    event: 'change',
    data() {
      return {
        loading: false,
        tableList: [],
        total: 0, // 总条数
        selectList: [], // 选择的医院
        selectStoreList: [], // 临时选择的医院
        query: {
          type: 2, // 此版本 固定参数
          pageNum: 1,
          pageSize: 8
        }
      }
    },
    watch: {
      selectList: function() {
        this.checkList()
      },
      dialogVisible: function(val) {
        if (val) {
          this.reset()
          this.selectList = this.checkedList
        } else {
          this.selectList = []
        }
      }
    },
    mounted() {
      this.loadPage()
    },
    methods: {
      // 筛选
      search() {
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
      reset() {
        var params = {}
        this.query.pageNum = 1
        // 动态获取搜索条件值
        for (var i = 0; i < this.searchInitList.length; i++) {
          params[this.searchInitList[i].searchName] = '' // 接口字段置空
          this.searchInitList[i].modelName = '' // model置空
        }
        Object.assign(this.query, params)
        this.loadPage()
      },
      // 已选择医院删除
      deleteChose(index) {
        this.selectList.splice(index, 1)
      },
      // 加载列表
      loadPage() {
        this.loading = true
        this.$axios.get(this.tableInitUrl, this.query)
          .then((res) => {
            this.tableList = res.data.list
            this.total = res.data.total
            this.loading = false
            // 保存勾选状态
            this.checkList()
          })
      },
      // 勾选分页选中状态
      checkList() {
        setTimeout(() => {
          if (!this.$refs.table) {
            return false
          }
          // 清除所有选中
          this.$refs.table.clearSelection()
          // 勾选已选中
          if (!this.$refs.table.data) {
            return false
          }
          var checkedList = this.$refs.table.data.filter(row => {
            var flag = false
            this.selectList.forEach(function (item) {
              if (item.id === row.id) {
                flag = true
                return false
              }
            })
            return flag
          })
          checkedList.forEach(row => {
            this.$refs.table.toggleRowSelection(row, true)
          })
        }, 100)
      },
      // 医院分页处理
      handleCurrentChange(pageNum) {
        this.query.pageNum = pageNum
        this.loadPage()
      },
      // 行点击
      handleRowClick(row) {
        this.$refs.table.toggleRowSelection(row)
        this.handleSelectionChange(this.$refs.table.selection)
      },
      // 获取勾选的医院
      handleSelectionChange(val) {
        var currentCheckedList = this.$refs.table.data.filter(row => {
          var flag = false
          this.selectList.forEach((item) => {
            if (item.id === row.id) {
              flag = true
              return false
            }
          })
          return flag
        })
        if (currentCheckedList.length > val.length) {
          var unCheckedList = currentCheckedList.filter(v => !val.includes(v))
          this.selectList = this.selectList.filter(row => {
            var flag = false
            unCheckedList.forEach((item) => {
              if (item.id === row.id) {
                flag = true
                return false
              }
            })
            return !flag
          })
        } else {
          var addCheckedList = val.filter(v => !currentCheckedList.includes(v))
          this.selectList = this.selectList.concat(addCheckedList)
        }
      },
      handleCancel() {
        this.$emit('on-cancel')
      },
      sureChoose() {
        // 清空
        this.selectStoreList = []
        this.selectStoreList = this.selectStoreList.concat(this.selectList)
        if (this.selectStoreList.length <= 0) {
          this.$message.error('请选择')
          return
        }
        this.$emit('on-confirm', this.selectStoreList)
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

  .public_chose_people .visit_add_right { padding: 10px; border-left: 1px solid #D7E0EC;}

  .public_chose_people .visit_add_right h1 { font-weight: bold; font-size: 14px; }

  .public_chose_people .visit_add_right .right_span {     height: 424px;padding-top: 10px;overflow-y: scroll; }

  .public_chose_people .visit_add_right .right_span span { display: inline-block; height: 30px; line-height: 30px; width: 122px; text-align: center; margin: 0 4px 6px 0; border: 1px solid #E9E9E9; background-color: #F7F8F9; border-radius: 42px; -webkit-border-radius: 42px; -moz-border-radius: 42px; -o-border-radius: 42px; -ms-border-radius: 42px; }

  .public_chose_people .visit_add_right .right_span span.disablespan { background-color: #E8EBEE; }

  .public_chose_people .visit_add_right .right_span span.disablespan a { display: none; }

  .pub-search .el-input{
    width: 160px;
  }
</style>
