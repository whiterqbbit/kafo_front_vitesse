<template>
  <div id="main_container" class="w-full flex flex-col place-content-center place-items-center rounded-3xl bg-cafe-200 p-6 text-cafe-600 shadow-md md:w-1/2">
    <div v-if="current_event" class="m-3 w-full flex justify-between rounded-xl bg-cafe-400 p-1">
      <div class="w-1/4 flex flex-col p-3 font-bold text-cafe-50">
        <div class="text-xl">
          {{ get_day_from_date(current_event?.jour) }} {{ get_month_name_from_date(current_event?.jour) }} <span v-if="preferences.debug_mode">id= {{ current_event?.id }} </span>
        </div>
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-100 p-3">
        <div class="mb-1 text-xl font-bold uppercase">
          {{ current_event_relative_date }}
        </div>
        <div v-if="!!current_event_users?.length" class="my-2 max-h-80 flex flex-col gap-4 overflow-auto">
          <div v-for="user in current_event_users" :key="user.id || 'fallback-key'" class="flex items-center gap-3 rounded-xl p-1.5" :class="user_store.id === user.id ? 'bg-cafe-300' : '' ">
            <img :src="user.pic_xsmall ? user.pic_xsmall : default_user_pic" class="aspect-square h-15 rounded-full object-cover">
            <div>
              <div class="text-lg font-bold">
                {{ user.first_name }}
              </div>
              <div>{{ user.job_title }}</div>
            </div>
          </div>
        </div>
        <button class="p-2 font-bold btn-grass-full" @click="submit_to_event(current_event.id)">
          {{ event_store?.is_user_in_event(current_event.id) ? 'Quitter' : 'Rejoindre' }}
        </button>
      </div>
    </div>
    <!-- refactor pour avoir un composant event ?? -->
    <div v-if="next_event" class="m-3 w-full flex justify-between rounded-xl bg-cafe-400 p-1">
      <div class="w-1/4 flex flex-col p-3 font-bold text-cafe-50">
        <div class="text-xl">
          {{ get_day_from_date(next_event?.jour) }} {{ get_month_name_from_date(next_event?.jour) }}
        </div>
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-100 p-3">
        <div class="mb-5 text-xl font-bold uppercase">
          {{ next_event_relative_date === "Aujourd'hui" ? "Cet après-midi" : next_event_relative_date }}
        </div>
        <div v-if="next_event_users?.length" class="my-2 mt-5 max-h-80 flex flex-col gap-4 overflow-auto">
          <!-- {{ next_event_users }} -->
          <AvatarStack :attendees="next_event_users" />
        </div>
        <button class="w-full bg-cafe-400 p-2 font-bold hover:bg-cafe-500 btn-cafe" @click="submit_to_event(next_event.id)">
          {{ event_store?.is_user_in_event(next_event.id) ? 'Quitter' : 'Rejoindre' }}
        </button>
      </div>
    </div>
    <EventCard :day="today" />
  </div>
</template>

<script setup lang="ts">
import type { Event, User } from '@/stores/xano.d'
import { get_day_from_date, get_month_name_from_date, get_relative_date_from_date, is_slot_current } from '@/utils/date_utils'
import default_user_pic from '@/assets/img/default_user_pic.png'

const props = defineProps({
  place_id: String,
})

const user_store = use_user_store()

const today = new Date()
const toomorrow = new Date(today)
toomorrow.setDate(toomorrow.getDate() + 1)

// Get the selected place from the store
const selected_place_id = Number(props.place_id)
const place_store = use_place_store()
place_store.selected_id = selected_place_id

// Get the events of the place
const event_store = use_event_store()
event_store.selected_place_id = selected_place_id
const selected_events: Ref<Event[] | null> = ref(null)

const current_event_users: Ref<User[] | null> = ref(null)
const current_event: Ref<Event | null> = ref(null)
const current_event_relative_date = ref('')

const next_event_users: Ref<User[] | null> = ref(null)
const next_event: Ref<Event | null> = ref(null)
const next_event_relative_date = ref('')

async function get_selected_place_events() {
  await event_store.get_place_events()
  selected_events.value = event_store.selected_place_events

  current_event.value = selected_events.value ? selected_events.value[0] : null
  current_event_users.value = selected_events.value ? selected_events.value[0]?.user_id : []
  if (current_event?.value?.jour) {
    current_event_relative_date.value = get_relative_date_from_date(current_event?.value?.jour)
    if ((current_event_relative_date.value === 'Aujourd\'hui') && is_slot_current(current_event.value.start, current_event.value.end)) {
      current_event_relative_date.value = 'En ce moment'
    }
  }

  next_event.value = selected_events.value ? selected_events.value[1] : null
  next_event_users.value = selected_events.value ? selected_events.value[1]?.user_id : []
  if (next_event?.value?.jour) next_event_relative_date.value = get_relative_date_from_date(next_event?.value?.jour)
}

async function submit_to_event(event_id: number) {
  if (!user_store.id) {
    display.login_modal = true
  }
  await event_store.submit_events(event_id)
  await get_selected_place_events()
}

get_selected_place_events()
</script>
