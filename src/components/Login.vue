<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login, registrar } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const ocupado = ref(false)

async function manejar(accion) {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Completa ambos campos'
    return
  }
  ocupado.value = true
  try {
    if (accion === 'entrar') await login(email.value, password.value)
    else await registrar(email.value, password.value)
    // 👆 NADA más. Sin redirecciones. Explicado abajo.
  } catch (e) {
    error.value = traducirError(e.code)
  } finally {
    ocupado.value = false
  }
}

function traducirError(codigo) {
  const errores = {
    'auth/invalid-credential': 'Email o contraseña incorrectos',
    'auth/email-already-in-use': 'Ese email ya está registrado',
    'auth/weak-password': 'La contraseña necesita al menos 6 caracteres',
    'auth/invalid-email': 'Email no válido',
  }
  return errores[codigo] || 'Error: ' + codigo
}
</script>

<template>
  <div class="login">
    <h1>🔐 Entrar</h1>

    <form @submit.prevent="manejar('entrar')">
      <input v-model="email" type="email" placeholder="email@ejemplo.com" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button type="submit" :disabled="ocupado">Entrar</button>
      <button type="button" :disabled="ocupado" @click="manejar('registrar')">
        Crear cuenta
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.error { color: #c0392b; }
</style>