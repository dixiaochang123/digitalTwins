import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from './router'
import {store, key} from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
const app = createApp(App)

// 任何以 'app-' 开头的元素都会被识别为自定义元素
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('app-')

app.use(router)
app.use(store, key)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

// app.config.globalProperties.customProperty = () => {}

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
console.log(app)