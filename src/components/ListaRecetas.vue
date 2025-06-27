<template>
  <div class="lista-recetas">
    <h2>Mis Recetas ({{ totalRecetas }})</h2>
    
    <div v-if="!recetas || recetas.length === 0" class="sin-recetas">
      <p>No hay recetas guardadas. ¡Agrega tu primera receta!</p>
    </div>
    
    <div v-else class="recetas-grid">
      <div v-for="receta in recetasOrdenadas" :key="receta.id" class="receta-card">
        <div class="receta-header">
          <h3>{{ receta.nombre || 'Receta sin nombre' }}</h3>
          <span v-if="receta.dificultad" :class="['dificultad', getDificultadClass(receta.dificultad)]">
            {{ receta.dificultad }}
          </span>
        </div>
        
        <div class="receta-tiempo" v-if="receta.tiempo || receta.fecha">
          <span v-if="receta.tiempo">⏱️ {{ receta.tiempo }} min</span>
          <span v-if="receta.fecha">📅 {{ formatFecha(receta.fecha) }}</span>
        </div>
        
        <div class="receta-ingredientes" v-if="receta.ingredientes">
          <h4>Ingredientes:</h4>
          <ul>
            <li v-for="(ingrediente, index) in receta.ingredientes.split(',').filter(i => i.trim())" :key="index">
              {{ ingrediente.trim() }}
            </li>
          </ul>
        </div>
        
        <div class="receta-instrucciones" v-if="receta.instrucciones">
          <h4>Preparación:</h4>
          <p>{{ receta.instrucciones }}</p>
        </div>
        
        <button 
          v-if="receta.id"
          @click="eliminarReceta(receta.id)" 
          class="btn btn-danger btn-eliminar"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRecetasStore } from '@/stores/recetas'
import { formatFecha } from '@/utils/formato'

export default {
  name: 'ListaRecetas',
  
  setup() {
    const recetasStore = useRecetasStore()
    console.log(recetasStore.recetas);
    // Obtener recetas del store
    const recetas = computed(() => recetasStore.recetas)
    const recetasOrdenadas = computed(() => recetasStore.recetasOrdenadas)
    const totalRecetas = computed(() => recetasStore.totalRecetas)
    
    // Métodos
    const eliminarReceta = (id) => {
      if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        recetasStore.eliminarReceta(id)
      }
    }
    
    const formatFecha = (fecha) => {
      if (!fecha) return 'Sin fecha'
      
      try {
        // Si la fecha ya está en formato ISO (YYYY-MM-DD), la convertimos a objeto Date
        const fechaObj = fecha.includes('-') ? new Date(fecha) : new Date(fecha)
        
        // Verificamos si la fecha es válida
        if (isNaN(fechaObj.getTime())) {
          return 'Fecha inválida'
        }
        
        const opciones = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          timeZone: 'UTC' // Evita problemas de zona horaria
        }
        
        return fechaObj.toLocaleDateString('es-ES', opciones)
      } catch (error) {
        console.error('Error al formatear la fecha:', error)
        return 'Fecha inválida'
      }
    }
    
    const getDificultadClass = (dificultad) => {
      return {
        'facil': dificultad === 'Fácil',
        'media': dificultad === 'Media',
        'dificil': dificultad === 'Difícil'
      }
    }
    
    return {
      recetas,
      recetasOrdenadas,
      totalRecetas,
      eliminarReceta,
      formatFecha,
      getDificultadClass
    }
  }
}
</script>

<style scoped>
.lista-recetas {
  margin-top: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.sin-recetas {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #6c757d;
}

.recetas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.receta-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.receta-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.receta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.receta-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.dificultad {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.facil {
  background-color: #e6f7ee;
  color: #10b981;
}

.media {
  background-color: #fef3c7;
  color: #d97706;
}

.dificil {
  background-color: #fee2e2;
  color: #dc2626;
}

.receta-tiempo {
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.receta-ingredientes,
.receta-instrucciones {
  margin-bottom: 1.5rem;
}

h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

ul {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  color: #4a5568;
  line-height: 1.6;
}

p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0.5rem 0 0;
}

.btn-eliminar {
  margin-top: auto;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .recetas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
