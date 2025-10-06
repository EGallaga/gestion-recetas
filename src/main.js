import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/global.css'

// Crear la aplicación Vue
const app = createApp(App)

// Configurar Pinia para el manejo del estado
const pinia = createPinia()
app.use(pinia)

// Configurar el router
app.use(router)

// Montar la aplicación
app.mount('#app')

// Manejar errores globales
app.config.errorHandler = (err, vm, info) => {
  console.error('Error de Vue:', err)
  console.error('Componente:', vm)
  console.error('Info:', info)
}

// Mostrar mensaje cuando la aplicación esté lista
router.isReady().then(() => {
  console.log('Aplicación lista')
}).catch(err => {
  console.error('Error al inicializar el router:', err)
})
