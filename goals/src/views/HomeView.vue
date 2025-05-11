<template>
  <div class="p-4">
    <div class="flex flex-col items-center justify-center">
      <div class="flex items-center justify-between w-full mb-8">
        <span class="text-2xl font-bold">Não Desista</span>
        <img src="../assets/logo.svg" alt="Logo" class="h-8" />
      </div>

      <div class="w-full">
        <h1 class="text-2xl font-bold">{{ goals.length }} Desafios</h1>
        <h2 class="text-base text-gray-600">Você é uma pessoa ambiciosa, não é?</h2>
      </div>

      <div class="flex overflow-x-auto w-full py-6 gap-2">
        <Card
          v-for="goal in goals"
          :key="goal.id"
          :title="goal.title"
          :description="goal.description"
          additionalText="Dead line"
          :deadline="goal.deadline"
        />
      </div>

      <div class="w-full">
        <h1 class="text-2xl font-bold">Planejado para hoje</h1>
        <h2 class="text-base text-gray-600">Você tem {{ goals.length }} metas</h2>
      </div>

      <div class="w-full flex justify-end mt-4">
        <button
          @click="navigateToRegisterGoals"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registrar Nova Meta
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2 w-full py-4">
      <ExpandableCard
        v-for="goal in goals"
        :key="goal.id"
        :deadline="goal.deadline"
        :subTitle="goal.description"
        :title="goal.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpandableCard from '@/components/ExpandableCard.vue'
import Card from '@/components/Card.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GoalService } from '@/services/apiService'
import { format } from 'date-fns'

const router = useRouter()
const goals = ref<{ id: string; title: string; description: string; deadline: string }[]>([])

async function fetchGoals() {
  try {
    const response = await GoalService.getGoals()
    console.log('Metas:', response.data)
    goals.value = response.data.map(
      (goal: { id: string; title: string; description: string; deadline: string }) => ({
        ...goal,
        deadline: format(new Date(goal.deadline), 'dd/MM/yyyy HH:mm'), // Formata a deadline
      }),
    )
  } catch (err) {
    const error = err as { response?: { status: number } }
    console.error('Erro ao buscar metas:', error)
    // Redirecionar para a página de login se o token for inválido ou expirado
    if (error.response && error.response.status === 401) {
      router.push('/signin')
    }
  }
}

// Verificar autenticação antes de acessar a página
if (!localStorage.getItem('goals:token')) {
  router.push('/signin') // Redirecionar para a página de login se não estiver autenticado
}

function navigateToRegisterGoals() {
  router.push('/register-goals')
}

onMounted(() => {
  fetchGoals()
})
</script>
