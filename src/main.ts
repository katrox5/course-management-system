import './assets/main.css'
import 'virtual:uno.css'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component('ElIcon' + key, component)
}

app.mount('#app')
