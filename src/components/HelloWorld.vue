<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore } from '@/store'

defineProps<{ msg: string }>()

const count = ref(0)
const msg = ref('vue3')
const store = useStore()
console.log(store.state.count)
const msgchange = ()=>{
  store.commit('setCount',++count.value)
  console.log(store.state.count)
}
const showcont = computed(()=>{

  return store.getters['getCount']
})

</script>

<template>
  <h1 @click="msgchange">{{ msg }}--{{showcont}}</h1>


  <el-button  @click="count++">count is: {{ count }}</el-button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
