<template>
  <div h-full rounded-3xl bg-cafe-300 p-12 text-xl>
    KIKOU here are the login buttons
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
    <Button class="fixed right-4 top-4" icon="pi pi-times" severity="danger" text raised rounded aria-label="Close" @click="close_modal" />
    <div h-20 bg-pink-200 p-4>
      LINKEDIN
      <button btn @click="linkedin_login">
        Login with LinkedIn
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_user_store } from '@/stores/user'

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
