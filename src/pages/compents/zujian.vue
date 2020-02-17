<template>
  <div style="padding: 20px;">
    <div class="a_span">
      <a href="#choseman">选择人员</a>
      <a href="#chosemore">多选</a>
      <a href="#choseone">单选</a>
      <a href="#autoinput">输入框模糊匹配</a>
      <a href="#uploadImg">图片上传</a>
      <a href="#uploadExcel">文件上传</a>
      <a href="#chosearea">地区级联</a>
      <a href="#searchimg">查看图片</a>
      <a href="#page">公用分页，保存查询条件</a>
    </div>
    <!--组件-->
    <div class="zujian">
      <h2 id="choseman">选择人员</h2>
      <el-button type="primary" @click="dialogChoseMan = true">选择</el-button>
      <div class="question">
        <span v-for="(item,index) in manList" :key="index">{{item.name}}</span>
      </div>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre><code>
              //调用方法 (组件名是：chose-Man)
              <
                :dialog-visible="dialogChoseMan"
                @on-cancel="dialogChoseMan = false"
                @on-confirm="getSaveList" // 保存
                :canChecked="true" // 人员多选为true，单选为false
                :checkedList="roleUser.userList"  // 单选时，去掉此项
                :disableList="roleUser.unChooseUserIdList"/>  // 单选时，去掉此项

              // 变量
              dialogChoseMan: false,
              roleUser: {
              unChooseUserIdList: [28], // 禁止选择
              userList: [ // 默认选择
                {
                  "authId": null,
                  "createTime": null,
                  "creatorId": null,
                  "departmentName": "成都一蟹科技有限公司",
                  "email": "wj020103@126.com",
                  "headImg": "http://file.medcrab.com/media/5befd91ddae4550b4cb8656f",
                  "id": 2,
                  "lastmodifyId": null,
                  "lastmodifyTime": null,
                  "mobile": "18080168320",
                  "name": "王军",
                  "nickName": null,
                  "orgId": null,
                  "remarks": null,
                  "sex": 1
                }
              ]
            }

              // 方法
              getSaveList (val) {
                this.dialogChoseMan = false
                console.log(val)
              }
            </code></pre>
        </el-collapse-item>
      </el-collapse>
      <!--多选-->
      <!--<chose-Man-->
      <!--:dialog-visible="dialogChoseMan"-->
      <!--@on-cancel="dialogChoseMan = false"-->
      <!--@on-confirm="getSaveList"-->
      <!--:canChecked="true"-->
      <!--:checkedList="roleUser.userList"-->
      <!--:disableList="roleUser.unChooseUserIdList"/>-->
      <!--单选-->
      <chose-Man
        :dialog-visible="dialogChoseMan"
        @on-cancel="dialogChoseMan = false"
        @on-confirm="getSaveList"
        :canChecked="false"/>
      <hr>
      <h2 id="chosemore">弹层（多选）</h2>
      <el-button type="primary" @click="dialogChoseMore = true">选择</el-button>
      <div class="question">
        <span v-for="item in hospitalList" :key="item.id">{{item.name}}</span>
      </div>
      <!--//调用多选弹窗-->
      <chose-More
        intiTitle="多选弹窗标题"
        :dialog-visible="dialogChoseMore"
        :searchInitList="searchInitList"
        :tableInitProps="tableInitProps"
        :tableInitUrl="'../../../static/queryPage.json'"
        @on-cancel="dialogChoseMore = false"
        @on-confirm="confirmHospitalList"
        :checkedList="hospitalList"/>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：chose-More）
              <
                intiTitle="多选弹窗标题"
                :dialog-visible="dialogChoseMore"
                :searchInitList="searchInitList" // 自定义搜索条件
                :tableInitProps="tableInitProps" // 自定义table项字段
                :tableInitUrl="'../../static/queryPage.json'" // table 接口URL
                @on-cancel="dialogChoseMore = false"
                @on-confirm="confirmHospitalList" // 保存
                :checkedList="hospitalList"/> // 默认选择

              // 变量
              dialogChoseMore: false,
              hospitalList: [],
              // 自定义搜索条件
              searchInitList: [
                {
                  // searchType: 'input', // 判断搜索类型为 input,可忽略不写
                  searchType: 'Number', // 判断只能输入正数字
                  title: '输入数字1',
                  maxlength: 10,
                  searchName: 'titleNumber1', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '只能输入数字'
                },
                {
                  searchType: 'input', // 判断搜索类型为 input
                  title: '标题11',
                  maxlength: 10,
                  searchName: 'title1', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '请输入'
                },
                {
                  searchType: 'select', // 判断搜索类型为 select 下拉
                  title: '标题22',
                  searchName: 'title2', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '请选择',
                  options: [
                    {
                      label: '张三',
                      value: '张三'
                    },
                    {
                      label: '李四',
                      value: '李四',
                      formatFunction:function () {
                        return ''
                      }
                    }
                  ]
                }
              ],
              // 单选 table 设置项
              tableInitProps: [
                {
                  name: 'name',
                  label: '姓名'
                },
                {
                  name: 'mobile',
                  label: '电话'
                }
              ]

              // 方法
              confirmHospitalList (val) {
                this.dialogChoseMore = false
                console.log(val)
              }
            </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="choseone">弹层（单选）</h2>
      <el-button type="primary" @click="dialogChoseOne = true">选择</el-button>
      <div class="question">
        {{getName}}
      </div>
      <!--//调用单选弹窗-->
      <chose-One
        intiTitle="单选弹窗标题"
        :dialog-visible="dialogChoseOne"
        :searchInitList="searchInitList"
        :tableInitProps="tableInitProps"
        :tableInitUrl="'/static/queryPage.json'"
        :get-pramas="{id:1,type:2}"
        @on-cancel="dialogChoseOne = false"
        @on-confirm="confirmName"/>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：chose-One）
              <
                intiTitle="多选弹窗标题"
                :dialog-visible="dialogChoseOne"
                :searchInitList="searchInitList" // 自定义搜索条件
                :tableInitProps="tableInitProps" // 自定义table项字段
                :tableInitUrl="'../../static/queryPage.json'" // table 接口URL
                @on-cancel="dialogChoseOne = false"
                @on-confirm="confirmName" // 保存

              // 变量
              dialogChoseOne: false,
              // 自定义搜索条件
              searchInitList: [
                {
                  // searchType: 'input', // 判断搜索类型为 input,可忽略不写
                  searchType: 'Number', // 判断只能输入正数字
                  title: '输入数字1',
                  maxlength: 10,
                  searchName: 'titleNumber1', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '只能输入数字'
                },
                {
                  searchType: 'input', // 判断搜索类型为 input,可忽略不写
                  title: '标题11',
                  maxlength: 10,
                  searchName: 'title1', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '请输入'
                },
                {
                  searchType: 'select', // 判断搜索类型为 select 下拉
                  title: '标题22',
                  searchName: 'title2', // 查询条件名称 -- 接口字段名称
                  modelName: '', // v-model的值(这个参数不用动，直接用)
                  placeholder: '请选择',
                  options: [
                    {
                      label: '张三',
                      value: '张三'
                    },
                    {
                      label: '李四',
                      value: '李四'
                    }
                  ]
                }
              ],
              // 单选 table 设置项
              tableInitProps: [
                {
                  name: 'name',
                  label: '姓名'
                },
                {
                  name: 'mobile',
                  label: '电话',
                  formatFunction:function () {
                    return ''
                  }
                }
              ]

              // 方法
              confirmName (val) {
                this.dialogChoseOne = false
                console.log(val)
              }
            </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="autoinput">输入框模糊匹配</h2>
      <!--<auto-input :dataUrl="'../../static/input.json'" v-model.trim="inputName" @listenVal="listenVlaue" ></auto-input>-->
      <auto-input :dataUrl="'../../../static/input.json'" :paramKeys="['memberName']" :showKeys="['memberName']" @listenVal="listenVlaue"></auto-input>
      <div class="question">
        {{inputName}}
      </div>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：auto-input）
              <
              :dataUrl="'../../static/input.json'" // url
              v-model.trim="inputName" // 变量名
              @listenVal="listenVlaue" > // 返回值
            </>

          // 变量
          inputName: '',

          // 方法
          listenVlaue (val) {
          this.inputName = val.value
          },
          </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="uploadImg">图片上传</h2>
      <upload-img
        import-url="https://jsonplaceholder.typicode.com/posts/"
        uploadTitle="图片上传"
        uploadType="image"
        initClass="true"
        :multiple="true"
        @on-success="handSuccessImg"
      ></upload-img>
      <div class="question">
        <p v-for="item in uploadImgUrl">{{ item }}</p>
      </div>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：upload-img）
              <
                import-url="https://jsonplaceholder.typicode.com/posts/"
                uploadTitle="图片上传" // 按钮文案
                uploadType="image"     // 设置上传类型为image
                initClass="true"       // 自定义按钮样式，不需要则为false
                :multiple="true"       // 是否支持多选，默认是false
                @on-success="handSuccessImg" // 保存,返回数组
              ></>

          // 方法
          handSuccessImg(val) {
          this.uploadImgUrl = []
          val.forEach(item => {
          this.uploadImgUrl.push(item.name)
          })
          }
          </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="uploadExcel">文件上传</h2>
      <el-button type="primary" @click="dialogUpload = true">上传</el-button>
      <div class="question">
        {{uploadName}}
      </div>
      <upload-excel
        :dialog-visible="dialogUpload"
        intiTitle="附件上传名称"
        templateName="兼职竞拍上传模板.xlsx"
        @on-cancel="dialogUpload = false"
        @on-getVal="handSuccessExcel"
      ></upload-excel>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：upload-excel）
              <
                :dialog-visible="dialogUpload"
                intiTitle="附件上传名称"
                templateName="兼职竞拍上传模板.xlsx"
                @on-cancel="dialogUpload = false"
                @on-getVal="handSuccessExcel" // 保存
              ></>

          // 变量
          dialogUpload: false,

          // 方法
          handSuccessExcel (val) {
          console.log(val[0].name)
          },
          </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="chosearea">地区组件</h2>
      <chose-area @on-change="getAreaName"/>
      <div class="question">
        {{areaName}}
      </div>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>

              // 调用方式：（组件名：chose-area）
              <
              :howLevel='2' //判断显示2级 or 3级, 默认显示3级
              showAllStatus = 'true' //判断子级是否显示全部,默认否
              @on-change="getAreaName" // 返回值
              />

            // 方法
            getAreaName (val) {
              console.log(val)
            }
            </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="searchimg">图片全屏查看</h2>
      <div>
        <span style="margin-right: 50px" v-for="(item,index) in imgList">
          <img :src="item.url" alt="" style="width: 60px;height:60px;" @click="clickImg(index)">
        </span>
      </div>
      <big-img :imgSrcList="imgSrcList" :imgSrcListIndex="imgSrcListIndex" :showImgDialog="showImg" @closeDialog="showImg = false"></big-img>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre>
              // 点击事件，放在图片上
              //<span style="margin-right: 50px" v-for="(item,index) in imgList">
               // < :src="item.url" alt="" style="width: 60px;height:60px;" @click="clickImg(index)">
              //</span>

              // 调用方式：（组件名：big-img）
              <
              :imgSrcList="imgSrcList" // 图片对象
              :imgSrcListIndex="imgSrcListIndex" // 传入点击图片的index
              :showImgDialog="showImg"
              @closeDialog="showImg = false"
              ></>
          // 变量
          showImg: false,
          imgSrcList: {},
          imgSrcListIndex: '',

          // 方法
          clickImg (e) {
          this.showImg = true
          this.imgSrcList = this.imgList
          this.imgSrcListIndex = index
          }
          </pre>
        </el-collapse-item>
      </el-collapse>
      <hr>
      <h2 id="page">公用,保存查询条件</h2>
      <div>
        <el-form :inline="true" :model="searchData" class="demo-form-inline" size="mini">
          <el-form-item label="产品">
            <el-input v-model="searchData.product" placeholder="产品"/>
          </el-form-item>
          <el-form-item label="医院">
            <el-input v-model="searchData.hospital" placeholder="医院"/>
          </el-form-item>
          <el-form-item label="代表">
            <el-input v-model="searchData.userName" placeholder="代表"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetSearch()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          size="mini"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="姓名"/>
          <el-table-column
            prop="mobile"
            show-overflow-tooltip
            label="电话"/>
        </el-table>
        <div class="pub-page">
          <el-pagination
            :current-page="searchBuffer.pageNum"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :page-size="searchBuffer.pageSize"
            :total="total"
            v-if="total>0"
            background
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"/>
        </div>
      </div>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre><code>
              // 因接口问题，无法实现效果，不影响，主要方法如下：
              html:
                查询按钮的方法名称是：search()
                重置按钮的方法名称是：resetSearch()

                注：也可自定义方法名称，然后在调用方法如：
                // 筛选
                initSearch(){
                  this.search()
                }
                // 重置
                initResetSearch(){
                  this.resetSearch()
                }

                引入 element-ui 自带的分页组件，替换参数
                :current-page="searchBuffer.pageNum"   // 当前页
                :page-size="searchBuffer.pageSize"     // 每页显示条数
                :total="total"            // 总条数
                v-if="total>0"            // 添加判断条件

              js：
                1. // 分页公用 必须引入  vue混入
                  import initPageJs from '../../mixin/init-page'
                  mixins: [initPageJs],
                2. 搜索条件结构如：
                searchData: {   // 名称必须是 searchData
                  product: '',
                  hospital: '',
                  userName: ''
                },
              // 判断是否从子页面返回
                storageBollean: this.$route.query.storage
                3. 方法：如
                // 如果有头部统计数据，则调用 getHeadData() 方法
                getListData () {  // 方法名称必须是 getListData （）
                  if (this.storageBollean) {
                    // 回显
                    vm.searchData = Object.assign({}, vm.searchBuffer)
                  }
                  vm.$axios.get('/appProductPopularizeBaseinfo/getBaseInfoList', vm.searchBuffer).then(res => {
                    vm.tableData = res.data.list  // tableData 为 返回数据
                    // 获取总条数
                    vm.total = res.data.total
                  })
                }
                // 详情页
                goDetail() {
                  this.storeSearch() //保存搜索条件
                  ... 操作
                }


              // 子页面返回
              goBack() {
                this.$router.push({ path: '/job-management/post-management', query: { storage: true }})
              }
            </code></pre>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import crabNumber from '../../components/crab-number'
  import autoInput from '../../components/autoInput'
  import choseArea from '../../components/choseArea'
  import choseMore from '../../components/choseMore'
  import choseOne from '../../components/choseOne'
  import choseMan from '../../components/choseMan'
  import uploadImg from '../../components/uploadImg'
  import uploadExcel from '../../components/uploadExcel'
  import bigImg from '../../components/bigImg'
  // 分页公用 必须引入
  import initPageJs from '../../mixin/init-page'
  export default {
    name: 'index',
    components: { choseMan, choseOne, choseMore, autoInput, uploadImg, uploadExcel, choseArea, bigImg, crabNumber },
    mixins: [initPageJs],
    data () {
      return {
        // 选择医院
        dialogChoseMore: false,
        dialogChoseOne: false,
        dialogUpload: false,
        dialogChoseMan: false,
        roleUser: {
          unChooseUserIdList: [28],
          userList: [
            {
              'authId': null,
              'createTime': null,
              'creatorId': null,
              'departmentName': '成都一蟹科技有限公司',
              'email': 'wj020103@126.com',
              'headImg': 'http://file.medcrab.com/media/5befd91ddae4550b4cb8656f',
              'id': 2,
              'lastmodifyId': null,
              'lastmodifyTime': null,
              'mobile': '18080168320',
              'name': '王军',
              'nickName': null,
              'orgId': null,
              'remarks': null,
              'sex': 1
            }
          ]
        },
        manList: [], // 选择成员
        hospitalList: [], // 确定后保存的数据
        // 单选
        getName: '',
        // 自定义搜索条件
        searchInitList: [
          {
            // searchType: 'input', // 判断搜索类型为 input,可忽略不写
            searchType: 'Number', // 判断只能输入正数字
            title: '输入数字1',
            maxlength: 10,
            searchName: 'titleNumber1', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值(这个参数不用动，直接用)
            placeholder: '只能输入数字'
          },
          {
            // searchType: 'input', // 判断搜索类型为 input,可忽略不写
            searchType: 'Number', // 判断只能输入正数字
            title: '输入数字2',
            maxlength: 10,
            searchName: 'titleNumber2', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值(这个参数不用动，直接用)
            placeholder: '只能输入数字'
          },
          {
            // searchType: 'input', // 判断搜索类型为 input,可忽略不写
            title: '标题11',
            maxlength: 10,
            searchName: 'titleInput1', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值(这个参数不用动，直接用)
            placeholder: '请输入'
          },
          {
            // searchType: 'input', // 判断搜索类型为 input,可忽略不写
            title: '标题22',
            maxlength: 10,
            searchName: 'titleInput2', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值(这个参数不用动，直接用)
            placeholder: '请输入'
          },
          {
            searchType: 'select', // 判断搜索类型为 select 下拉
            title: '标题33',
            searchName: 'titleSelect', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值(这个参数不用动，直接用)
            placeholder: '请选择',
            options: [
              {
                label: '张三',
                value: '张三'
              },
              {
                label: '李四',
                value: '李四'
              }
            ]
          }
        ],
        // 单选 table 设置项
        tableInitProps: [
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'mobile',
            label: '电话'
          },
          {
            name: 'departmentName',
            label: '部门'
          }
        ],
        // 动态输入模糊匹配
        inputName: '',
        // 上次成功后的图片
        uploadImgUrl: [],
        // 上传成功后的文件
        uploadName: '',
        // 选择地区
        areaName: '',
        // 图片全屏查看
        showImg: false,
        imgSrcList: {},
        imgSrcListIndex: '',
        imgList: [
          {
            url: '../../../static/image/back1.jpg',
            index: 0
          },
          {
            url: '../../../static/image/back2.jpg',
            index: 1
          },
          {
            url: '../../../static/image/back3.jpg',
            index: 2
          },
          {
            url: '../../../static/image/back4.jpg',
            index: 3
          },
          {
            url: '../../../static/image/Tulips.jpg',
            index: 4
          },
          {
            url: '../../../static/image/Tulips.jpg',
            index: 5
          },
          {
            url: '../../../static/image/99.jpg',
            index: 6
          }
        ],
        // 保存搜索条件
        tableData22: [],
        currentPage: 1, // 当前页码
        pageSize: 1, // 每页的数据条数
        searchBuffer22: {
          name: '',
          phone: '',
          currentPage: 1,
          pageSize: 1
        },
        // 公用分页,保存查询条件-- 查询参数名必须 searchData
        searchData: {
          product: '',
          hospital: '',
          userName: ''
        }
      }
    },
    methods: {
      // 选择人员
      getSaveList (val) {
        this.dialogChoseMan = false
        this.manList = val
        console.log(val)
      },
      // 确定 -- 多选
      confirmHospitalList (val) {
        this.dialogChoseMore = false
        this.hospitalList = val
        console.log(this.hospitalList)
      },
      // 确定 -- 单选
      confirmName (val) {
        this.dialogChoseOne = false
        this.getName = val.name
      },
      // 输入框模糊匹配
      listenVlaue (val) {
        this.inputName = val.value
      },
      // 图片上传成功后的操作
      handSuccessImg (val) {
        this.uploadImgUrl = []
        val.forEach(item => {
          this.uploadImgUrl.push(item.name)
        })
      },
      // 上传成功后的操作
      handSuccessExcel (val) {
        this.uploadName = val[0].name
      },
      // 获取地区
      getAreaName (val) {
        this.areaName = val
      },
      clickImg (index) {
        this.showImg = true
        this.imgSrcList = this.imgList
        this.imgSrcListIndex = index
      },
      // 分页公用 -- 列表方法名必须是getListData
      getListData () {
        // let _this = this
        // _this.searchBuffer.pageNum = _this.pageNum
        // _this.searchBuffer.pageSize = _this.pageSize
        // _this.$axios.get('../../../static/queryPage.json', _this.searchBuffer).then((res) => {
        //   _this.tableData = res.data.list
        //   _this.total = res.data.total
        // })
      }
    }
  }
</script>
<style lang="scss">
  .a_span{
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
    a{
      display: inline-block;
      padding:10px 20px;
      background: green;
      color: #fff;
    }
  }
  .input{
    border:1px solid #999;
    padding: 4px;
    width: 200px;
    outline: none;
    margin-right: 20px;
  }
  .el-collapse{
    margin-top: 20px;
    width: 50%;
  }
  .el-collapse-item__header{
    background: lightblue;
  }
</style>
