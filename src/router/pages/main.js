/*
* Created by 符菲菲 on 2018/1/23
*/
const page = [
  {
    path: '/',
    meta: {title: 'vue 组件封装'},
    component: resolve => require(['@/pages/index.vue'], resolve),
    name: 'index',
    children: [
      {
        path: '/',
        meta: {title: 'vue 组件封装'},
        component: resolve => require(['@/pages/Index/index.vue'], resolve),
        name: 'index'
      },
      {
        path: '/compents/zujian',
        meta: {title: '组件'},
        component: resolve => require(['@/pages/compents/zujian.vue'], resolve),
        name: 'zujian'
      },
      {
        path: '/compents/jsVerifier',
        meta: {title: 'js验证'},
        component: resolve => require(['@/pages/compents/jsVerifier.vue'], resolve),
        name: 'jsVerifier'
      },
      {
        path: '/compents/jsFunction',
        meta: {title: 'js常用发放'},
        component: resolve => require(['@/pages/compents/jsFunction.vue'], resolve),
        name: 'jsFunction'
      }
    ]
  }
]

export default page
