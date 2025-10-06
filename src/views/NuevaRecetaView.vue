<template>
  <div class="nueva-receta">
    <FormularioReceta />
  </div>
</template>

<script>
import FormularioReceta from '@/components/FormularioReceta.vue'

export default {
  name: 'NuevaRecetaView',
  components: {
    FormularioReceta
  }
}
</script>

<style scoped>
.nueva-receta {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
