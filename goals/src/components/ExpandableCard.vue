<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ExpandableCard',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
})

const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div
    @click="toggleExpand"
    class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
  >
    <div class="flex items-center">
      <img src="../assets/icon.svg" alt="Icon" class="h-8 w-8 mr-4" />
      <div>
        <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
        <p class="text-xs text-gray-700 dark:text-gray-400">{{ subTitle }}</p>
      </div>
    </div>

    <div v-if="isExpanded" class="mt-6">
      <hr class="border-gray-300 dark:border-gray-700 my-4" />

      <div class="flex gap-1">
        <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Dead line</p>
        <p class="text-xs text-gray-700 dark:text-gray-400">{{ deadline }}</p>
      </div>
    </div>
  </div>
</template>
