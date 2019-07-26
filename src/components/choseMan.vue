<template>
  <el-dialog
    title="选择成员"
    :visible.sync="dialogVisible"
    width="1040px"
    top="7vh"
    :close-on-click-modal="false" :before-close="handleCancel">
    <div class="public_chose_people">
    <el-row>
      <el-col :span="6" class="visit_add_left">
        <div class="chose_search">
          <input type="text" placeholder="搜索成员" v-model="userQuery.name" maxlength="6" @keyup.enter="loadUserPage">
          <a href="javascript:" class="search" @click="loadUserPage"></a>
        </div>
        <div class="chosetree scrollbar">
          <el-tree :data="deptTree" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" :expand-on-click-node="false" :highlight-current="true"></el-tree>
        </div>
      </el-col>
      <el-col :span="11" class="visit_add_center" :class="{'colxs780':!isCanChecked}">
        <template>
          <el-table
            ref="userTable"
            :data="userPage.list"
            style="width: 100%"
            class="tableset tabledialog"
            row-key="id"
            highlight-current-row
            @row-click="clickChange"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange">
            <el-table-column
              v-if="isCanChecked"
              type="selection"
              width="30"
              :selectable="isSelectable"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              title="userName"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="电话"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="departmentName"
              label="部门"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </template>
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="userPage.pageNum"
            :page-size="userQuery.pageSize"
            :total="userPage.total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="7" class="visit_add_right" v-if="isCanChecked">
        <h1>已选择人员</h1>
        <div class="right_span scrollbar">
          <span v-for="(item, index) in selectUserList" :key="item.id" v-cloak>{{item.name}}<a href="javascript:" :id="item.id" @click="deleteChoseMan(index)"><i class="el-icon-close"></i></a></span>
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
// import {queryDept} from '../api/opdcOrg'
// import {queryPage} from '../api/opdcOrgUser'
export default {
  name: 'choseMan',
  props: {
    // 弹窗
    dialogVisible: {
      type: Boolean,
      default: false
    },
    disableList: {},
    checkedList: {},
    canChecked: ''
  },
  event: 'change',
  watch: {
    selectUserList: function (val) {
      if (this.canChecked === true) {
        this.checkedUserList()
        this.$emit('change', val)
      }
    },
    dialogVisible: function (val) {
      if (val) {
        this.disableUserList = []
        this.loadDeptTree()
      }
    }
  },
  data () {
    return {
      deptTree: null, // 部门tree
      userPage: {list: null}, // 人员分页
      selectUserList: this.checkedList, // 选择的人员
      disableUserList: this.disableList, // 不能选择的人员
      hascheckedlist: [], // 已选择人员
      getcheckelist: [],
      activeList: [], // 默认选中数组id
      disabledList: [], // 默认禁用数组id
      getChoseNameList: [],
      deptNameList: '', // 点击部门访问人员接口
      isCheck: false, // 单选or多选
      searchDeptInput: '', // 搜索人员
      userQuery: {
        pageNum: 1,
        pageSize: 8,
        id: '',
        name: ''
      },
      isCanChecked: this.canChecked, // 控制弹层为单选or多选
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      choseOneList: [] // 选择储存
    }
  },
  mounted () {
    this.loadDeptTree()
  },
  methods: {
    handleCancel () {
      this.$emit('on-cancel')
    },
    sureChoose () {
      if (this.canChecked === false) {
        // 单选
        this.selectUserList = {}
        if (this.choseOneList.length <= 0) {
          this.$message.error('请选择')
          return
        }
        this.$emit('on-confirm', this.choseOneList)
      } else {
        // 多选
        if (this.selectUserList.length <= 0) {
          this.$message.error('请选择')
          return
        }
        this.$emit('on-confirm', this.selectUserList)
      }
    },
    // 单选获取人员
    clickChange (val) {
      if (this.canChecked === false) {
        this.choseOneList = []
        this.choseOneList.push(val)
      }
    },
    // 已选择人员删除
    deleteChoseMan (index) {
      this.selectUserList.splice(index, 1)
    },
    // 设置勾选是否可用
    isSelectable (row) {
      return this.disableUserList.filter(v => v === row.id).length === 0
    },
    // 加载部门树
    loadDeptTree () {
      let _this = this
      _this.$axios.get('../../static/queryDept.json').then((res) => {
        var rootId = ''
        this.deptTree = this.treeArr(res.data.data, 0)
        this.userQuery = {pageNum: 1, pageSize: 8, id: rootId, name: ''}
        this.loadUserPage()
        this.selectUserList = this.checkedList
      })
    },
    treeArr (a, parentId) {
      let tree = a || []
      let groups = {}
      let initTree = function (parentId) {
        group()
        return getDom(groups[parentId])
      }
      let group = function () {
        for (var i = 0; i < tree.length; i++) {
          if (groups[tree[i].parentId]) {
            groups[tree[i].parentId].push(tree[i])
          } else {
            groups[tree[i].parentId] = []
            groups[tree[i].parentId].push(tree[i])
          }
        }
      }
      let getDom = function (a) {
        if (!a) {
          return null
        }
        var children = []
        for (var i = 0; i < a.length; i++) {
          var node = {}
          node.id = a[i].id
          node.title = a[i].name
          node.label = a[i].name
          node.parentId = a[i].parentId
          node.parentIds = a[i].parentIds
          node.level = a[i].level
          node.disable = a[i].disable
          node.checked = a[i].checked
          node.children = getDom(groups[a[i].id])
          if (node.children !== null) {
            node.expand = true
            var checkedNum = node.children.filter(v => v.checked).length
            node.checked = checkedNum === node.children.length
            var indeterminateNum = node.children.filter(v => v.indeterminate).length
            node.indeterminate = indeterminateNum > 0 || (checkedNum > 0 && checkedNum < node.children.length)
          }
          children.push(node)
        }
        return children
      }
      return initTree(parentId)
    },
    // 加载人员分页列表
    loadUserPage () {
      let _this = this
      setTimeout(function () {
        _this.disableUserList = _this.disableList
        if (_this.$refs.userTable) {
          _this.$refs.userTable.clearSelection()
        }
        _this.$axios.get('../../static/queryPage.json').then((res) => {
          _this.userPage = res.data
          _this.checkedUserList()
        })
      }, 100)
    },
    // 勾选分页选中状态
    checkedUserList () {
      let _this = this
      _this.$nextTick(function () {
        if (!_this.$refs.userTable) {
          return false
        }
        // 清除所有选中
        _this.$refs.userTable.clearSelection()
        // 勾选已选中
        if (!_this.$refs.userTable.data) {
          return false
        }
        if (this.canChecked === false) {
          return false
        }
        var checkedList = _this.$refs.userTable.data.filter(row => {
          var flag = false
          _this.selectUserList.forEach(function (item) {
            if (item.id === row.id) {
              flag = true
              return false
            }
          })
          return flag
        })
        checkedList.forEach(row => {
          _this.$refs.userTable.toggleRowSelection(row, true)
        })
      })
    },
    // 人员分页处理
    handleCurrentChange (pageNum) {
      this.userQuery.pageNum = pageNum
      this.loadUserPage()
    },
    // 部门树节点点击
    handleNodeClick (node) {
      if (Number(node.id) === 1) {
        this.userQuery.id = ''
      } else {
        this.userQuery.id = node.id
      }
      this.loadUserPage()
    },
    // 获取勾选的人员
    handleSelectionChange (val) {
      let _this = this
      var currentCheckedList = _this.$refs.userTable.data.filter(row => {
        var flag = false
        _this.selectUserList.forEach(function (item) {
          if (item.id === row.id) {
            flag = true
            return false
          }
        })
        return flag
      })
      if (currentCheckedList.length > val.length) {
        var unCheckedList = currentCheckedList.filter(v => !val.includes(v))
        _this.selectUserList = _this.selectUserList.filter(row => {
          var flag = false
          unCheckedList.forEach(function (item) {
            if (item.id === row.id) {
              flag = true
              return false
            }
          })
          return !flag
        })
      } else {
        var addCheckedList = val.filter(v => !currentCheckedList.includes(v))
        _this.selectUserList = _this.selectUserList.concat(addCheckedList)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .public_chose_people{
    .visit_add_left,.visit_add_center,.visit_add_right{
      padding: 10px; height: 460px;
    }
  }
  .public_chose_people .visit_add_left { padding: 0; }

  .public_chose_people .visit_add_left .chose_search { position: relative; text-align: center; padding: 9px 0; }

  .public_chose_people .visit_add_left .chose_search input {outline: none; border: 1px solid #cdcdcd; line-height: 26px; padding-right: 20px; width: 220px; text-indent: 7px; }

  .public_chose_people .visit_add_left .chose_search .search { position: absolute; right: 28px; top: 16px; display: inline-block; width: 14px; height: 14px; background: url("../assets/images/search.png") no-repeat}

  .public_chose_people .visit_add_left .chosetree { height: 410px; padding: 10px; }

  .public_chose_people .visit_add_center { border-right: 1px solid #D7E0EC; border-left: 1px solid #D7E0EC; position: relative; }

  .public_chose_people .visit_add_center .el-table td, .public_chose_people .visit_add_center .el-table th { padding: 7px 0; }

  .public_chose_people .visit_add_center .table td { padding: 8px 4px !important; font-size: 14px; }

  .public_chose_people .visit_add_center .page { position: absolute; left: 0; right: 0; bottom: 15px; text-align: center}

  .public_chose_people .visit_add_center.col-xs-8 .el-table__body-wrapper tr:hover td { cursor: pointer; background-color: #707B98 !important; color: #ffffff; }

  .public_chose_people .visit_add_right { padding: 10px; }

  .public_chose_people .visit_add_right h1 { font-weight: bold; font-size: 14px; }

  .public_chose_people .visit_add_right .right_span { height: 380px; margin-top: 10px; }

  .public_chose_people .visit_add_right .right_span span { display: inline-block; height: 30px; line-height: 30px; width: 130px; text-align: center; margin: 0 4px 6px 0; border: 1px solid #E9E9E9; background-color: #F7F8F9; border-radius: 42px; -webkit-border-radius: 42px; -moz-border-radius: 42px; -o-border-radius: 42px; -ms-border-radius: 42px; }

  .public_chose_people .visit_add_right .right_span span.disablespan { background-color: #E8EBEE; }

  .public_chose_people .visit_add_right .right_span span.disablespan a { display: none; }

  .colxs780{
    width: 750px;
  }
</style>
