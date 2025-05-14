<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
      <div class="flex items-center justify-between mb-6">
        <button @click="goBack" class="text-blue-600 hover:underline dark:text-blue-400">
          Voltar
        </button>
      </div>
      <h2 class="text-2xl font-bold text-center">Cadastrar Meta</h2>
      <form @submit.prevent="handleRegisterGoal" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium">Título</label>
          <input
            id="title"
            type="text"
            v-model="title"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Digite o título da meta"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium">Descrição</label>
          <textarea
            id="description"
            v-model="description"
            rows="3"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Descreva a meta"
          ></textarea>
        </div>
        <div>
          <label for="deadline" class="block text-sm font-medium">Deadline</label>
          <input
            id="deadline"
            type="date"
            v-model="deadline"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Salvar Meta
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GoalService } from '@/services/apiService'

defineOptions({
  name: 'RegisterGoalView',
})

const router = useRouter()

const title = ref('')
const description = ref('')
const deadline = ref('')
const satisfaction = ref(0)

// Verificar autenticação antes de acessar a página
if (!localStorage.getItem('goals:token')) {
  router.push('/signin') // Redirecionar para a página de login se não estiver autenticado
}

async function handleRegisterGoal() {
  try {
    const goal = {
      title: title.value,
      description: description.value,
      deadline: deadline.value,
      thermalSensation: satisfaction.value,
    }
    const response = await GoalService.createGoal(goal)

    router.push('/') // Redirecionar para a página inicial após salvar a meta
  } catch (error) {
    console.error('Erro ao cadastrar meta:', error)
    // Exibir mensagem de erro para o usuário
  }
}

function goBack() {
  router.push('/')
}
</script>
