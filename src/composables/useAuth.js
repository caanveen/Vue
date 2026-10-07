import { ref } from 'vue'
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

// ⚠️ FUERA de la función: son estado GLOBAL de toda la app
const usuario = ref(null)      // null = no logueado
const verificando = ref(true)  // true = aún no sabemos si hay sesión

// El "onSnapshot del usuario": canal permanente con Firebase Auth
onAuthStateChanged(auth, (user) => {
  usuario.value = user
  verificando.value = false
})

export function useAuth() {

  async function registrar(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
  }

  return { usuario, verificando, registrar, login, logout }
}