<template>
  <div class="flex flex-wrap justify-between gap-2 px-1 py-2">
    <div
      v-for="club in filtered_clubs"
      :key="club.id || 'fallback'"
      class="rounded-full bg-cafe-500 px-2 py-0.5 text-sm text-white"
    >
      {{ club.nom }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
import type { Club } from '@/stores/xano.d.ts'

const props = defineProps<{
  clubs: Club[]
  search_input: string
}>()

const searchResults: Ref<{ item: Club }[] | null> = ref(null)

watch(
  () => props.search_input,
  (search_input) => {
    const { results } = useFuse(search_input, props.clubs, { fuseOptions: { keys: ['nom'] } })
    searchResults.value = results.value
  },
  { immediate: true },
)

const filtered_clubs = computed(() => {
  return props.search_input ? searchResults?.value?.map(result => result.item) : props.clubs
})
</script>
