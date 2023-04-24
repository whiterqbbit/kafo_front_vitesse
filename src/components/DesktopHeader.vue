<template>
  <header sticky top-0 z-50 h-50px w-full flex flex-row place-items-center justify-between bg-cafe-600>
    <RouterLink class="icon-btn" to="/landing">
      <img :src="logo" alt="logo" class="h-12 pl-4">
    </RouterLink>
    <nav flex gap-5 font-black text-white>
      <InputSwitch v-model="preferences.offline_mode" @click="use_coffee_store().fetch_db()">
        Offline
      </InputSwitch>
      <button @click="display.debug_modal = !display.debug_modal">
        Debug
      </button>
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
import logo from '@/assets/img/logo/kafo_logo_white.png'
import { use_user_store } from '@/stores/user'

const user = use_user_store()
</script>
