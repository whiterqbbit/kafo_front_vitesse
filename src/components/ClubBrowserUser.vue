<template>
  <div class="max-h-30 flex flex-wrap justify-between gap-2 overflow-auto border border-1 border-cafe-400 rounded-lg px-1 py-2">
    <div
      v-for="club in filtered_clubs"
      :key="club.uuid || 'fallback'"
      class="pastille cursor-pointer bg-cafe-400 text-white hover:bg-grass-500 hover:font-bold"
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

  if (!clubs.value) return []
  const available_clubs = clubs.value.filter(club => is_not_selected(club))

  if (props.search_input) {
    const filtered_results = searchResults.value?.map(result => result.item)

    return filtered_results?.filter(club => is_not_selected(club))
  } else {
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
