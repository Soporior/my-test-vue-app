/*
 * @Author: lxf
 * @Date: 2023-03-07 17:12:09
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-08 14:04:58
 * @FilePath: \my-test-vue-app\src\config\mockApi\index.ts
 */
// 一：本地mock的使用
import Mock from "mockjs";
import homeApi from "./mockData/home.js";
// import userApi from "./mockData/user.js";
// import permissionApi from "./mockData/permission.js";
// 拦截请求(将对服务器的请求拦截转向本地请求，模拟异步请求操作)
// 将请求路径进行拦截，并返回第二个参数的数据
window.mock = Mock
Mock.XHR()
Mock.mock(/home\/getData/, homeApi.getHomeData);

// // 本地获取user的数据(正则) 注意：params参数传递需要以对象形式{params：data}
// Mock.mock(/user\/getUser/, "get", userApi.getUserList);
// // 拦截用户登录(使用字符串写的地址会被写死携带参数无法识别拦截，利用正则即可拦截此字段发出的请求)
// Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);