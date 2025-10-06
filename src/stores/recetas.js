import { defineStore } from 'pinia'
import { obtenerRecetas, guardarRecetas } from '@/services/recetasService'

export const useRecetasStore = defineStore('recetas', {
  state: () => ({
    recetas: [],
    cargando: false,
    error: null
  }),

  actions: {
    async cargarRecetas() {
      this.cargando = true
      this.error = null
      try {
        const recetas = await obtenerRecetas()
        this.recetas = Array.isArray(recetas) ? recetas : []
      } catch (error) {
        this.error = 'Error al cargar recetas'
        this.recetas = []
      } finally {
        this.cargando = false
      }
    },

    async agregarReceta(receta) {
      if (!receta || typeof receta !== 'object') {
        this.error = 'La receta debe ser un objeto válido'
        return false
      }
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
      await this.guardarRecetasBackend()
      return true
    },

    async eliminarReceta(id) {
      if (id === undefined || id === null) {
        this.error = 'Se requiere un ID válido para eliminar una receta'
        return false
      }
      const cantidadInicial = this.recetas.length
      this.recetas = this.recetas.filter(receta => receta.id !== id)
      if (this.recetas.length < cantidadInicial) {
        await this.guardarRecetasBackend()
        return true
      }
      return false
    },

    async guardarRecetasBackend() {
      try {
        await guardarRecetas(this.recetas)
      } catch (error) {
        console.error('Error al guardar las recetas:', error)
        throw error
      }
    }
  },

  getters: {
    totalRecetas(state) {
      return state.recetas.length;
    },
    recetasOrdenadas(state) {
      return [...state.recetas].sort((a, b) => {
        const fechaA = new Date(a.fecha.split('/').reverse().join('/'));
        const fechaB = new Date(b.fecha.split('/').reverse().join('/'));
        return fechaB - fechaA;
      });
    },
    obtenerRecetaPorId: (state) => (id) => {
      return state.recetas.find(receta => receta.id === parseInt(id));
    }
  }
  })
