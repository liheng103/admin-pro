import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './store/index.ts'
import './styles/reset.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')