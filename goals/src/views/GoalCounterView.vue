<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md text-center">
      <h2 class="text-2xl font-bold">Registrar Meta e Sensação Térmica</h2>
      <div>
        <h3 class="text-lg font-semibold">{{ goalTitle }}</h3>
        <p class="text-sm text-gray-600">{{ goalDescription }}</p>
      </div>
      <div class="space-y-4">
        <button
          @click="registerThermalSensation(3)"
          class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Muito Quente
        </button>
        <button
          @click="registerThermalSensation(2)"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Agradável
        </button>
        <button
          @click="registerThermalSensation(1)"
          class="w-full px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Frio
        </button>
        <button
          @click="goBack"
          class="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GoalService } from '@/services/apiService';

const route = useRoute();
const router = useRouter();
const goalId = ref(route.params.id as string);
const goalTitle = ref('');
const goalDescription = ref('');

async function fetchGoalDetails() {
  try {
    const response = await GoalService.getGoalById(goalId.value);
    goalTitle.value = response.data.title;
    goalDescription.value = response.data.description;
  } catch (error) {
    console.error('Erro ao buscar detalhes da meta:', error);
    alert('Erro ao carregar os detalhes da meta.');
    router.push('/');
  }
}

async function registerThermalSensation(value: number) {
  try {
    const record = {
      goalId: goalId.value,
      thermalSensation: value,
      date: new Date().toISOString(),
    };
    await GoalService.addThermalSensation(record);
    alert('Sensação térmica registrada com sucesso!');
    router.push('/'); // Redireciona para a página inicial após registrar
  } catch (error) {
    console.error('Erro ao registrar sensação térmica:', error);
    alert('Erro ao registrar sensação térmica.');
  }
}

function goBack() {
  router.push('/');
}

onMounted(() => {
  fetchGoalDetails();
});
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
