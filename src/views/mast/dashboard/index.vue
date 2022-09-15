<template>
<el-button @click="getuserinfo">获取数据</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref,computed,onMounted,toRefs } from 'vue'
import { toRaw } from "@vue/reactivity";
import type { FormInstance } from 'element-plus'
import { getUserinfo } from "@/request/apis/index.js"
import * as qs from 'qs'
import { useStore } from '@/store'
const store = useStore()

const userinfo = computed(() => store.getters['getUserinfo']);
const getuserinfo = ()=>{
  console.log(userinfo.value)
  getUserinfo(userinfo.value.id).then(res=>{
    console.log(res)
  }).catch(error=>console.log(error))

}

onMounted(()=>{

})


</script>
