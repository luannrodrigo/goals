<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/apiService'

defineOptions({
  name: 'SignInView',
})

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleSignIn() {
  try {
    const response = await AuthService.login(email.value, password.value)
    console.log('Usuário autenticado com sucesso:', response.data)
    localStorage.setItem('goals:token', response.data.access_token) // Salvar o token no localStorage
    router.push('/') // Redirecionar para a página inicial
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error)
    // Exibir mensagem de erro para o usuário
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
      <div class="flex items-center justify-center mb-6">
        <img src="../assets/logo.svg" alt="Logo" class="h-12" />
      </div>
      <h2 class="text-2xl font-bold text-center">Bem-vindo de volta</h2>
      <form @submit.prevent="handleSignIn" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium">Senha</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Entrar
        </button>
      </form>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Não tem uma conta?
        <a href="/signup" class="text-blue-600 hover:underline dark:text-blue-400">Cadastre-se</a>
      </p>
    </div>
  </div>
</template>
