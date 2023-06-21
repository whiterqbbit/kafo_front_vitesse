<template>
  <div class="fixed top-0 z-30 h-screen w-full flex place-content-center place-items-center bg-opacity-0 backdrop-blur">
    <div class="w-fit rounded-xl bg-cafe-100 p-4 shadow-md sm:p-8">
      <ThreeDotsSpinner v-if="join_loading" />
      <div v-else-if="!club_joined" class="flex flex-col place-items-center gap-8">
        <p v-if="club_to_join">
          Voulez-vous rejoindre le club <b>{{ club_to_join.nom }}</b> ?
        </p>
        <p v-else>
          Le club que vous essayez de rejoindre semble ne pas exister.
        </p>
        <div class="flex gap-4">
          <button class="btn-grass" @click="click_submit()">
            Oui
          </button>
          <button class="text-white btn-cafe" @click="display.join_club_modal = false">
            Plus tard
          </button>
        </div>
        <div v-if="join_error">
          {{ join_error }}
        </div>
      </div>
      <div v-else class="flex flex-col place-items-center gap-8">
        <p>
          Vous avez rejoint le club <b>{{ club_to_join?.nom ?? '' }}</b> !
        </p>
        <button class="text-cafe-50 btn-cafe" @click="display.join_club_modal = false">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Club } from '@/stores/xano'

const props = defineProps<{
  club_uuid: string
}>()

const club_to_join = ref<Club | null>(null)
const club_joined = ref(false)
const join_error = ref('')
const join_loading = ref(true)

async function click_submit() {
  if (!use_user_store().is_auth) {
    preferences.club_to_join = props.club_uuid
    display.join_club_modal = false
    display.login_modal = true
    return
  }

  if (club_to_join.value) {
    try {
      join_loading.value = true
      await use_club_store().join_club(props.club_uuid)
      club_joined.value = true
      join_loading.value = false
    } catch (error) {
      console.error(error)
      join_error.value = 'Une erreur est survenue lors de la tentative de rejoindre le club'
    }
  }
}

onMounted(async () => {
  join_loading.value = true
  club_to_join.value = await use_club_store().get_specific_club(props.club_uuid)
  join_loading.value = false
})
</script>
