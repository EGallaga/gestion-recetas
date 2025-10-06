<template>
  <div class="lista-recetas">
    <div v-if="cargando" class="cargando">
      <p>Cargando recetas...</p>
    </div>
    
      <div v-else>
        <h2>Mis Recetas ({{ totalRecetas }}) </h2>
      
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
                <li v-for="(ingrediente, index) in receta.ingredientes" :key="index">
                  {{ ingrediente.trim() }}
                </li>
              </ul>
            </div>
            
            <div class="receta-instrucciones" v-if="receta.instrucciones">
              <h4>Preparación:</h4>
              <p>{{ receta.instrucciones }}</p>
            </div>
            
            <div class="receta-acciones">
              <button 
                v-if="receta.id"
                @click="editarReceta(receta.id)" 
                class="btn btn-editar"
              >
                Editar
              </button>
              <button 
                v-if="receta.id"
                @click.stop="eliminarReceta(receta.id)" 
                class="btn btn-eliminar"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecetasStore } from '@/stores/recetas'

export default {
  name: 'ListaRecetas',
  
  setup() {
    const router = useRouter()
    const recetasStore = useRecetasStore()
    const cargando = ref(true)

    // Cargar recetas al montar el componente
    onMounted(async () => {
      try {
        await recetasStore.cargarRecetas()
      } catch (error) {
        console.error('Error al cargar las recetas:', error)
      } finally {
        cargando.value = false
      }
    })

    const recetas = computed(() => recetasStore.recetas)
    const totalRecetas = computed(() => recetas.value.length)
    const recetasOrdenadas = computed(() => {
      return [...recetas.value].sort((a, b) => {
        // Ordenar por fecha más reciente primero
        return new Date(b.fecha) - new Date(a.fecha)
      })
    })

    const eliminarReceta = async (id) => {
      if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        try {
          await recetasStore.eliminarReceta(id)
          // Recargar las recetas después de eliminar
          await recetasStore.cargarRecetas()
        } catch (error) {
          console.error('Error al eliminar la receta:', error)
        }
      }
    }

    const editarReceta = (id) => {
      router.push(`/editar-receta/${id}`)
    }

    const formatFecha = (fecha) => {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
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
      totalRecetas,
      recetasOrdenadas,
      eliminarReceta,
      editarReceta,
      formatFecha,
      getDificultadClass,
      cargando
    }
  }
}
</script>

<style scoped>
.lista-recetas {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.recetas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.receta-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.receta-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.receta-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.receta-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
  flex-grow: 1;
}

.dificultad {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.dificultad.facil {
  background-color: #e6f7e6;
  color: #2e7d32;
}

.dificultad.media {
  background-color: #fff8e1;
  color: #f57f17;
}

.dificultad.dificil {
  background-color: #ffebee;
  color: #c62828;
}

.receta-tiempo {
  display: flex;
  gap: 1rem;
  color: #666;
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

p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0.5rem 0 0;
  white-space: pre-line;
}

.receta-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-editar {
  background-color: #4a90e2;
  color: white;
}

.btn-editar:hover {
  background-color: #3a7bc8;
}

.btn-eliminar {
  background-color: #ff6b6b;
  color: white;
}

.btn-eliminar:hover {
  background-color: #ff5252;
}

.cargando {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.sin-recetas {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

@media (max-width: 768px) {
  .recetas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
