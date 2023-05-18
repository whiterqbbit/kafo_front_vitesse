<template>
  <div class="max-h-30 flex flex-wrap justify-between gap-2 overflow-auto border border-1 border-cafe-400 rounded-lg px-1 py-2">
    <div
      v-for="club in filtered_clubs"
      :key="club.uuid || 'fallback'"
      class="cursor-pointer rounded-full bg-cafe-400 px-2 py-0.5 text-sm text-white hover:bg-grass-500 hover:font-bold"
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

const user_store = use_user_store()

const clubs = computed(() => use_club_store().db || [])
const searchResults: Ref<{ item: Club }[] | null> = ref(null)
user_store.clubs = user_store.clubs || []

watch(
  () => props.search_input,
  (search_input) => {
    if (!clubs) return
    const { results } = useFuse(search_input, clubs, { fuseOptions: { keys: ['nom'] } })
    searchResults.value = results.value
  },
  { immediate: true },
)

const filtered_clubs = computed(() => {
  function is_not_selected(club: Club) {
    return !user_store.clubs.some(selected => selected.uuid === club.uuid)
  }

  // Filters available clubs that are not selected
  if (!clubs.value) return []
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
  if (!user_store.clubs.some(selected_club => selected_club.uuid === club.uuid)) {
    user_store.add_club(club)
  } else {
    user_store.remove_club(club)
  }
}
</script>
