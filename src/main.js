// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'element-ui/lib/theme-chalk/index.css'
import { floatObj } from './mixin/floatObj'
import { isNull } from './mixin/regular'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueQuillEditor)
// Vue.use(axios)
// Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$floatObj = floatObj
// Vue.prototype.$regularJs = regularJs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 空白处理过滤器
Vue.filter('handleNullFilter', function (value) {
  return !isNull(value) ? value : '--'
})
// 超出长度，显示省略号
Vue.filter('handleEselipisFilter', function (value, num) {
  if (isNull(value)) {
    return '--'
  }
  if (value.length > num) {
    return value.slice(0, num) + '...'
  }
  return value
})
