<template>
  <div v-if="selected_clubs">
    <div 
      v-for="club in selected_clubs" 
      :key="club.id || 'fallback'"
      class="rounded-full bg-grass-500 px-2 py-0.5 text-sm text-white w-fit"
      @click="add_selected_club(club)"
    >
      {{club.nom}}
    </div>
  </div>
  <div class="flex flex-wrap justify-between gap-2 px-1 py-2 max-h-30 overflow-auto border border-1 border-cafe-400 rounded-lg">
    <div
      v-for="club in filtered_clubs"
      :key="club.id || 'fallback'"
      class="rounded-full bg-cafe-500 px-2 py-0.5 text-sm text-white"
      @click="add_selected_club(club)"
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

const clubs: Ref<Club[] | []> = ref([...props.clubs])
const selected_clubs : Ref<Club[] | []> = ref([])
const searchResults: Ref<{ item: Club }[] | null> = ref(null)

watch(
  () => props.search_input,
  (search_input) => {
    const { results } = useFuse(search_input, clubs, { fuseOptions: { keys: ['nom'] } })
    searchResults.value = results.value
  },
  { immediate: true },
)

const filtered_clubs = computed(() => {
  const excludeSelected = (club) => !selected_clubs.value.some(selected => selected.id === club.id)

  const available_clubs = clubs.value.filter(excludeSelected)

  if (props.search_input) {
    const filteredResults = searchResults.value?.map(result => result.item)
    return filteredResults.filter(excludeSelected)
  } else {
    return available_clubs;
  }
})

function add_selected_club(club: Club) {
  console.log('add_selected_club')
  if(!selected_clubs.value.some(selected_club => selected_club.id === club.id)) {
    selected_clubs.value.push(club)
  } else {
    selected_clubs.value = selected_clubs.value.filter(selected_club => selected_club.id !== club.id)
  }
}
</script>
