<template>
  <div class="fixed z-30 h-full w-full flex place-content-center place-items-center">
    <!-- Backdrop -->
    <div class="fixed h-full w-full cursor-pointer bg-cafe-600/50" @click="close_modal" />
    <!-- Main Div -->
    <div class="relative m-2 h-fit max-w-120 w-full flex flex-col rounded-xl bg-cafe-100 p-5 sm:m-3 sm:p-10">
      <!-- Félicitation -->
      <button class="absolute right-5 top-5 z-90 rounded-3xl hover:scale-105" icon="pi pi-times" @click="close_modal">
        <img :src="svg_close">
      </button>
      <div v-if="user.is_auth" class="flex flex-col gap-4">
        <div class="flex flex-col items-center gap-3">
          <div class="mb-5 text-xl font-bold">
            Félicitations
          </div>
          <div class="flex justify-center gap-4">
            <img :src="user.pic_xsmall ? user.pic_xsmall : default_user_pic" alt="avatar" class="h-12 w-12 rounded-xl">
            <div class="w-3/4">
              Vous êtes connecté en tant que {{ user.email }}
            </div>
          </div>
        </div>
        <button class="mt-4 btn-grass-full" @click="close_modal">
          Merci
        </button>
      </div>

      <!-- Connexion -->
      <div v-else-if="!is_signup" class="flex flex-col place-items-center gap-3">
        <div class="mb-5 text-center text-2xl font-bold">
          Se connecter
        </div>
        <!-- LinkedIn -->
        <button
          class="group w-full flex font-semibold btn-cafe"
          @click="linkedin_login"
        >
          <span>Se connecter avec Linked</span>
          <img :src="svg_linkedin" alt="linkedin_icon" class="ml-0.5 h-4 place-self-center">
        </button>
        <!-- Ligne de séparation -->
        <div class="w-1/2 flex place-self-center border-b-2 border-cafe-600 text-center" />
        <!-- Login Form -->
        <form v-if="!user.is_auth" class="w-full flex flex-col gap-3" @submit.prevent="login_user(login_form.email, login_form.password)">
          <div class="flex flex-col gap-3 text-cafe-600">
            <input v-model="login_form.email" type="email" placeholder="Email" class="w-full input_field">
            <input v-model="login_form.password" type="password" placeholder="Password" class="w-full input_field">
          </div>
          <button type="submit" class="w-full font-semibold btn-cafe-light">
            Se connecter par mail
          </button>
          <!-- Erreur -->
          <div v-if="display_error" class="text-center text-sm text-red-500">
            {{ display_error }}
          </div>
          <a class="w-fit flex cursor-pointer place-self-center text-sm underline hover:no-underline">
            Mot de passe oublié
          </a>
          <div class="w-fit flex place-self-center text-sm">
            Vous n'avez pas de compte ?
            <div class="ml-1 w-fit flex cursor-pointer place-self-center text-sm underline hover:no-underline" @click="is_signup = true">
              Créez un compte
            </div>
          </div>
        </form>
      </div>

      <!-- Signup -->
      <div v-else class="w-full flex flex-col place-items-center gap-3">
        <form v-if="!user.is_auth" class="w-full flex flex-col gap-3" @submit.prevent="signup_user(signup_form)">
          <div class="mb-5 text-center text-2xl font-bold">
            Inscription
          </div>
          <div class="flex flex-col gap-3 text-cafe-600">
            <div class="flex flex-col gap-3">
              <div class="flex gap-3">
                <input v-model="signup_form.name" type="text" placeholder="Nom" class="w-full input_field">
                <input v-model="signup_form.first_name" type="text" placeholder="Prénom" class="w-full input_field">
              </div>
              <input v-model="signup_form.job_title" type="text" placeholder="Intitulé de votre poste" class="w-full input_field">
              <textarea v-model="signup_form.bio" spellcheck placeholder="Bio" class="w-full input_field" />
              <input v-model="signup_form.email" type="email" placeholder="Email" class="w-full input_field">
              <input v-model="signup_form.password" type="password" placeholder="Mot de passe" class="w-full input_field">
            </div>
            <button btn-cafe type="submit" class="mt-4 w-full font-bold">
              S'inscrire
            </button>
            <div class="w-fit flex place-self-center text-sm">
              Vous avez déjà un compte
              <div class="ml-1 w-fit flex cursor-pointer place-self-center text-sm underline hover:no-underline" @click="is_signup = false">
                Se connecter
              </div>
            </div>
            <!-- Erreur -->
            <div v-if="display_error" class="text-sm text-red-500">
              {{ display_error }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_user_store } from '@/stores/user'
import svg_linkedin from '@/assets/svg/icon/linkedin_logo.svg'
import svg_close from '@/assets/svg/icon/MingcuteCloseFill.svg'
import default_user_pic from '@/assets/img/Profil3.png'

const user = use_user_store()
const is_signup = ref(false)
const display_error = ref('')

async function signup_user(form: { name: string; first_name: string; job_title: string; bio: string; email: string; password: string }) {
  try {
    await user.signup(form)
  } catch (error) {
    const typed_error = error as Error
    switch (typed_error.message) {
      case 'Missing param: nom_de_famille':
        display_error.value = 'Veuillez entrer un nom de famille.'
        break
      case 'This account is already in use.':
        display_error.value = 'Ce compte est déjà utilisé.'
        break
      case 'Missing param: field_value':
        display_error.value = 'Veuillez remplir tous les champs.'
        break
      case 'Input does not meet minimum length requirement of 8 characters':
        display_error.value = 'Le mot de passe doit contenir 8 caractères minimum.'
        break
      case 'Weak password detected. Please use at least 1 numbers.':
        display_error.value = 'Le mot de passe est trop faible, veuillez entrer au moins un chiffre.'
        break
      default:
        display_error.value = typed_error.message
    }
  }
}

async function login_user(email: string, password: string) {
  try {
    await user.login(email, password)
  } catch (error) {
    const typed_error = error as Error
    switch (typed_error.message) {
      case 'Invalid Credentials.':
        display_error.value = 'Identifiants incorects.'
        break
      case 'Missing param: password':
        display_error.value = 'Veuillez entrer un mot de passe.'
        break
      case 'Missing param: field_value':
        display_error.value = 'Veuillez remplir tous les champs.'
        break
      default:
        display_error.value = typed_error.message
    }
  }
}

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

const signup_form = ref({
  name: '',
  first_name: '',
  job_title: '',
  bio: '',
  email: '',
  password: '',
})
</script>
