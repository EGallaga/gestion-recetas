<template>
  <div class="formulario-receta">
    <h2>{{ recetaId ? 'Editar Receta' : 'Nueva Receta' }}</h2>
    <form @submit.prevent="guardarReceta">
      <div class="form-group">
        <label for="nombre">Nombre de la receta:</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="receta.nombre" 
          required 
          class="form-control"
          placeholder="Ej: Paella valenciana"
        >
      </div>
      
      <div class="form-group">
        <label>Ingredientes:</label>
        <div class="ingredientes-input">
          <input
            type="text"
            v-model="nuevoIngrediente"
            class="form-control"
            placeholder="Escribe un ingrediente"
            @keyup.enter.prevent="agregarIngrediente"
          >
          <button 
            type="button" 
            class="btn-agregar"
            @click="agregarIngrediente"
            :disabled="!nuevoIngrediente.trim()"
            title="Añadir ingrediente"
          >
            <span>+</span>
          </button>
        </div>
        
        <div class="lista-ingredientes" v-if="receta.ingredientes.length > 0">
          <div v-for="(ingrediente, index) in receta.ingredientes" :key="index" class="ingrediente-item">
            <span>{{ ingrediente }}</span>
            <button 
              type="button" 
              class="btn-eliminar"
              @click="eliminarIngrediente(index)"
              title="Eliminar ingrediente"
            >
              <span>-</span>
            </button>
          </div>
        </div>
        <div v-else class="sin-ingredientes">
          No hay ingredientes añadidos
        </div>
      </div>
      
      <div class="form-group">
        <label for="instrucciones">Instrucciones:</label>
        <textarea 
          id="instrucciones" 
          v-model="receta.instrucciones" 
          required 
          class="form-control"
          placeholder="Describe los pasos para preparar la receta"
          rows="6"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="tiempo">Tiempo de preparación (minutos):</label>
        <input 
          type="number" 
          id="tiempo" 
          v-model.number="receta.tiempo" 
          min="1" 
          required 
          class="form-control"
        >
      </div>
      
      <div class="form-group">
        <label for="dificultad">Dificultad:</label>
        <select 
          id="dificultad" 
          v-model="receta.dificultad" 
          required 
          class="form-control"
        >
          <option value="">Selecciona una opción</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="cancelar" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">
          {{ recetaId ? 'Actualizar' : 'Guardar' }} Receta
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRecetasStore } from '@/stores/recetas';

export default {
  name: 'FormularioReceta',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const recetasStore = useRecetasStore();
    const recetaId = route.params.id;
    const nuevoIngrediente = ref('');
    
    const receta = ref({
      nombre: '',
      ingredientes: [],
      instrucciones: '',
      tiempo: 30,
      dificultad: '',
      fecha: new Date().toISOString().split('T')[0]
    });
    
    const agregarIngrediente = () => {
      if (nuevoIngrediente.value.trim()) {
        receta.value.ingredientes.push(nuevoIngrediente.value.trim());
        nuevoIngrediente.value = '';
      }
    };
    
    const eliminarIngrediente = (index) => {
      receta.value.ingredientes.splice(index, 1);
    };
    
    // Si estamos editando, cargamos la receta
    onMounted(async () => {
      if (recetaId) {
        try {
          // Primero cargamos las recetas
          await recetasStore.cargarRecetas();
          
          // Luego obtenemos la receta por su ID
          const recetaExistente = recetasStore.obtenerRecetaPorId(recetaId);
          
          if (recetaExistente) {
            // Copiamos los valores de la receta existente
            receta.value = { ...recetaExistente };
          } else {
            console.error('No se encontró la receta con ID:', recetaId);
            router.push('/');
          }
        } catch (error) {
          console.error('Error al cargar la receta:', error);
        }
      }
    });
    
    const guardarReceta = async () => {
      try {
        if (recetaId) {
          await recetasStore.actualizarReceta(parseInt(recetaId), receta.value);
        } else {
          await recetasStore.agregarReceta(receta.value);
        }
        router.push('/');
      } catch (error) {
        console.error('Error al guardar la receta:', error);
      }
    };
    
    const cancelar = () => {
      router.push('/');
    };
    
    return {
      receta,
      recetaId,
      nuevoIngrediente,
      agregarIngrediente,
      eliminarIngrediente,
      guardarReceta,
      cancelar
    };
  }
}
</script>

<style scoped>
.formulario-receta {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.ingredientes-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.btn-agregar, .btn-eliminar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-agregar:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-eliminar {
  background-color: #e74c3c;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1rem;
}

.lista-ingredientes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.ingrediente-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}

.sin-ingredientes {
  color: #6c757d;
  font-style: italic;
  margin-top: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
  margin-right: 1rem;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .formulario-receta {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn {
    width: 100%;
  }
  
  .btn-secondary {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
