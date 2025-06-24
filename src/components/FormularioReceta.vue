<template>
  <div class="formulario-receta">
    <h2>Agregar Nueva Receta</h2>
    <form @submit.prevent="agregarReceta">
      <div class="form-group">
        <label for="nombre">Nombre de la receta:</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="nuevaReceta.nombre" 
          required 
          class="form-control"
          placeholder="Ej: Paella valenciana"
        >
      </div>
      
      <div class="form-group">
        <label for="ingredientes">Ingredientes:</label>
        <textarea 
          id="ingredientes" 
          v-model="nuevaReceta.ingredientes" 
          required 
          class="form-control"
          placeholder="Lista los ingredientes separados por comas"
          rows="4"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="instrucciones">Instrucciones:</label>
        <textarea 
          id="instrucciones" 
          v-model="nuevaReceta.instrucciones" 
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
          v-model.number="nuevaReceta.tiempo" 
          min="1" 
          required 
          class="form-control"
        >
      </div>
      
      <div class="form-group">
        <label for="dificultad">Dificultad:</label>
        <select 
          id="dificultad" 
          v-model="nuevaReceta.dificultad" 
          required
          class="form-control"
        >
          <option value="">Selecciona una opción</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>
      
      <button type="submit" class="btn btn-primary">Guardar Receta</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRecetasStore } from '../stores/recetas'

export default {
  name: 'FormularioReceta',
  
  setup() {
    const recetasStore = useRecetasStore()
    
    const nuevaReceta = ref({
      id: Date.now(),
      nombre: '',
      ingredientes: '',
      instrucciones: '',
      tiempo: 30,
      dificultad: '',
      fecha: new Date().toISOString().split('T')[0]
    })
    
    const agregarReceta = () => {
      recetasStore.agregarReceta({
        ...nuevaReceta.value,
        id: Date.now()
      })
      
      // Resetear el formulario
      nuevaReceta.value = {
        id: Date.now(),
        nombre: '',
        ingredientes: '',
        instrucciones: '',
        tiempo: 30,
        dificultad: '',
        fecha: new Date().toISOString().split('T')[0]
      }
      
      alert('¡Receta guardada exitosamente!')
    }
    
    return {
      nuevaReceta,
      agregarReceta
    }
  }
}
</script>

<style scoped>
.formulario-receta {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
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
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
