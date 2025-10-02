<template>
  <div class="app">
    <header>
      <h1>Gestión de Recetas</h1>
    </header>
    
    <main class="container">
      <FormularioReceta />
      <ListaRecetas />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRecetasStore } from './stores/recetas';
import FormularioReceta from './components/FormularioReceta.vue'
import ListaRecetas from './components/ListaRecetas.vue'

export default {
  name: 'App',
  components: {
    FormularioReceta,
    ListaRecetas
  },
  setup() {
    const recetasStore = useRecetasStore();

    // Cargar recetas al montar el componente
    onMounted(async () => {
      await recetasStore.cargarRecetas();
    });
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: white;
  padding: 1.5rem 0;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
}

h1 {
  font-size: 2.2rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .app {
    padding: 0 15px 30px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
}
</style>
