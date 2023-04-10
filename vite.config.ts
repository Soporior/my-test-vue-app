import {  UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe  } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport =>{
  let prodMock = true
  return {
    plugins: [vue(),
      viteMockServe({
        mockPath: "./src/config/mock", // 解析，路径可根据实际变动 (./src/mock/source 用这个代码我查错3H)
        localEnabled: command === 'serve', // 开发环境
        prodEnabled:command !== 'serve'&& prodMock, // 生产环境设为true，也可以根据官方文档格式 command !== 'serve' && prodMock
        injectCode: 
          `import { setupProdMockServer } from './config/mock';
          console.log("sbsb")
          setupProdMockServer(); `,
          watchFiles: true, // 监听文件内容变更
          // 无法指定 只能使用默认的 injectFile属性 injectFile:resolve('./src/main.ts'), // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      })
  ],
  
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'public': resolve(__dirname, './public')
      }
    }
  }
}


// export default ({ command }: ConfigEnv): UserConfigExport => {
//   // According to the project configuration. Can be configured in the .env file
//   let prodMock = true
//   console.log(command)
//   debugger
//   return {
//     plugins: [
//       viteMockServe({
//         mockPath: 'mock',
//         localEnabled: command === 'serve',
//         prodEnabled: command !== 'serve' && prodMock,
//         injectCode: `
//           import { setupProdMockServer } from '../mockTool/mockProdServer';
//           setupProdMockServer();
//         `,
//       }),
//       vue(),
//     ],
//     resolve: {
//       alias: {
//         '@': resolve(__dirname, './src')
//       }
//     }
//   }
// }