/*$$
 $ @Author: lxf
 $ @Date: 2023-02-17 15:33:31
 $ @LastEditors: lxf
 $ @LastEditTime: 2023-03-07 14:16:59
 $ @FilePath: \my-test-vue-app\src\main.js
 $*/
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/config/router/router';
// import "@/config/mockApi/index"

createApp(App).use(ElementPlus).use(router)
.mount('#app')


// if (import.meta.env.MODE === 'development') {

    
//   setupProdMockServer();
// }