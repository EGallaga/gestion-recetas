import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// Importaciones asíncronas para mejor rendimiento
const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'));
const NuevaRecetaView = defineAsyncComponent(() => import('@/views/NuevaRecetaView.vue'));

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/nueva-receta',
    name: 'nueva-receta',
    component: NuevaRecetaView
  },
  {
    path: '/editar-receta/:id',
    name: 'editar-receta',
    component: NuevaRecetaView,
    props: true
  },
  // Ruta de redirección para manejar rutas no encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Configuración adicional del router
  scrollBehavior() {
    // Siempre hacer scroll al inicio cuando se navega
    return { top: 0 };
  }
});

// Navegación global
router.beforeEach((to, from, next) => {
  console.log(`Navegando a: ${to.path}`);
  next();
});

export default router;
