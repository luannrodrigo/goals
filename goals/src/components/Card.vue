<script setup lang="ts">
import { defineProps, defineOptions } from 'vue'
import { useRouter } from 'vue-router';

defineOptions({
  name: 'ContentCard',
})

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
});

function navigateToGoalCounter() {
  router.push({
    path: `/goal-counter/${props.id}`,
  });
}
</script>

<template>
  <div
    class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800 w-full cursor-pointer"
    @click="navigateToGoalCounter"
  >
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
      <p class="mt-1 text-xs text-gray-700 dark:text-gray-400">
        {{ description }}
      </p>
    </div>

    <div class="mt-6">
      <p class="mt-1 text-[10px] text-gray-700 dark:text-gray-400">
        Dead line <strong class="font-bold">{{ deadline }}</strong>
      </p>
    </div>
  </div>
</template>
