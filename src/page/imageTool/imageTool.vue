<!--
 * @Author: lxf
 * @Date: 2023-03-08 17:39:30
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-08 17:55:54
 * @FilePath: \my-test-vue-app\src\page\imageTool\imageTool.vue
-->
<template>
    <div class="canvasContainer" >
        <canvas ref="canvasRef" > </canvas>
    </div>
</template>
<script setup>
import { ref } from "vue";
const canvasRef =  ref()
window.handel = canvasRef

</script>
<style>
.canvasContainer{
    width: 300px;
    height: 300px;
}
</style>