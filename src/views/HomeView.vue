<template>
  <div class="home">
    <header>
      <h1>Mis Recetas</h1>
    </header>
    <router-link to="/nueva-receta" class="btn btn-primary">
      Nueva Receta
    </router-link>
    
    <ListaRecetas />
  </div>
</template>

<script>
import ListaRecetas from '@/components/ListaRecetas.vue';

export default {
  name: 'HomeView',
  components: {
    ListaRecetas
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}
</style>
