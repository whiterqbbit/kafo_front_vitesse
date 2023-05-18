<template>
  <div class="flex flex-col place-items-center gap-5 p-0 container sm:p-3">
    <div class="max-w-full w-120 flex flex-col gap-4 rounded-xl bg-cafe-200 p-2 shadow-md sm:p-3">
      <img :src="user_store.pic_small ? user_store.pic_small : default_user_pic" class="mx-auto h-40 w-40 border border-3 border-cafe-50 rounded-full shadow-md">

      <div class="relative w-full flex flex-col place-items-center gap-4 rounded-xl p-3">
        <!-- Infos textuelles -->
        <MaterialSymbolsEditRounded class="absolute right-6 top-5 h-5 w-5 cursor-pointer hover:scale-108" @click="edit_text_mode = !edit_text_mode" />
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
          <MaterialSymbolsEditRounded class="h-5 w-5 flex cursor-pointer place-self-end hover:scale-108" @click="edit_tags_mode = !edit_tags_mode" />
          <div class="flex flex-wrap gap-3">
            <div
              v-for="club in user_store.clubs"
              :key="club.uuid ?? 'Fallback'"
              class="flex place-content-center gap-1 rounded-full bg-cafe-500 px-2 text-cafe-50"
              :class="edit_tags_mode ? 'hover:bg-blood-500 cursor-pointer hover:font-bold' : 'cursor-default'"
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
            <span class="w-full text-center font-bold text-cafe-400">Ajoutez<span v-if="user_store.clubs.length"> ou suprimez</span> des tags a votre profil.</span>
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
              <InputSwitch v-model="user_store.computed_open_to_pause" :class="user_store.computed_open_to_pause ? '' : 'text-cafe-100'" />
              <BxBxsCoffee class="h-7 w-7" />
              Prendre un café
            </div>
            <div class="flex place-items-center gap-3">
              <InputSwitch v-model="user_store.computed_open_to_lunch" :class="user_store.computed_open_to_lunch ? '' : 'text-cafe-100'" />
              <FluentEmojiHighContrastForkAndKnife class="h-7 w-7" />
              Manger un bout
            </div>
            <div class="flex place-items-center gap-3">
              <InputSwitch v-model="user_store.computed_open_to_afterwork" :class="user_store.computed_open_to_afterwork ? '' : 'text-cafe-100'" />
              <FluentDrinkWine16Filled class="h-7 w-7" />
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
  if (edit_tags_mode) user_store.remove_club(club)
}
</script>
