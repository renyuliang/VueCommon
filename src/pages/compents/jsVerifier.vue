<template>
  <div style="padding: 20px">
    <div class="a_span">
      <a href="#feikong">非空验证(不能有空格)</a>
      <a href="#number">正整数验证</a>
      <a href="#chinese">汉字验证</a>
      <a href="#special">特殊字符验证</a>
      <a href="#phone">手机号验证</a>
      <a href="#moneyFocus">金额及时验证</a>
      <a href="#jingdu">精度问题验证</a>
    </div>
    <div class="js">
      <h2 id="feikong">非空验证</h2>
      <input type="text" class="input" @blur="blurFeikong($event)">
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              <输入框input type="text" class="input" @blur="blurFeikong($event)">

              blurFeikong(event) {
                var str = (event.target.value).replace(/\s+/g, "")
                if (str.length === 0) {
                  // 为空
                  event.target.value = ''
                } else {
                  // 正常
                  event.target.value = str
                }
              }
            </code>
          </pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="number">正整数验证</h2>
      <input type="text" class="input" maxlength="8" @input="blurNumber($event)">
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              <输入框input type="text" class="input" maxlength="8" @input="blurNumber($event)">

              blurNumber(event) {
                var val = event.target.value
                // 判断第一位不能为0
                if (val.startsWith('0')) {
                  event.target.value = ''
                } else {
                  event.target.value= val.replace(/[^\d]/g, "")
                }
              }
            </code>
          </pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="chinese">汉字验证</h2>
      <input type="text" class="input" maxlength="20" @blur="blurChinese($event)">
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              <输入框input type="text" class="input" maxlength="20" @blur="blurChinese($event)">

              blurChinese(event) {
                var val = event.target.value
                var han = /^[\u4e00-\u9fa5]+$/;
                if (!han.test(val)) {
                  console.log('只能输入汉字（不能包含空格）')
                } else {
                  console.log('yes')
                }
              }
            </code>
          </pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="special">特殊字符验证</h2>
      <input type="text" class="input" maxlength="20" @blur="blurSpecial($event)">
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              <输入框input type="text" class="input" maxlength="20" @blur="blurSpecial($event)">

              blurSpecial(event) {
                var val = event.target.value
                var han = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
                if (!han.test(val)) {
                  console.log('不能包含特殊字符')
                } else {
                  console.log('yes')
                }
              }
            </code>
          </pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="phone">手机号验证</h2>
      <input type="text" class="input" maxlength="11" @blur="blurPhone($event)">
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              <输入框input type="text" class="input" maxlength="11" @blur="blurPhone($event)">

              blurPhone(event) {
                var val = event.target.value
                var han = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/
                if (!han.test(val)) {
                  console.log('手机号码有误')
                } else {
                  console.log('yes')
                }
              }
            </code>
          </pre>
        </el-collapse-item>
      </el-collapse>
      <h2 id="moneyFocus">金额及时验证</h2>
      <crabNumber v-model="focusMoney" :maxlength="8" :precision="2" ></crabNumber>
      <el-collapse>
        <el-collapse-item title="查看代码">
          <pre>
            <code>
              // 引入 组件
              precision: 精度，默认输入整数
            </code>
          </pre>
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
      <span>精度调整之后的结果：{{result.jingduAfterSum}}</span>
    </div>
  </div>
</template>

<script>
import crabNumber from '../../components/crab-number'
export default {
  name: 'index',
  components: { crabNumber },
  data () {
    return {
      js: {
        selectValue: '+', // 判断计算类型
        firstNum: '',
        lastNum: ''
      },
      // 返回结果
      result: {
        jingduBeforeSum: '', // 精度调试之前的结果
        jingduAfterSum: ''// 精度调试之后的结果
      },
      focusMoney: ''
    }
  },
  methods: {
    // 非空
    blurFeikong(event) {
      var str = (event.target.value).replace(/\s+/g, "")
      if (str.length === 0) {
        // 为空
        event.target.value = ''
        console.log('为空')
      } else {
        // 正常
        event.target.value = str
      }
    },
    // 正整数
    blurNumber(event) {
      var val = event.target.value
      // 判断第一位不能为0
      if (val.startsWith('0')) {
        event.target.value = ''
      } else {
        event.target.value= val.replace(/[^\d]/g, "")
      }
    },
    // 汉字
    blurChinese(event) {
      var val = event.target.value
      var han = /^[\u4e00-\u9fa5]+$/;
      if (!han.test(val)) {
        console.log('只能输入汉字（不能包含空格）')
      } else {
        console.log('yes')
      }
    },
    // 特殊字符
    blurSpecial(event) {
      var val = event.target.value
      var han = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
      if (!han.test(val)) {
        console.log('不能包含特殊字符')
      } else {
        console.log('yes')
      }
    },
    // 手机号码
    blurPhone(event) {
      var val = event.target.value
      var han = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/
      if (!han.test(val)) {
        console.log('手机号码有误')
      } else {
        console.log('yes')
      }
    },
    getSave () {
      if (this.js.selectValue === '+') {
        this.result.jingduBeforeSum = Number(this.js.firstNum) + Number(this.js.lastNum)
        this.result.jingduAfterSum = this.$floatObj.add(this.js.firstNum, this.js.lastNum)
      }
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
