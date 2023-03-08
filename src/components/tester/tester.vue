<!--
 * @Author: lxf
 * @Date: 2023-02-20 09:26:32
 * @LastEditors: lxf
 * @LastEditTime: 2023-02-20 09:39:52
 * @FilePath: \my-test-vue-app\src\components\tester\tester.vue
-->
<template>
   <div class="aiContainer"> 
    <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
</template>

<script setup>
import { ref } from 'vue';
const input = ref("你好")

</script>
<style>
.aiContainer{
    width: 500px;
    height: 50px;
    background-color: aliceblue;
}
</style>