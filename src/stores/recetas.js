import { defineStore } from 'pinia'

// Función para cargar las recetas del localStorage de forma segura
const cargarRecetasGuardadas = () => {
  try {
    const recetasGuardadas = localStorage.getItem('recetas')
    if (!recetasGuardadas) return []
    
    const recetas = JSON.parse(recetasGuardadas)
    // Validar que sea un array
    return Array.isArray(recetas) ? recetas : []
  } catch (error) {
    console.error('Error al cargar las recetas:', error)
    return []
  }
}

export const useRecetasStore = defineStore('recetas', {
  state: () => ({
    recetas: cargarRecetasGuardadas()
  }),
  
  actions: {
    agregarReceta(receta) {
      if (!receta || typeof receta !== 'object') {
        console.error('La receta debe ser un objeto válido')
        return false
      }
      
      // Asegurarse de que la receta tenga un ID
      const recetaConId = {
        id: Date.now(),
        nombre: receta.nombre || 'Receta sin nombre',
        ingredientes: receta.ingredientes || '',
        instrucciones: receta.instrucciones || '',
        tiempo: Number(receta.tiempo) || 30,
        dificultad: ['Fácil', 'Media', 'Difícil'].includes(receta.dificultad) 
          ? receta.dificultad 
          : 'Media',
        fecha: receta.fecha || new Date().toISOString().split('T')[0]
      }
      
      this.recetas.push(recetaConId)
      this.guardarEnLocalStorage()
      return true
    },
    
    eliminarReceta(id) {
      if (id === undefined || id === null) {
        console.error('Se requiere un ID válido para eliminar una receta')
        return false
      }
      
      const cantidadInicial = this.recetas.length
      this.recetas = this.recetas.filter(receta => receta.id !== id)
      
      if (this.recetas.length < cantidadInicial) {
        this.guardarEnLocalStorage()
        return true
      }
      
      return false
    },
    
    guardarEnLocalStorage() {
      try {
        localStorage.setItem('recetas', JSON.stringify(this.recetas))
      } catch (error) {
        console.error('Error al guardar las recetas:', error)
      }
    }
  },
  
  getters: {
    totalRecetas: (state) => state.recetas.length,
    
    recetasOrdenadas: (state) => {
      if (!Array.isArray(state.recetas)) return []
      
      return [...state.recetas].sort((a, b) => {
        const nombreA = String(a.nombre || '').toLowerCase()
        const nombreB = String(b.nombre || '').toLowerCase()
        return nombreA.localeCompare(nombreB)
      })
    }
  }
})
