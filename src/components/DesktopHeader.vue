<template>
  <header h-35px w-full flex flex-row place-items-center justify-between bg-cafe-500 md:h-50px>
    <RouterLink class="icon-btn" to="/">
      <img :src="logo" alt="logo" class="h-9 pl-4 md:h-12">
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
import logo from '@/assets/img/logo/kafo_logo_light.png'
import { use_user_store } from '@/stores/user'

const user = use_user_store()
</script>
