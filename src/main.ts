import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import './styles/reset.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')