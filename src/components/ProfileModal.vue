<template>
  <div class="fixed top-0 z-30 h-screen w-full flex flex-col place-content-center place-items-center bg-opacity-0 backdrop-blur">
    <div class="relative max-w-full w-120 flex flex-col gap-4 rounded-xl bg-cafe-200 p-2 shadow-md sm:p-3">
      <button class="absolute right-5 top-5 z-90 rounded-3xl hover:scale-105" icon="pi pi-times" @click="display.profile_modal = false">
        <img :src="svg_close">
      </button>
      <img :src="user_store.pic_small ? user_store.pic_small : default_user_pic" class="mx-auto h-40 w-40 border border-3 border-cafe-50 rounded-full shadow-md">

      <div class="relative w-full flex flex-col place-items-center gap-4 rounded-xl p-3">
        <!-- Infos textuelles -->
        <IconMaterialEdit class="absolute right-6 top-5 h-5 w-5 cursor-pointer hover:scale-108" @click="edit_text_mode = !edit_text_mode" />
        <div class="w-full flex flex-col place-items-center gap-2 rounded-xl bg-cafe-50 p-3 shadow-md">
          <div type="text" class="text-2xl font-bold">
            {{ user_store.first_name }}
          </div>
          <input v-model="user_store.job_title" type="text" class="w-full text-center text-sm" :disabled="!edit_text_mode" :class="edit_text_mode ? 'input-field p-0' : 'bg-cafe-50'">
          <textarea v-model="user_store.bio" class="h-20 w-full p-2 text-center" :disabled="!edit_text_mode" :class="edit_text_mode ? 'input-field' : 'bg-cafe-50'" />
          <button v-if="edit_text_mode" class="btn-grass" @click="edit_job_title_and_bio">
            Valider
          </button>
        </div>

        <!-- Clubs -->
        <div class="flex flex-col gap-3 rounded-xl bg-cafe-50 p-3 shadow-md">
          <IconMaterialEdit class="h-5 w-5 flex cursor-pointer place-self-end hover:scale-108" @click="edit_tags_mode = !edit_tags_mode" />
          <div class="flex flex-wrap gap-3">
            <div
              v-for="club in user_store.clubs"
              :key="club.uuid ?? 'Fallback'"
              class="pastille flex place-content-center gap-1 bg-cafe-500 text-cafe-50"
              :class="edit_tags_mode ? 'hover:bg-blood-500 cursor-pointer hover:font-bold' : 'select-none'"
              name="club.uuid"
              @click="remove_tag(club)"
            >
              <div v-if="edit_tags_mode">
                X
              </div>
              {{ club.nom }}
            </div>
          </div>
          <div v-if="edit_tags_mode" class="filter-container-inner flex flex-col animate-fade-in animate-duration-120 justify-between gap-2">
            <span class="w-full text-center font-bold text-cafe-400">Ajoutez<span v-if="user_store.clubs.length"> ou supprimez</span> des tags à votre profil.</span>
            <input v-model="search_input" type="text" class="w-full input-field" placeholder="Chercher un tag">
            <ClubBrowserUser :search_input="search_input" />
          </div>
        </div>

        <!-- Dispo -->
        <div class="relative flex flex-col place-items-center gap-3 rounded-xl bg-cafe-50 p-3 shadow-md">
          <div class="flex place-items-center font-bold">
            Dispo pour
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex place-items-center gap-3">
              <InputSwitch v-model="user_store.computed_open_to_pause" />
              <IconBxbxsCoffee class="h-7 w-7" />
              Prendre un café
            </div>
            <div class="flex place-items-center gap-3">
              <InputSwitch v-model="user_store.computed_open_to_lunch" />
              <IconFluentFork class="h-7 w-7" />
              Manger un bout
            </div>
            <div class="flex place-items-center gap-3">
              <InputSwitch v-model="user_store.computed_open_to_afterwork" />
              <IconFluentGlass class="h-7 w-7" />
              Un afterwork
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import default_user_pic from '@/assets/img/default_user_pic.png'
import svg_close from '@/assets/svg/icon/MingcuteCloseFill.svg'
import type { Club } from '@/stores/xano.d.ts'

const edit_text_mode = ref(false)
const edit_tags_mode = ref(false)
const user_store = use_user_store()
const search_input = ref('')

function edit_job_title_and_bio() {
  user_store.edit_user({ bio: user_store.bio, job_title: user_store.job_title })
  edit_text_mode.value = false
}

function remove_tag(club: Club) {
  if (edit_tags_mode.value) user_store.remove_club(club)
}
</script>
