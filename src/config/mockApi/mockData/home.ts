/*
 * @Author: lxf
 * @Date: 2023-03-07 17:12:59
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-07 17:13:05
 * @FilePath: \my-test-vue-app\src\config\mockApi\mockData\homeApi.ts
 */
export default {
    getHomeData: () => {
      return {
        code: 200,
        data: {
          tableData: [
            {
              name: "oppo",
              todayBuy: 500,
              mothBuy: 3500,
              totalBuy: 22000,
            },
            {
              name: "vivo",
              todayBuy: 500,
              mothBuy: 3500,
              totalBuy: 22000,
            },
            {
              name: "苹果",
              todayBuy: 500,
              mothBuy: 3500,
              totalBuy: 22000,
            },
            {
              name: "小米",
              todayBuy: 1200,
              mothBuy: 6500,
              totalBuy: 45000,
            },
            {
              name: "三星",
              todayBuy: 500,
              mothBuy: 2000,
              totalBuy: 34000,
            },
            {
              name: "魅族",
              todayBuy: 350,
              mothBuy: 3500,
              totalBuy: 22000,
            },
          ],
        },
      };
    },
  };