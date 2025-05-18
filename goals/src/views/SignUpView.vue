<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '@/services/apiService'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'CollaboratorSignUpView',
})

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

async function handleSignUp() {
  try {
    const response = await AuthService.register(name.value, email.value, password.value)

    // Redirecionar para a página de login
    router.push('/signin')
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    // Exibir mensagem de erro para o usuário
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
      <div class="flex items-center justify-center mb-6">
        <img src="../assets/logo.svg" alt="Logo" class="h-16" />
      </div>
      <h2 class="text-2xl font-bold text-center">Cadastro de usuário</h2>
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Nome</label>
          <input
            id="name"
            type="text"
            v-model="name"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium">Senha</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cadastrar
        </button>
      </form>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Já tem uma conta?
        <a href="/signin" class="text-blue-600 hover:underline dark:text-blue-400">Entrar</a>
      </p>
    </div>
  </div>
</template>
