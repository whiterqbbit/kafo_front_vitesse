<template>
  <header class="h-45px w-full flex flex-row items-center justify-between bg-cafe-600">
    <RouterLink to="/">
      <img :src="logo" alt="logo" class="h-fit w-26 pl-4">
    </RouterLink>

    <!-- Barre de recherche -->
    <div class="relative">
      <div class="flex items-center">
        <i class="pi pi-search" />
        <InputText v-model="search_string" placeholder="Rechercher" />
      </div>
      <Listbox
        v-if="search_results"
        v-model="selected_result" :options="search_results" option-label="name"
        class="absolute top-full z-20 mt-1 w-full"
      />
    </div>

    <!-- Bouton filtre -->
    <button i-fa6-solid-sliders class="h-10 text-white" @click="display.filter_modal = !display.filter_modal" />

    <!-- Burger -->
    <div ref="parentMenuContainer" class="relative">
      <button class="focus:outline-none" aria-haspopup="true" :aria-expanded="display_menu" @click="display_menu = !display_menu">
        <img :src="hamburger" alt="hamburger" class="h-8 w-8">
      </button>
      <div
        v-if="display_menu"
        class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
      >
        <div class="py-1" role="none">
          <div v-if="!user_store.is_auth">
            <button
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem" tabindex="-1" @click="display.login_modal = !display.login_modal"
            >
              Login
            </button>
          </div>
          <div v-else>
            <button
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem" tabindex="-1" @click="user_store.logout"
            >
              Logout
            </button>
            <button
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem" tabindex="-1" @click="display_modal('profile')"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <LoginModal v-if="display.login_modal" />
  <ProfileModal v-if="display.profile_modal" />
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'
import hamburger from '@/assets/img/icons/hamburger.svg'
import type { Feature, Suggestion } from '@/stores/mapbox.d'

const user_store = use_user_store()
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
  search_results.value = await utils_store.mapbox_search_suggest(new_value)
})

watch (selected_result, (new_value) => {
  if (new_value !== null) {
    click_suggestion(new_value)
  }
})

const display_menu = ref(false)
const parentMenuContainer = ref(null)
onClickOutside(toRef(parentMenuContainer, 'value'), () => display_menu.value = false)

function display_modal(modal_name: string) {
  switch (modal_name) {
    case 'profile':
      reset_display()
      display.profile_modal = true
      break
  }
  display_menu.value = false
}

async function click_suggestion(suggestion: Suggestion) {
  search_string.value = ''
  search_results.value = null
  const retrieve_results: Feature[] = await utils_store.mapbox_search_retrieve(suggestion.mapbox_id)
  const coordinates = retrieve_results[0].geometry.coordinates
  map_store.move_map_to([coordinates[1], coordinates[0]])
}
</script>
