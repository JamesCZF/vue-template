import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import '@/assets/styles/common.less'
import '@/assets/styles/reset.css';
import '@/assets/styles/iconfont/iconfont.css';

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.use(router);
app.use(Antd);

app.mount('#app')
