import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/styles/global.css'

const app = createApp(App)

// Usar Pinia para la gestión del estado
app.use(createPinia())

app.mount('#app')
