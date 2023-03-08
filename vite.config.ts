import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

console.log(import.meta.env)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  viteMockServe({
    mockPath: 'mock',
        //  localEnabled: command === 'serve',
        //  prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from '../mockTool/mockProdServer';
          setupProdMockServer();
        `,
  }),],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})


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