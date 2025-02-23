import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia()
// 持久化pinia
pinia.use(piniaPluginPersistedstate)
export default pinia
