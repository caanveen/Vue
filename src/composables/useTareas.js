// src/composables/useTareas.js
import { ref, onUnmounted } from 'vue'
import { db } from '@/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore'

export function useTareas() {
  const tareas = ref([])
  const cargando = ref(true)
  
  // Referencia a la colección "tareas" en Firestore
  const tareasRef = collection(db, 'tareas')

  // Listener en tiempo real: se ejecuta cada vez que cambian los datos
  const unsubscribe = onSnapshot(tareasRef, (snapshot) => {
    tareas.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() // spread: copia todas las propiedades del documento
    }))
    cargando.value = false
  })

  // CRITICAL: limpiar el listener cuando el componente se destruye
  onUnmounted(() => {
    unsubscribe()
  })

  // CREATE: agregar una tarea
  async function agregarTarea(texto) {
    await addDoc(tareasRef, {
      texto: texto,
      completada: false,
      fecha: Date.now()
    })
  }

  // UPDATE: cambiar el estado de una tarea
  async function alternarTarea(tarea) {
    const tareaRef = doc(db, 'tareas', tarea.id)
    await updateDoc(tareaRef, {
      completada: !tarea.completada
    })
  }

  // DELETE: eliminar una tarea
  async function eliminarTarea(id) {
    const tareaRef = doc(db, 'tareas', id)
    await deleteDoc(tareaRef)
  }

  return { tareas, cargando, agregarTarea, alternarTarea, eliminarTarea }
}