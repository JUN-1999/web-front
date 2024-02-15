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
import 'vue-cropper/dist/index.css';

// websocket链接
import { socket } from '@/utils/socket';
socket.reconnect();

// md 预览组件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

app.config.globalProperties.$common = common;
app.use(createPinia());
app.use(VueCropper);
app.use(router);
app.use(VueMarkdownEditor);


app.mount('#app')
