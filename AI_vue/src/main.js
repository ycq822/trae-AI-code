import { createApp } from 'vue'
import './style.css'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'



createApp(App).use(elementPlus).use(router).mount('#app')
