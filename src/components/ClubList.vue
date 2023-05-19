<template>
  <div v-if="selected_clubs" class="flex flex-wrap gap-2">
    <div
      v-for="club in selected_clubs"
      :key="club.uuid || 'fallback'"
      class="w-fit cursor-pointer rounded-full bg-grass-500 px-2 py-0.5 text-sm text-white"
      @click="toggle_selected_club(club)"
    >
      {{ club.nom }}
    </div>
  </div>
  <div class="max-h-30 flex flex-wrap justify-between gap-2 overflow-auto rounded-lg px-1 py-2">
    <div
      v-for="club in filtered_clubs"
      :key="club.uuid || 'fallback'"
      class="cursor-pointer rounded-full bg-cafe-500 px-2 py-0.5 text-sm text-white"
      @click="toggle_selected_club(club)"
    >
      {{ club.nom }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
import type { Club } from '@/stores/xano.d.ts'

const props = defineProps<{
  search_input: string
}>()

const clubs = computed(() => use_club_store().db_filtered)
const selected_clubs: Ref<Club[] | []> = ref([])
const searchResults: Ref<{ item: Club }[] | null> = ref(null)
filters.value.clubs_selected_uuids = selected_clubs.value.map(club => club.uuid)

watch(
  () => props.search_input,
  (search_input) => {
    const { results } = useFuse(search_input, clubs, { fuseOptions: { keys: ['nom'] } })
    searchResults.value = results.value
  },
  { immediate: true },
)

const filtered_clubs = computed(() => {
  function is_not_selected(club: Club) {
    return !selected_clubs.value.some(selected => selected.uuid === club.uuid)
  }

  // Filters available clubs that are not selected
  const available_clubs = clubs.value.filter(club => is_not_selected(club))

  // If there is a search input, filter the results based on the search
  if (props.search_input) {
    // Map the search results to an array of items
    const filtered_results = searchResults.value?.map(result => result.item)

    // Return the filtered results if the club is not selected
    return filtered_results?.filter(club => is_not_selected(club))
  } else {
    // Return available clubs if there is no search input
    return available_clubs
  }
})

function toggle_selected_club(club: Club) {
  if (!selected_clubs.value.some(selected_club => selected_club.uuid === club.uuid)) {
    selected_clubs.value = [...selected_clubs.value, club]
  } else {
    selected_clubs.value = selected_clubs.value.filter(selected_club => selected_club.uuid !== club.uuid)
  }
  filters.value.clubs_selected_uuids = selected_clubs.value.map(club => club.uuid)
}
</script>
