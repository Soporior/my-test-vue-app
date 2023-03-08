/*
 * @Author: lxf
 * @Date: 2023-03-08 16:10:49
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-08 16:11:09
 * @FilePath: \my-test-vue-app\mockTool\mockProdServer.ts
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
// You can use the import.meta.glob function to import all
import testModule from './api/mockapi'

export function setupProdMockServer() {
  createProdMockServer([...testModule])
}