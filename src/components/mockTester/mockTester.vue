<template>

    <button @click="fun">
    点击</button>
</template>

<script lang="ts" setup>
import api from "@/config/mockApi/api"
import axios from "axios";
const fun =()=>{
//     api.getData({}).then(res=>{
//     console.log(res);
    
// })
axios.get("/api/text").then(res=>{
    console.log(res);
    
})

}
</script>