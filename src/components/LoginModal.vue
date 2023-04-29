<template>
  <!-- back drop -->
  <div class="fixed z-30 h-full w-full bg-cafe-200">
    <!-- main div -->
    <div class="relative h-fit w-full flex flex-col gap-3 bg-cafe-100 p-10">
      <Button class="absolute rounded-3xl -right-90" icon="pi pi-times" @click="close_modal" />
      <div class="text-center font-bold text-xl">
        Connectez-vous
      </div>

      <form v-if="!user.is_auth" class="flex flex-col gap-2" @submit.prevent="user.login(form.email, form.password)">
        <input v-model="form.email" type="email" placeholder="email">
        <input v-model="form.password" type="password" placeholder="password">
        <button btn type="submit">
          Login
        </button>
      </form>

      <div v-else>
        <div>
          You are logged in as {{ user.email }}
        </div>
        <img :src="user.pic_xsmall" alt="avatar" class="h-12 w-12">
        <button btn @click="user.logout">
          Logout
        </button>
      </div>

      <div class="h-20 p-4">
        <button btn class="flex items-center" @click="linkedin_login">
          Login with Linked<img :src="linkedin_logo" alt="linkedin_icon" class="h-4 w-4">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_user_store } from '@/stores/user'
import linkedin_logo from '@/assets/svg/icon/linkedin_logo.svg'

const user = use_user_store()

function close_modal() {
  display.login_modal = false
}

async function linkedin_login() {
  const link = await user.linkedin_init()
  window.open(link, '_blank')
  close_modal()
}

const form = ref({
  username: '',
  email: '',
  password: '',
})
</script>
