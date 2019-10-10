<template>
  <div style="padding: 20px">
    <div class="a_span">
      <a href="#canshu">页面获取参数</a>
      <a href="#array">arguments转化为数组</a>
      <a href="#quchong">数组去重</a>
      <a href="#kongbai">空白过滤器</a>
      <a href="#jiequlength">截取字符串长度</a>
      <a href="#changeDate">时间戳转化为时间</a>
      <a href="#changeTimestamp">时间转化为时间戳</a>
    </div>
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
            <!--function addZero (val) {-->
              <!--if(val >= 0 && val <= 9){-->
                <!--return '0' + val-->
              <!--}-->
            <!--}-->
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
export default {
  name: 'jsFunction',
  data () {
    return {}
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
