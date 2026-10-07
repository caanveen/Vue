<script setup>
import { ref } from 'vue'
import { useTareas } from '@/composables/useTareas'

// Obtenemos todo del composable
const { tareas, cargando, agregarTarea, alternarTarea, eliminarTarea } = useTareas()

const nuevoTexto = ref('')

async function manejarSubmit() {
  if (!nuevoTexto.value.trim()) return
  await agregarTarea(nuevoTexto.value)
  nuevoTexto.value = '' // limpiar input
}
</script>

<template>
  <div class="tareas">
    <h1>📋 Mis Tareas</h1>

    <!-- Formulario para agregar -->
    <form @submit.prevent="manejarSubmit">
      <input 
        v-model="nuevoTexto" 
        type="text" 
        placeholder="Nueva tarea..."
      />
      <button type="submit">Agregar</button>
    </form>

    <!-- Estado de carga -->
    <p v-if="cargando">Cargando tareas...</p>

    <!-- Lista de tareas -->
    <ul v-else>
      <li v-for="tarea in tareas" :key="tarea.id">
        <span 
          :class="{ completada: tarea.completada }"
          @click="alternarTarea(tarea)"
        >
          {{ tarea.texto }}
        </span>
        <button @click="eliminarTarea(tarea.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.completada {
  text-decoration: line-through;
  opacity: 0.5;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
</style>