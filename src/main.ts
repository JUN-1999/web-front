import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/css/main.css'
// element组件样式
import 'element-plus/dist/index.css'
// 公共方法
import common from '@/utils/common'
// 图片裁剪样式
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

const app = createApp(App)

app.config.globalProperties.$common = common;
app.use(createPinia())
app.use(VueCropper)
app.use(router)

app.mount('#app')
