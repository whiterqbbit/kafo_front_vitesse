<template>
  <header h-35px w-full flex flex-row place-items-center justify-between bg-cafe-500>
    <RouterLink class="icon-btn" to="/">
      <img :src="logo" alt="logo" class="h-8 pl-4">
    </RouterLink>
    <div v-if="!user.is_auth" btn @click="display.login_modal = !display.login_modal">
      Login
    </div>
    <div v-else flex>
      <img :src="user.pic_xsmall" alt="avatar" class="h-12 w-12 border border-cafe-100 rounded-full">
      <button btn @click="user.logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_light.png'
import { use_user_store } from '@/stores/user'

const user = use_user_store()
</script>
