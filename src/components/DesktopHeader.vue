<template>
  <header class="sticky top-0 z-50 h-50px w-full flex flex-row place-items-center justify-between bg-cafe-600">
    <RouterLink class="icon-btn" to="/">
      <img :src="logo" alt="logo" class="h-12 pl-4">
    </RouterLink>
    <!-- <span class="text-white">x{{x}} y{{y}}</span> -->
    <!-- remplacer hidden par flex pour faire apparaitre le menu -->
    <nav class="hidden gap-5 font-black text-white">
      <button @click="display.cookie_modal = !display.cookie_modal">
        Cookies
      </button>
      <RouterLink to="/FAQ">
        FAQ
      </RouterLink>
      <RouterLink to="/contact">
        Contact
      </RouterLink>
      <RouterLink to="/a-propos">
        A Propos
      </RouterLink>
    </nav>
    <div v-if="!user.is_auth" class="m-2 font-bold btn-grass" @click="display.login_modal = !display.login_modal">
      Se connecter
    </div>
    <img v-else :src="user.pic_xsmall ? user.pic_xsmall : default_user_pic" alt="avatar" class="h-12 w-12 border border-cafe-100 rounded-full" @click="display.burger_menu = !display.burger_menu">
    <div v-if="display.burger_menu" class="absolute right-0 top-[50px] flex flex-col rounded-bl-xl bg-cafe-600 p-4 font-semibold text-white">
      <div class="menu-item">
        Mon profil
      </div>
      <div class="menu-item">
        Placeholder
      </div>
      <div class="menu-item" @click="logout">
        Se déconnecter
      </div>
    </div>
  </header>
  <LoginModal v-if="display.login_modal" />
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'
import { use_user_store } from '@/stores/user'
import default_user_pic from '@/assets/img/default_user_pic.png'

const user = use_user_store()

function logout() {
  user.logout()
  display.burger_menu = false
}

const { x, y } = useMouse()
</script>

<style scoped>
.menu-item{
  @apply cursor-pointer
}
</style>
