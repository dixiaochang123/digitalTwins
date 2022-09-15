<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="username" prop="username">
      <el-input
        v-model="ruleForm.username"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,computed } from 'vue'
import { toRaw } from "@vue/reactivity";
import type { FormInstance } from 'element-plus'
import { useStore } from '@/store'
import * as qs from 'qs'
import { login } from "@/request/apis/index.js"
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()

const token = computed(() => store.getters['getToken']);
console.log('token',token)
const getuserinfo = ()=>{

}


const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('username', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: '1234567',
  username: 'dxc'
})

const rules = reactive({
  password: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!',toRaw(ruleForm))
      login(qs.stringify(toRaw(ruleForm))).then((res:any)=>{
        localStorage.setItem('token',res.token)
        localStorage.setItem('userinfo',JSON.stringify(res.userinfo))
        store.commit('setToken',res.token)
        store.commit('setUserinfo',res.userinfo)
        router.push({
            path:'/'
        })

      }).then( (error:any) =>console.log(error))
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
