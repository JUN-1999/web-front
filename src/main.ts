import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/main.css'

// 测试引入


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
