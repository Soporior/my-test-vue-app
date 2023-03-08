<!--
 * @Author: lxf
 * @Date: 2023-02-20 09:48:56
 * @LastEditors: lxf
 * @LastEditTime: 2023-02-23 16:38:58
 * @FilePath: \xingzhengtupu\src\page\ai\Index.vue
-->
<template>

   <div class="aiContainer">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" ref="listRef">
        <li v-for="(i,index) in chatMessage"  :key="index" class="infinite-list-item" :class="i.speaker=='chat'?'chat':'user'">
            <img :src="i.speaker=='chat'?chatGPTLogo:userLogo" alt="">
            {{ i.text }}</li>
    </ul>
    <div class="inputContainer">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            style="height: 100%;"
            @keyup.enter.native="aiButton">
            </el-input>
        
    </div>
   </div>
</template>
<script>
import chatGPTLogo from "./src/img/chatPGPT.png"
import userLogo from "./src/img/user.png"
import Vue  from "vue"
import { Input } from 'element-ui'

import "./src/index.scss"
import {aiUrl} from '@/api/ai.js'
Vue.use(Input);
export default   {
  data(){
    return{
        count:1,
        textarea : "",
        chatMessage:[],//{speaker:'',text:""},
        userLogo,
        chatGPTLogo
    }

  },
  methods:{
    load(){
        this.count++
    },
    aiButton(){
      const text = this.textarea
        this.chatMessage.push({speaker:'user',text:this.textarea})
        this.textarea = ""
        this.$nextTick(()=>{
                this.$refs.listRef.scrollTo({ top:   this.$refs.listRef.scrollHeight+1000, behavior: 'smooth' })

            })
    // const aiURl = "http://94.74.92.97:8000/chatgpt/"
         aiUrl(text).then((res)=>{
          this.chatMessage.push({speaker:'chat',text:res.AI})
          
          this.$refs.listRef.scrollTo({ top:   this.$refs.listRef.scrollHeight, behavior: 'smooth' })
            this.$nextTick(()=>{
                this.$refs.listRef.scrollTo({ top:   this.$refs.listRef.scrollHeight+1000, behavior: 'smooth' })

            })
        })

    }

  }


  
  
}
</script>