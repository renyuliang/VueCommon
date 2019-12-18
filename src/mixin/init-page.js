// vue mixins 混入 分页
export default {
  data() {
    return {
      total: 0, // 总条数
      searchBuffer: {
        pageNum: 1, // 当前页
        pageSize: 10 // 每页显示条数
      }, // 最后的查询条件
      searchData: {}, // 每个页面，查询的条件
      tableData: [] // 每个页面 list列表页的数据
    }
  },
  created: function() {
    this.search()
  },
  methods: {
    // 加载
    getListData() {},
    // 产品培训 头部数据
    getHeadData() {},
    // 分页导航
    handleCurrentChange(pageNum) {
      this.searchBuffer.pageNum = pageNum
      this.getListData()
    },
    // 处理跳转
    handleSizeChange(pageSize) {
      this.searchBuffer.pageSize = pageSize
      this.getListData()
    },
    // 筛选
    search() {
      const store = JSON.parse(sessionStorage.getItem('key'))
      if (store) {
        this.searchBuffer.pageNum = store.pageNum
        this.searchBuffer = Object.assign({}, store)
        sessionStorage.removeItem('key')
      } else {
        this.searchBuffer = Object.assign({}, this.searchData)
        this.searchBuffer.pageNum = 1
      }
      // 调用获取数据
      this.getListData()
      // 调用头部数据
      this.getHeadData()
    },
    // 重置
    resetSearch() {
      sessionStorage.removeItem('key')
      this.searchData = {}
      // 调用查询
      this.search()
    },
    // 保存搜索条件
    storeSearch() {
      sessionStorage.setItem('key', JSON.stringify(this.searchBuffer))
    }
  }
}
