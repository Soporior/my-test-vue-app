import request from "./request";
export default {
  // 获取echart表格数据
  getEchartData(params) {
    return request({
      url: "/home/getEchartData",
      method: "get",
      // 单个接口mock的控制
      mock: true,
    });
  },
  // 获取userData数据
  getUserData(params) {
    return request({
      // 这里需要和拦截请求的地址一致,拦截之后返回自定义的一些数据
      url: "/user/getUser",
      method: "get",
      // 这里不需要先上就关闭mock
      mock: false,
      data: params,
    });
  },
  getData(params) {
    return request({
      // 这里需要和拦截请求的地址一致,拦截之后返回自定义的一些数据
      url: "/home/getData",
      method: "get",
      // 这里不需要先上就关闭mock
      mock: true,
      data: params,
    });
  },
};