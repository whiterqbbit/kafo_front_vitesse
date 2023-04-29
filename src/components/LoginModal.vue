<template>
  <!-- back drop -->
  <div class="fixed z-30 h-full w-full flex place-content-center place-items-center">
    <div class="fixed h-full w-full cursor-pointer bg-cafe-600/50" @click="close_modal" />
    <!-- main div -->
    <div class="relative m-3 h-fit max-w-120 w-full flex flex-col rounded-xl bg-cafe-100 p-10">
      <!-- Connexion -->
      <div v-if="!is_creating" class="flex flex-col place-items-center gap-3">
        <button class="absolute right-10 top-5 z-90 rounded-3xl hover:scale-105" icon="pi pi-times" @click="close_modal">
          <img :src="svg_close">
        </button>
        <div class="text-center font-bold text-xl">
          Bienvenu.e
        </div>
        <div class="mb-5 text-center">
          Veuillez entrer vos informations.
        </div>
        <!-- Linkedin -->
        <button
          v-if="!user.is_auth"
          class="group h-fit w-full flex place-content-center border border-1 border-cafe-400 rounded-lg p-x-4 py-1 pt-1.5 hover:(border-grass-500 text-grass-500)"
          @click="linkedin_login"
        >
          <span>Linked</span>
          <img :src="svg_linkedin" alt="linkedin_icon" class="mt-0.5 h-4 group-hover:hidden">
          <img :src="svg_linkedin_hover" alt="linkedin_icon_hover" class="mt-0.5 hidden h-4 group-hover:flex">
        </button>
        <!-- ligne de séparation -->
        <div class="w-1/2 flex place-self-center border-b-2 border-cafe-600 text-center" />
        <!-- login login_form -->
        <form v-if="!user.is_auth" class="w-full flex flex-col gap-3" @submit.prevent="user.login(login_form.email, login_form.password)">
          <div class="flex flex-col gap-3 text-cafe-600">
            <input v-model="login_form.email" type="email" placeholder="Email" class="input_text">
            <input v-model="login_form.password" type="password" placeholder="Password" class="input_text">
          </div>
          <button btn type="submit" class="font-bold">
            Login
          </button>
          <a class="w-fit flex cursor-pointer place-self-center underline text-sm hover:no-underline">
            Mot de passe oublié
          </a>
          <div class="w-fit flex cursor-pointer place-self-center text-sm">
            Vous n'avez pas de compte ?
            <div class="ml-1 w-fit flex cursor-pointer place-self-center underline text-sm hover:no-underline" @click="is_creating = true">
              Créez un compte
            </div>
          </div>
        </form>
        <div v-else>
          <div>
            Vous connecté en tant que {{ user.email }}
          </div>
          <img :src="user.pic_xsmall" alt="avatar" class="h-12 w-12">
          <button btn @click="user.logout">
            Logout
          </button>
        </div>
      </div>
      <div v-else class="w-full flex flex-col place-items-center gap-3">
        <form v-if="!user.is_auth" class="w-full flex flex-col gap-3" @submit.prevent="user.signin(signin_form)">
          <span class="w-fit border border-cafe-400 rounded-lg bg-cafe-50 p-1">retour</span>
          <div class="flex flex-col gap-3 text-cafe-600">
            <div class="flex gap-3">
              <div class="flex flex-col gap-1">
                <div>Nom</div>
                <input v-model="signin_form.name" type="text" placeholder="Entrez votre nom" class="input_text">
              </div>
              <div class="flex flex-col gap-1">
                <div>Prénom</div>
                <input v-model="signin_form.first_name" type="text" placeholder="Entrez votre prénom" class="input_text">
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div>Intitulé de poste</div>
              <input v-model="signin_form.job_title" type="text" placeholder="Entrez votre intitulé de votre poste" class="input_text">
            </div>
            <div class="flex flex-col gap-1">
              <div>Bio</div>
              <textarea v-model="signin_form.bio" spellcheck placeholder="Entrez votre bio" class="input_text" />
            </div>
            <div class="flex flex-col gap-1">
              <div>Email</div>
              <input v-model="signin_form.email" type="email" placeholder="Entrez votre email" class="input_text">
            </div>
            <div class="flex flex-col gap-1">
              <div>Mot de passe</div>
              <input v-model="signin_form.password" type="password" placeholder="Entrez votre mot de passe" class="input_text">
            </div>
          </div>
          <button btn type="submit" class="mt-7 h-15 font-bold">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_user_store } from '@/stores/user'
import svg_linkedin from '@/assets/svg/icon/linkedin_logo.svg'
import svg_linkedin_hover from '@/assets/svg/icon/linkedin_logo_hover.svg'
import svg_close from '@/assets/svg/icon/MingcuteCloseFill.svg'

const user = use_user_store()
const is_creating = ref(false)

function close_modal() {
  display.login_modal = false
}

async function linkedin_login() {
  const link = await user.linkedin_init()
  window.open(link, '_blank')
  close_modal()
}

const login_form = ref({
  username: '',
  email: '',
  password: '',
})

const signin_form = ref({
  username: '',
  name: '',
  first_name: '',
  job_title: '',
  bio: '',
  email: '',
  password: '',
})
</script>

<style scoped>
.input_text{
  @apply border border-cafe-400 rounded-xl p-2 placeholder-cafe-400 w-full
}
</style>
