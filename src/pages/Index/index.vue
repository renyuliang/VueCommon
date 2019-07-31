<template>
  <div style="padding: 20px">
    <h2>常用组件</h2>
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
    <h2>js验证</h2>
    <div class="a_span">
      <a href="#feikong">非空验证</a>
      <a href="#number">整数验证</a>
      <a href="#special">特殊字符验证</a>
      <a href="#chinese">汉字验证</a>
      <a href="#phone">手机号验证</a>
      <a href="#money">金额验证</a>
      <a href="#card">身份证验证</a>
      <a href="#jingdu">精度问题验证</a>
    </div>
    <h2>js常用方法</h2>
    <div class="a_span">
      <a href="#canshu">页面获取参数</a>
      <a href="#array">arguments转化为数组</a>
      <a href="#quchong">数组去重</a>
      <a href="#kongbai">空白过滤器</a>
      <a href="#jiequlength">截取字符串长度</a>
      <a href="#changeDate">时间戳转化为时间</a>
      <a href="#changeTimestamp">时间转化为时间戳</a>
    </div>
    <br><br><br>
    <br><br><br>
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
        :tableInitUrl="'../../static/queryPage.json'"
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
            // 自定义搜索条件
            searchInitList: [
              {
                searchStyle: 'input', // 判断搜索类型为 input
                title: '标题11',
                maxlength: 10,
                searchName: 'title1', // 查询条件名称 -- 接口字段名称
                modelName: '', // v-model的值
                placeholder: '请输入'
              },
              {
                searchStyle: 'select', // 判断搜索类型为 select 下拉
                title: '标题22',
                searchName: 'title2', // 查询条件名称 -- 接口字段名称
                modelName: '', // v-model的值
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
        :tableInitUrl="'../../static/queryPage.json'"
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
                searchStyle: 'input', // 判断搜索类型为 input
                title: '标题11',
                maxlength: 10,
                searchName: 'title1', // 查询条件名称 -- 接口字段名称
                modelName: '', // v-model的值
                placeholder: '请输入'
              },
              {
                searchStyle: 'select', // 判断搜索类型为 select 下拉
                title: '标题22',
                searchName: 'title2', // 查询条件名称 -- 接口字段名称
                modelName: '', // v-model的值
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
      <auto-input :dataUrl="'../../static/input.json'" :paramKeys="['memberName']" :showKeys="['memberName']" @listenVal="listenVlaue"></auto-input>
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
        @on-success="handSuccessImg"
      ></upload-img>
      <div class="question">
        <p v-for="item in uploadImgUrl">{{ item }}</p>
      </div>
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
              import-url="https://jsonplaceholder.typicode.com/posts/" // url
              templateName="兼职竞拍上传模板.xlsx"
              errorTitle="这里是上次错误后的原因显示"
              @on-cancel="dialogUpload = false"
              @on-success="handSuccess" // 保存
            ></>

          // 变量
          dialogUpload: false,

          // 方法
          handSuccess (val) {
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
      <img src="../../assets/images/qq.jpg" alt="" style="width: 60px;height:60px;" @click="clickImg($event)">
      <big-img :imgSrc="imgSrc" v-if="showImg" @clickit="showImg = false"></big-img>
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            // 点击事件，放在图片上
            < src="../../assets/images/qq.jpg" alt="" style="width: 60px;height:60px;" @click="clickImg($event)">

            // 调用方式：（组件名：big-img）
            <
            :imgSrc="imgSrc" // 变量
            v-if="showImg"
            @clickit="showImg = false"
            ></>
          // 变量
          imgSrc: '',
          showImg: false

          // 方法
          clickImg (e) {
          this.showImg = true
          this.imgSrc = e.currentTarget.src
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
            :current-page="pageNum"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :page-size="pageSize"
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

              引入 element-ui 自带的分页组件，替换参数
              :current-page="pageNum"   // 当前页
              :page-size="pageSize"     // 每页显示条数
              :total="total"            // 总条数
              v-if="total>0"            // 添加判断条件

            js：
              1. // 分页公用 必须引入  vue混入
                import initPageJs from '../../mixin/init-page'
              2. 搜索条件结构如：
              searchData: {   // 名称必须是 searchData
                product: '',
                hospital: '',
                userName: ''
              }
              3. 方法：如
              // 如果有头部统计数据，则调用 getHeadData() 方法
              getListData () {  // 方法名称必须是 getListData （）
                // 回显
                vm.searchData = Object.assign({}, vm.searchBuffer)
                // 页数
                vm.searchBuffer.pageNum = vm.pageNum
                vm.searchBuffer.pageSize = vm.pageSize
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
          </code></pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <br><br><br>
    <br><br><br>
    <!--js验证-->
    <div class="js">
      <h2 id="feikong">非空验证</h2>
      <input type="text" class="input" v-model="js.feikong" @blur="blurFeikong">{{result.feikong}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 非空验证
            function isNull (arg1) {
              return !arg1 && arg1 !== 0 && typeof arg1 !== 'boolean' ? true : false
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="number">整数验证</h2>
      <input type="text" class="input" v-model="js.number" @blur="blurNumber">{{result.number}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证全部是数字
            function isNumber (str) {
              var res = /^[1-9]*[1-9][0-9]*$/
              if (!res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="special">特殊字符验证</h2>
      <input type="text" class="input" v-model="js.special" @blur="blurSpecial">{{result.special}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证特殊字符
            function isSpecial (str) {
              var res = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
              if (res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="chinese">汉字验证</h2>
      <input type="text" class="input" v-model="js.chinese" @blur="blurChinese">{{result.chinese}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证只能输入汉字
            function isChinese (str) {
              var res = /^[\u4e00-\u9fa5]*$/
              if (res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="phone">手机号验证</h2>
      <input type="text" class="input" v-model="js.phone" @blur="blurPhone">{{result.phone}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证手机号码
            function isPhone (str) {
              var res = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/
              if (res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="money">金额验证(保留2位)</h2>
      <input type="text" class="input" v-model="js.money" @blur="blurMoney">{{result.money}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证金额
            function isMoney (str) {
              var res = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
              if (res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="card">身份证验证</h2>
      <input type="text" class="input" v-model="js.card" @blur="blurCard">{{result.card}}
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 验证身份证号码
            function isIdCard (str) {
              var res = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
              if (res.test(str)) {
                return false
              } else {
                return true
              }
            }
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="jingdu">精度问题验证</h2>
      <input type="text" class="input" v-model="js.firstNum">
      <el-select v-model="js.selectValue" placeholder="请选择">
        <el-option label="+" value="+"></el-option>
        <el-option label="-" value="-"></el-option>
        <el-option label="*" value="*"></el-option>
        <el-option label="/" value="/"></el-option>
      </el-select>
      <input type="text" class="input" v-model="js.lastNum">
      <el-button type="primary" @click="getSave">计算</el-button>
      <span>精度调整之前的结果：{{result.jingduBeforeSum}}</span>
      <span>精度调整之前的结果：{{result.jingduAfterSum}}</span>
    </div>
    <br><br><br>
    <br><br><br>
    <!--js常用方法-->
    <div class="function">
      <h2 id="canshu">页面获取参数</h2>
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre><code>
            // 获取参数
            function getUrlParam(name) {
              var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
              var r = window.location.search.substr(1).match(reg);
              if (r != null) return decodeURIComponent(r[2]);
              return null;
            }
            // 调用方式，如：
            getUrlParam('name')
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="array">arguments转化为数组</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 方法
            function forma(){
              return Array.prototype.slice.call(arguments)
            }
            // 调用方式，如：
            var arr = forma(1,2,3,4,5)
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="quchong">数组去重</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 方法
            let arr = [1,2,3,3,4,4,5,6]
            let arr1= Array.from(new Set(arr))
            console.log(arr1)
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="kongbai">空白过滤器</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 在main.js中定义
            Vue.filter('handleNullFilter', function (value) {
              return !isNull(value) ? value : '--'
            })
            // 调用方式，如（在双大括号中调用）：
            变量名称 | handleNullFilter
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="jiequlength">截取字符串长度</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 在main.js中定义
            Vue.filter('handleEselipisFilter', function (value, num) {
              if (isNull(value)) {
                return '--'
              }
              if (value.length > num) {
                return value.slice(0, num) + '...'
              }
              return value
            })
            // 调用方式，如（在双大括号中调用）：
            变量名称 | handleEselipisFilter(5)
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="changeDate">时间戳转化为时间</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 时间戳转化
            function changeDate (millis, style) {
              var time = new Date(millis)
              // 年
              var year = time.getFullYear()
              // 月
              var month = addZero(time.getMonth() + 1)
              // 日
              var date = addZero(time.getDate())
              if (style === 'YYYY-MM-DD') {
                return year + '-' + month + '-' + date
              } else {
                // 时
                var hour = addZero(time.getHours())
                // 分
                var minute = addZero(time.getMinutes())
                // 秒
                var second = addZero(time.getSeconds())
                return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
              }
            }
            // 小于10，加0
            function addZero (val) {
              if (val >= 0 && val <= 9) {
                return '0' + val
              }
            }
            // 调用方式，如：
            changeDate(1562169600000)  // yyyy-mm-dd hh:mm:ss
            changeDate(1562169600000, 'YYYY-MM-DD')   // yyyy-mm-dd
          </code></pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="changeTimestamp">时间转化为时间戳</h2>
      <el-collapse>
        <el-collapse-item title="查看代码" name="1">
          <pre><code>
            // 时间转化为时间戳
            function changeTimestamp (time) {
              var date = new Date(time)
              return date.getTime()
            }
            // 调用方式，如：
            changeTimestamp('2019-07-10 18:26:48')  // 1562754408000
          </code></pre>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  import autoInput from '../../components/autoInput'
  import choseArea from '../../components/choseArea'
  import choseMore from '../../components/choseMore'
  import choseOne from '../../components/choseOne'
  import choseMan from '../../components/choseMan'
  import uploadImg from '../../components/uploadImg'
  import uploadExcel from '../../components/uploadExcel'
  import bigImg from '../../components/bigImg'
  import { isNull, isNumber, isSpecial, isChinese, isPhone, isMoney, isIdCard, changeDate, changeTimestamp } from '../../mixin/regular.js'
  // 分页公用 必须引入
  import initPageJs from '../../mixin/init-page'
  export default {
    name: 'index',
    components: { choseMan, choseOne, choseMore, autoInput, uploadImg, uploadExcel, choseArea, bigImg },
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
            searchStyle: 'input', // 判断搜索类型为 input
            title: '标题11',
            maxlength: 10,
            searchName: 'title1', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值
            placeholder: '请输入'
          },
          {
            searchStyle: 'select', // 判断搜索类型为 select 下拉
            title: '标题22',
            searchName: 'title2', // 查询条件名称 -- 接口字段名称
            modelName: '', // v-model的值
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
        imgSrc: '',
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
        },
        // js
        js: {
          feikong: '', // 非空验证
          number: '', // 整数验证
          special: '', // 特殊字符
          chinese: '', // 汉字验证
          phone: '', // 电话验证
          money: '', // 金额验证
          card: '', // 身份证验证
          selectValue: '+', // 判断计算类型
          firstNum: '',
          lastNum: ''
        },
        // 返回结果
        result: {
          feikong: '',
          number: '',
          special: '',
          chinese: '',
          phone: '',
          money: '',
          card: '',
          jingduBeforeSum: '', // 精度调试之前的结果
          jingduAfterSum: ''// 精度调试之后的结果
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
      handSuccessImg(val) {
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
      clickImg (e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      // 分页公用 -- 列表方法名必须是getListData
      getListData () {
        let _this = this
        _this.searchBuffer.pageNum = _this.pageNum
        _this.searchBuffer.pageSize = _this.pageSize
        _this.$axios.get('../../static/queryPage.json', _this.searchBuffer).then((res) => {
          _this.tableData = res.data.list
          _this.total = res.data.total
        })
      },
      // js
      // 非空验证
      blurFeikong () {
        if (!isNull(this.js.feikong)) {
          this.result.feikong = '正确'
        } else {
          this.result.feikong = '错误'
        }
      },
      // 整数验证
      blurNumber () {
        if (isNumber(this.js.number)) {
          this.result.number = '正确'
        } else {
          this.result.number = '错误'
        }
      },
      // 特殊字符验证
      blurSpecial () {
        if (!isSpecial(this.js.special)) {
          this.result.special = '正确'
        } else {
          this.result.special = '错误'
        }
      },
      // 汉字验证
      blurChinese () {
        if (!isChinese(this.js.chinese)) {
          this.result.chinese = '正确'
        } else {
          this.result.chinese = '错误'
        }
      },
      // 手机号验证
      blurPhone () {
        if (!isPhone(this.js.phone)) {
          this.result.phone = '正确'
        } else {
          this.result.phone = '错误'
        }
      },
      // 金额验证
      blurMoney () {
        if (!isMoney(this.js.money)) {
          this.result.money = '正确'
        } else {
          this.result.money = '错误'
        }
      },
      // 身份证验证
      blurCard () {
        if (!isIdCard(this.js.card)) {
          this.result.card = '正确'
        } else {
          this.result.card = '错误'
        }
      },
      getSave () {
        if (this.js.selectValue === '+') {
          this.result.jingduBeforeSum = Number(this.js.firstNum) + Number(this.js.lastNum)
          this.result.jingduAfterSum = this.$floatObj.add(this.js.firstNum, this.js.lastNum)
        }n
        if (this.js.selectValue === '-') {
          this.result.jingduBeforeSum = Number(this.js.firstNum) - Number(this.js.lastNum)
          this.result.jingduAfterSum = this.$floatObj.subtract(this.js.firstNum, this.js.lastNum)
        }
        if (this.js.selectValue === '*') {
          this.result.jingduBeforeSum = Number(this.js.firstNum) * Number(this.js.lastNum)
          this.result.jingduAfterSum = this.$floatObj.multiply(this.js.firstNum, this.js.lastNum)
        }
        if (this.js.selectValue === '/') {
          this.result.jingduBeforeSum = Number(this.js.firstNum) / Number(this.js.lastNum)
          this.result.jingduAfterSum = this.$floatObj.divide(this.js.firstNum, this.js.lastNum, 2)
        }
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
