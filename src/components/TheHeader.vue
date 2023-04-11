<template>
  <header h-35px w-full flex flex-row place-items-center justify-between bg-cafe-500 md:h-50px>
    <RouterLink icon-btn to="/" title="home">
      <img :src="logo" alt="logo" class="h-9 pl-4 md:h-12">
    </RouterLink>
    <nav flex gap-5 font-black text-white>
      <RouterLink to="/FAQ" title="FAQ">
        FAQ
      </RouterLink>
      <RouterLink to="/contact" title="contact">
        Contact
      </RouterLink>
      <RouterLink to="/a-propos" title="a-propos">
        A Propos
      </RouterLink>
    </nav>
    <div v-if="!user.is_auth" btn @click="toggle_login">
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
function toggle_login() {
  display.login_modal = !display.login_modal
}
</script>
