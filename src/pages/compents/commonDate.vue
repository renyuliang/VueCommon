<template>
  <div style="padding: 20px;">
    <div class="a_span">
      <a href="#date1">选择今天之前的日期</a>
      <a href="#date2">(年 月 日)日期范围 2个选择框</a>
      <a href="#date3">(年 月)日期范围 2个选择框</a>
    </div>
    <br>
    <h2>日期选择</h2>
    <div id="date1">
      <el-date-picker
        v-model="date1"
        type="date"
        :picker-options="Options1"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre><code>
              //调用方法 (组件名是：el-date-picker)
              <
                v-model="date1"
                type="date"
                :picker-options="Options1"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </>
              // 变量
              date1: '',
              Options1: {
                disabledDate(time) {
                  return time.getTime() > Date.now()             // 今天之前的日期，可以选择今天
                  return time.getTime() > Date.now() - 8.64e7    // 今天之前的日期，不可以选择今天
                  return time.getTime() < Date.now()             // 今天之后的日期，不可以选择今天
                  return time.getTime() < Date.now() - 8.64e7    // 今天之后的日期，可以选择今天
                }
              }
            </code></pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <br>
    <h2>日期选择（范围）</h2>
    <div id="date2">
      <el-date-picker
        v-model="dateStart"
        type="date"
        :picker-options="OptionsStart"
        @change="selectTimeStart"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      -
      <el-date-picker
        v-model="dateEnd"
        type="date"
        :picker-options="OptionsEnd"
        @change="selectTimeEnd"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-collapse>
        <el-collapse-item title="查看代码">
            <pre><code>
              //调用方法 (组件名是：el-date-picker)
              <
                v-model="dateStart"
                type="date"
                :picker-options="OptionsStart"
                @change="selectTimeStart"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </>
              -

                v-model="dateEnd"
                type="date"
                :picker-options="OptionsEnd"
                @change="selectTimeEnd"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </>
              // 变量
              dateStart: '',
              dateEnd: '',
              OptionsStart:{
                disabledDate(time) {
                  return time.getTime() > Date.now() // 如果不以今天为节点，及随便选择，则去掉此项判断，方法中 也要去掉
                }
              },
              OptionsEnd: {
                disabledDate(time) {
                  return time.getTime() > Date.now() // 如果不以今天为节点，及随便选择，则去掉此项判断，方法中 也要去掉
                }
              }
              // 方法
              selectTimeStart(val) {
                this.OptionsEnd = {
                  disabledDate: (time) => {
                    let curDate = (new Date()).getTime()
                    let three = parseInt(this.getDaysBetween(val, new Date().toLocaleDateString()))
                    let threeMonths = curDate - three
                    return time.getTime() <= threeMonths || time.getTime() > Date.now()
                  }
                }
              },
              selectTimeEnd(val) {
                this.OptionsStart = {
                  disabledDate: (time) => {
                    let curDate = (new Date()).getTime()
                    let three = parseInt(this.getDaysBetween(val, new Date().toLocaleDateString()) - (1 * 24 * 60 * 60 * 1000))
                    let threeMonths = curDate - three
                    return time.getTime() > Date.now() || time.getTime() > threeMonths
                  }
                }
              },
              getDaysBetween(dateString1, dateString2) {
                // 1 是选择的日期，2 是当前的日期
                let startDate = Date.parse(dateString1.replace('/-/g', '/'))
                let endDate = Date.parse(dateString2)
                let diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000
                let days = (diffDate / (1 * 24 * 60 * 60 * 1000)) * 24 * 3600 * 1000
                return days
              }
              </code></pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <br>
    <h2>年月选择（范围）</h2>
    <el-date-picker v-model.trim="monthStart" :picker-options="optionMonthStart" @change="selectMonthStart" :clearable="false" :editable="false" type="month" value-format="yyyy-MM" placeholder="月份" />
    -
    <el-date-picker v-model.trim="monthEnd" :picker-options="optionMonthEnd" @change="selectMonthEnd" :clearable="false" :editable="false" type="month" value-format="yyyy-MM" placeholder="月份" />
    <br>
    <h2>计算2个日期之间的时间差</h2>
    第一个日期：2019-11-01
    <br>
    第二个日期：2020-01-02
    <br>
    <el-button type="primary" @click="monthDayDiff">计算</el-button>
    <br>
    {{getDateResult}}
  </div>
</template>

<script>
  export default {
    name: 'commonDate',
    data () {
      return {
        getDateResult: '',
        date1: '',
        Options1: {
          disabledDate(time) {
            return time.getTime() > Date.now() // 今天之前的日期，可以选择今天
            // return time.getTime() > Date.now() - 8.64e7 // 今天之前的日期，不可以选择今天
            // return time.getTime() < Date.now()// 今天之后的日期，不可以选择今天
            // return time.getTime() < Date.now() - 8.64e7 // 今天之后的日期，可以选择今天
          }
        },

        dateStart: '',
        dateEnd: '',
        OptionsStart:{
          disabledDate(time) {
            return time.getTime() > Date.now() // 如果不以今天为节点，及随便选择，则去掉此项判断，方法中 也要去掉
          }
        },
        OptionsEnd: {
          disabledDate(time) {
            return time.getTime() > Date.now() // 如果不以今天为节点，及随便选择，则去掉此项判断，方法中 也要去掉
          }
        },

        monthStart: '',
        monthEnd: '',
        optionMonthStart: {},
        optionMonthEnd: {}
      }
    },
    methods: {
      // 日期
      selectTimeStart(val) {
        this.OptionsEnd = {
          disabledDate: (time) => {
            let curDate = (new Date()).getTime()
            let three = parseInt(this.getDaysBetween(val, new Date().toLocaleDateString()))
            let threeMonths = curDate - three
            return time.getTime() <= threeMonths || time.getTime() > Date.now()
          }
        }
      },
      selectTimeEnd(val) {
        this.OptionsStart = {
          disabledDate: (time) => {
            let curDate = (new Date()).getTime()
            let three = parseInt(this.getDaysBetween(val, new Date().toLocaleDateString()) - (1 * 24 * 60 * 60 * 1000))
            let threeMonths = curDate - three
            return time.getTime() > Date.now() || time.getTime() > threeMonths
          }
        }
      },
      getDaysBetween(dateString1, dateString2) {
        // 1 是选择的日期，2 是当前的日期
        let startDate = Date.parse(dateString1.replace('/-/g', '/'))
        let endDate = Date.parse(dateString2)
        let diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000
        let days = (diffDate / (1 * 24 * 60 * 60 * 1000)) * 24 * 3600 * 1000
        return days
      },
      // 月份
      selectMonthStart(val){
        const _this = this
        if (val) {
          const betweenStart = val.substring(val.length - 2)
          _this.optionMonthEnd = {
            disabledDate(date) {
              const disableMonth = date.getMonth() + 1
              const disableYear = date.getFullYear()
              if (disableYear > val.substring(0, 4)) {
                return false
              } else if (disableYear < val.substring(0, 4)) {
                return true
              }
              return disableMonth < betweenStart
            }
          }
        }
      },
      selectMonthEnd(val){
        const _this = this
        if (val) {
          const betweenEnd = val.substring(val.length - 2)
          _this.optionMonthStart = {
            disabledDate(date) {
              const disableMonth = date.getMonth() + 1
              const disableYear = date.getFullYear()
              if (disableYear < val.substring(0, 4)) {
                return false
              } else if (disableYear > val.substring(0, 4)) {
                return true
              }
              return disableMonth > betweenEnd
            }
          }
        }
      },
      monthDayDiff() {
        let _this = this
        let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
        let start = new Date('2019-11-01')
        let end = new Date('2020-01-02')
        let year = end.getFullYear() - start.getFullYear();
        let month = end.getMonth() - start.getMonth()
        let day = end.getDate() - start.getDate()
        if (month < 0) {
          year--;
          month = end.getMonth() + (12 - start.getMonth())
        }
        if (day < 0) {
          month--
          let index = flag.findIndex((temp) => {
            return temp === start.getMonth() + 1
          })
          let monthLength
          if (index <= 6) {
            monthLength = 31
          } else if (index > 6 && index <= 10) {
            monthLength = 30
          } else {
            monthLength = 28
          }
          day = end.getDate() + (monthLength - start.getDate())
        }
        _this.getDateResult = `相差${year}年${month}月${day}天`
      }
    }
  }
</script>

<style scoped lang="scss">
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
</style>
