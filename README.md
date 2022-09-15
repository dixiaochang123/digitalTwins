# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## 遇到的问题
- vite.config.ts
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
// import path from 'path'
// 替换成这种导入方式
import * as path from 'path'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 开发或生产环境服务的公共基础路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server:{
    host: '0.0.0.0',
    port: 8080,
    open: true,
    //cors: true // 允许跨域
    // proxy: {
    //   '/api': {
    //     target: '', // 后台接口,
    //     changeOrigin: true,
    //     secure: false, // 如果是 https 接口需要配置这个参数
    //     // ws:false,//websocket
    //     rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
    //   },
    // },
  }
})

```
- package.json
```
{
  "name": "vue3-ts",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@types/node": "^17.0.21",
    "@vitejs/plugin-vue": "^2.2.0",
    "typescript": "^4.5.4",
    "vite": "^2.8.0",
    "vue-tsc": "^0.29.8"
  }
}

```
- tsconfig.json
```
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    // 开发或生产环境服务的公共基础路径
    "baseUrl": "./",
    // 别名 没这个配置，会飘红
    "paths":{
      "@": ["src"],
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```
- icon 全局引入 动态组件的使用
```
main.ts
import * as Icons from '@element-plus/icons-vue'

app.mount('#app')
// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
// 创建Icon组件
const Icon = (props: { icon: string }) => {
    const { icon } = props
    return createVNode(Icons[icon as keyof typeof Icons])
}
app.component('Icon',Icon)
```
```
MenuItem.vue
<template>
    <template v-for="item in menuList" :key="item.path">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                 <!-- 动态组件的使用方式 -->
                <component class="icons" :is="item.meta.icon" />
                <!-- 方式二 -->
                <!-- <Icon class="icons" :icon="item.meta.icon"></Icon> -->
                <!-- <Icon class="icons" :icon="item.meta.icon"></Icon> -->
                <span>{{item.meta.title}}</span>
            </template>
            <MenuItem :menuList="item.children"></MenuItem>
        </el-sub-menu>
        <el-menu-item style="color:#f4f4f5" v-else :index="item.path">
            <component class="icons" :is="item.meta.icon" />
            <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
defineProps([
    'menuList'
])

</script>
```
# 在git push时候将上传文件传到远程仓库时总是出错，原因是文件过大造成的。

# 原因：http.postBuffer默认上限为1M,所以将上限改大就行

解决方案:```git config --global http.postBuffer 524288000```,之后就能顺利上传了// 这里该成500M

改完就可以了。