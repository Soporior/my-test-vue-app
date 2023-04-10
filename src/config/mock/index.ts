/*
 * @Author: lxf
 * @Date: 2023-03-08 16:10:49
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-14 14:29:50
 * @FilePath: \my-test-vue-app\src\mock\index.ts
 */

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
// You can use the import.meta.glob function to import all
import testModule from './sources/mockapi'

export function setupProdMockServer() {
  createProdMockServer([...testModule])

}