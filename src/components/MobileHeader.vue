<template>
  <header class="h-45px w-full flex flex-row items-center justify-between bg-cafe-600">
    <RouterLink class="icon-btn" to="/">
      <img :src="logo" alt="logo" class="h-8 pl-4">
    </RouterLink>

    <!-- bar de recherche -->
    <!-- <div class="p-input-icon-left"> -->
    <div>
      <i class="pi pi-search" />
      <InputText v-model="search_value" placeholder="Rechercher" />
    </div>
    <button i-fa6-solid-sliders class="h-10 text-white" @click="display.filter_modal = !display.filter_modal" />

    <div ref="parentMenuContainer" class="relative">
      <button class="focus:outline-none" aria-haspopup="true" :aria-expanded="display_menu" @click="toggleMenu">
        <img :src="hamburger" alt="hamburger" class="h-8 w-8">
      </button>
      <div
        v-if="display_menu"
        class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
      >
        <div class="py-1" role="none">
          <div v-if="!user.is_auth">
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
              role="menuitem" tabindex="-1" @click="user.logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <LoginModal v-if="display.login_modal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { use_user_store } from '@/stores/user'
import logo from '@/assets/img/logo/kafo_logo_white.png'
import hamburger from '@/assets/img/icons/hamburger.svg'

const search_value = ref('')
const user = use_user_store()
const display_menu = ref(false)

const parentMenuContainer = ref(null)

onClickOutside(toRef(parentMenuContainer, 'value'), () => display_menu.value = false)

function toggleMenu() {
  display_menu.value = !display_menu.value
}
</script>
