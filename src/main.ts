
//@ts-ignore
import { createApp } from 'vue'
import pinia from './stores'
import * as buffer from "buffer"; //引入buffer
if (typeof (window as any).Buffer === "undefined") { // 判断当前环境是否有Buffer对象
    (window as any).Buffer = buffer.Buffer; // Buffer对象不存在则创建导入的buffer
 }
import App from './App.vue'
import router from './router'

import "vant/es/toast/style"

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
