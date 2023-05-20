<template>
  <div class="flex place-items-center gap-2 rounded-xl p-3 shadow-md backdrop-blur-lg">
    <div class="cursor-pointer rounded-2xl bg-cafe-100 p-1 text-cafe-500 shadow-md">
      <MaterialLocation
        class="h-10 w-10 place-self-center"
        @click="use_map_store().locate_user()"
      />
    </div>
    <span class="p-input-icon-left w-full place-self-center">
      <i class="pi pi-search" />
      <InputText v-model="search_string" placeholder="Rechercher un lieu ou une adresse" class="w-full" />
    </span>
    <div v-if="search_results" class="absolute top-full z-20 mt-1 w-full">
      <ACard>
        <AList
          v-model="selected_result"
          :items="search_results.length ? search_results : [{ title: 'Aucun résultat' }]"
          class="text-cafe-600"
          @click="click_suggestion"
        />
      </ACard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Feature, Suggestion } from '@/stores/mapbox.d'

const utils_store = use_utils_store()
const map_store = use_map_store()

const search_string = ref('')
const debounced_search = refDebounced(search_string, 400)
const search_results: Ref<Suggestion[] | null> = ref(null)
const selected_result: Ref<Suggestion | null> = ref(null)

watch(debounced_search, async (new_value) => {
  if (new_value.length < 2 || new_value === null) {
    search_results.value = null
    return
  }

  search_results.value = (await utils_store.mapbox_search_suggest(new_value)).map((result) => {
    return {
      ...result,
      title: result.name,
      subtitle: result.address,
    }
  })
})

watch (selected_result, (new_value) => {
  if (new_value !== null) {
    click_suggestion(new_value)
  }
})

async function click_suggestion(suggestion: Suggestion) {
  search_string.value = ''
  search_results.value = null
  const retrieve_results: Feature[] = await utils_store.mapbox_search_retrieve(suggestion.mapbox_id)
  const coordinates = retrieve_results[0].geometry.coordinates
  map_store.move_map_to([coordinates[1], coordinates[0]])
}
</script>
