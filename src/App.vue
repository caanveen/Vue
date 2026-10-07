<script setup>
import { useAuth } from '@/composables/useAuth'
import ListaTareas from '@/components/ListaTareas.vue'
import Login from '@/components/Login.vue'

const { usuario, verificando, logout } = useAuth()
</script>

<template>
  <main>
    <p v-if="verificando">Verificando sesión...</p>

    <template v-else>
      <header v-if="usuario">
        <span>{{ usuario.email }}</span>
        <button @click="logout">Salir</button>
      </header>

      <ListaTareas v-if="usuario" />
      <Login v-else />
    </template>
  </main>
</template>