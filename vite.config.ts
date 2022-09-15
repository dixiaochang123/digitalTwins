import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'; // 引入cesium插件

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
// import path from 'path'
// 替换成这种导入方式
import * as path from 'path'
// import { resolve } from 'path'

function pathResolve(dir) {
  return path.resolve(__dirname, ".", dir);
}
export default defineConfig({
  base: './', // 开发或生产环境服务的公共基础路径
  plugins: [vue(), cesium()],
  // resolve: {
  //   alias:[
  //     {
  //       find:'@',
  //       replacement:path.resolve(__dirname,"src")
  //     }
  //   ]
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置别名
      "@hooks": pathResolve("hooks"),
      "web3":pathResolve("./node_modules/web3/dist/web3.min.js"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server:{
    // host: '127.0.0.1',
    host: "0.0.0.0",
    port: 8085,
    open: true,
    //cors: true // 允许跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 后台接口,
        changeOrigin: true,
        secure: false, // 如果是 https 接口需要配置这个参数
        // ws:false,//websocket
        // rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
      },
      '/my': {
        target: 'http://127.0.0.1:3000', // 后台接口,
        changeOrigin: true,
        secure: false, // 如果是 https 接口需要配置这个参数
        // ws:false,//websocket
        // rewrite: (path) => path.replace(/^\/my/, ''), // 路径重写
      },
    },
    hmr:true
  }
})
