import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
// 创建pinia实例
const pinia = createPinia()
// 注册持久化插件
pinia.use(persist)
export default pinia
// 统一导出，代码简洁，入口唯一
export * from './modules/user'
