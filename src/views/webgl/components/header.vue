<template>
   <div>
        <span v-for="(item,index) in tabs.arr" :key="index">{{item.name}}</span>

   </div>
</template>

<script lang="ts" setup>
import { reactive, ref,computed } from 'vue'
// import { toRaw } from "@vue/reactivity";
// import type { FormInstance } from 'element-plus'
// import { useStore } from '@/store'
// import * as qs from 'qs'
// import { login } from "@/request/apis/index.js"
// import { useRouter, useRoute } from 'vue-router'
// const store = useStore()
// const router = useRouter()
type obj = {
    name:string,
    id:number
}
let tabs= reactive({arr:[]}) 
tabs.arr= [{
    name:'变电站总览',
    id:1
},{
    name:'设备状态',
    id:2
},{
    name:'线路管廊',
    id:3
},{
    name:'安防监控',
    id:4
},{
    name:'能流信息流',
    id:5
},{
    name:'虚拟漫游',
    id:6
},{
    name:'安全预案',
    id:7
}]
console.log(tabs)



</script>
<style lang="scss" scoped>
span {
    display: inline-block;
    width: 136px;
    height: 39px;
    border: 1px solid rgba(255,255,255,0.3020);
    opacity: 1;
}
</style>
