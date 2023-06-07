<template>
  <header class="h-45px w-full flex flex-row items-center justify-between bg-cafe-600">
    <RouterLink to="/">
      <img :src="logo" alt="logo" class="h-fit w-26 pl-4">
    </RouterLink>

    <!-- Barre de recherche -->
    <div class="relative">
      <div class="flex items-center">
        <AInput
          v-model="search_string"
          input-wrapper-classes="text-xs text-cafe-600 fill-cafe-600 rounded-xl bg-cafe-100"
          type="text"
          placeholder="Rechercher"
          prepend-inner-icon="i-bx-search"
        />
      </div>
      <div v-if="search_results" class="absolute top-full z-20 mt-1 w-full rounded-xl bg-cafe-100">
        <ACard>
          <AList
            v-model="selected_result"
            :items="search_results"
            class="text-cafe-600"
            @click="click_suggestion"
          />
        </ACard>
      </div>
    </div>

    <!-- Bouton filtre -->
    <button i-fa6-solid-sliders class="h-10 text-white" @click="display.filter_modal = !display.filter_modal" />

    <SvgSpinnersRingResize v-if="user.is_loading" class="mr-4 h-10 w-10" />
    <div v-else-if="!user.is_auth" i-ci-user-circle class="mr-2 h-8 w-8 bg-white" @click="display.login_modal = !display.login_modal" />
    <img v-else :src="user.pic_xsmall ? user.pic_xsmall : default_user_pic" alt="avatar" class="mr-4 h-10 w-10 cursor-pointer border border-cafe-100 rounded-full" @click="display_modal('profile')">
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'
import type { Feature, Suggestion } from '@/stores/mapbox.d'
import default_user_pic from '@/assets/img/default_user_pic.png'

const user = use_user_store()
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
const parentMenuContainer = ref(null)
onClickOutside(toRef(parentMenuContainer, 'value'), () => display.burger_menu = false)

function display_modal(modal_name: string) {
  switch (modal_name) {
    case 'profile':
      reset_display()
      display.profile_modal = true
      break
  }
  display.burger_menu = false
}

async function click_suggestion(suggestion: Suggestion) {
  search_string.value = ''
  search_results.value = null
  const retrieve_results: Feature[] = await utils_store.mapbox_search_retrieve(suggestion.mapbox_id)
  const coordinates = retrieve_results[0].geometry.coordinates
  map_store.move_map_to([coordinates[1], coordinates[0]])
}
</script>
