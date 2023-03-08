/*
 * @Author: lxf
 * @Date: 2023-03-07 14:58:53
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-08 13:57:30
 * @FilePath: \my-test-vue-app\src\config\mockApi\envConfig.ts
 */
// 环境配置文件
// 开发环境
// 测试环境
// 线上环境

// import.meta.env.MODE: {string} 应用运行的模式。(vite官网)
// import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
// import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
// import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
// import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

// 当前环境(取不到默认为线上环境)
const env = import.meta.env.MODE || "prod";

const EnvConfig = {
  // 开发环境
  development: {
   //默认地址
    baseApi: "/api",
    // 拦截请求地址(开启线上拦截之后将mockApi设置为默认路径，再去线上mock官网中获取设置好的接口数据)
    mockApi:
      "mock/",
  },
  // 测试环境(随便写的)
  test: {
    baseApi: "//test.futurecom/api",
    mockApi:
      "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api",
  },
  // 生产环境
  pro: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api",
  },
};

export default {
  // 导出当前环境
  env,
  // mock总开关，控制mock本地拦截或者在线拦截
  mock: true,
  ...EnvConfig[env],
};
