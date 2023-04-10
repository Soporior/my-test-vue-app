/*$$
 $ @Author: lxf
 $ @Date: 2023-03-07 14:08:18
 $ @LastEditors: lxf
 $ @LastEditTime: 2023-03-07 14:46:07
 $ @FilePath: \my-test-vue-app\src\config\router\routes.js
 $*/
 import { RouteRecordRaw } from 'vue-router'
 const route: Array<RouteRecordRaw>= [
  {path:'/',redirect:"/mocktest"},
  { path: '/tester', component: () => import('@/components/tester/tester.vue') },
  { path: '/mocktest', component: ()=>import("@/components/mockTester/mockTester.vue")},
  { path: '/draw', component: ()=>import("@/page/imageTool/imageTool.vue")},

]
export default route 