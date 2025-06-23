<template>
  <div class="app">
    <header>
      <h1>Gestión de Recetas</h1>
    </header>
    <main>
      <p>¡Bienvenido a tu gestor de recetas de cocina!</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 5px;
}

h1 {
  font-size: 2rem;
}

main {
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
