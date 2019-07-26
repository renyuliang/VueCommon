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
      }
    ]
  }
]

export default page
