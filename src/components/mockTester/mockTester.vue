<template>

    <button @click="fun">
    点击</button>
</template>

<script lang="ts" setup>
import axios from "axios";
console.log(import.meta.env)
const fun =()=>{
//     api.getData({}).then(res=>{
//     console.log(res);
    
// })
axios.get("/api/get").then(res=>{
    console.log(res);
    
})

}
</script>