<template>
  <div class="w-full flex flex-col place-content-center place-items-center rounded-3xl bg-cafe-200 p-6 text-cafe-600 shadow-md md:w-1/2">
    <div v-if="current_event" class="m-3 w-full flex justify-between rounded-xl bg-cafe-400 p-1">
      <div class="w-1/4 flex flex-col p-3 font-bold text-cafe-50">
        <div class="text-5xl">
          {{ event_store.date_to_day(current_event?.jour) }}
        </div>
        <div class="text-2xl uppercase">
          {{ event_store.date_to_month(current_event?.jour) }}
        </div>
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-100 p-3">
        <div class="mb-7 text-3xl font-bold uppercase">
          {{ current_event_relative_date }}
        </div>
        <div v-if="current_event_users?.length" class="my-2 max-h-80 flex flex-col gap-4 overflow-auto">
          <div v-for="user in current_event_users" :key="user.id || 'fallback-key'" class="flex items-center gap-3 rounded-xl p-1.5" :class="user_store.id === user.id ? 'bg-cafe-300' : '' ">
            <img :src="user.pic_xsmall" class="aspect-square h-15 rounded-full object-cover">
            <div>
              <div class="text-lg font-bold">
                {{ user.first_name }}
              </div>
              <div>{{ user.job_title }}</div>
            </div>
          </div>
        </div>
        <button class="p-2 text-3xl font-bold btn-grass-full" @click="submit_to_event(current_event.id)">
          {{ event_store?.is_user_in_event(current_event.id) ? 'Quitter' : 'Rejoindre' }}
        </button>
      </div>
    </div>
    <div v-if="next_event" class="m-3 w-full flex justify-between rounded-xl bg-cafe-400 p-1">
      <div class="w-1/4 flex flex-col p-3 font-bold text-cafe-50">
        <div class="text-5xl">
          {{ event_store.date_to_day(next_event?.jour) }}
        </div>
        <div class="text-2xl uppercase">
          {{ event_store.date_to_month(next_event?.jour) }}
        </div>
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-100 p-3">
        <div class="mb-5 text-3xl font-bold uppercase">
          {{ next_event_relative_date === "Aujourd'hui" ? "Cet après-midi" : next_event_relative_date }}
        </div>
        <div v-if="next_event_users?.length" class="my-2 mt-5 max-h-80 flex flex-col gap-4 overflow-auto">
          <div v-for="user in next_event_users" :key="user.id || 'fallback-key'" class="flex items-center gap-4 rounded-xl p-1.5" :class="user_store.id === user.id ? 'bg-cafe-300' : '' ">
            <img :src="user.pic_xsmall" class="aspect-square h-15 rounded-full object-cover">
            <div>
              <div class="text-lg font-bold">
                {{ user.first_name }}
              </div>
              <div>{{ user.job_title }}</div>
            </div>
          </div>
        </div>
        <button class="w-full bg-cafe-400 p-2 text-3xl font-bold btn-cafe" @click="submit_to_event(next_event.id)">
          {{ event_store?.is_user_in_event(next_event.id) ? 'Quitter' : 'Rejoindre' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event, User } from '@/stores/xano.d'

const props = defineProps({
  id: String,
})

const user_store = use_user_store()

// Get the selected coffee from the store
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id

// Get the events of the coffee
const event_store = use_event_store()
event_store.selected_coffee_id = selected_coffee_id
const selected_events: Ref<Event[] | null> = ref(null)

const current_event_users: Ref<User[] | null> = ref(null)
const current_event: Ref<Event | null> = ref(null)
const current_event_relative_date = ref('')

const next_event_users: Ref<User[] | null> = ref(null)
const next_event: Ref<Event | null> = ref(null)
const next_event_relative_date = ref('')

async function get_selected_coffee_events() {
  await event_store.get_coffee_events()
  selected_events.value = event_store.selected_coffee_events

  current_event.value = selected_events.value ? selected_events.value[0] : null
  current_event_users.value = selected_events.value ? selected_events.value[0]?.user_id : []
  if (current_event?.value?.jour) {
    current_event_relative_date.value = event_store.date_to_relative_date(current_event?.value?.jour)
    if ((current_event_relative_date.value === 'Aujourd\'hui') && event_store.slot_is_now(current_event.value.start, current_event.value.end)) {
      current_event_relative_date.value = 'En ce moment'
    }
  }

  next_event.value = selected_events.value ? selected_events.value[1] : null
  next_event_users.value = selected_events.value ? selected_events.value[1]?.user_id : []
  if (next_event?.value?.jour) next_event_relative_date.value = event_store.date_to_relative_date(next_event?.value?.jour)
}

async function submit_to_event(event_id: number) {
  if (!user_store.id) {
    display.login_modal = true
  }
  await event_store.submit_events(event_id)
  await get_selected_coffee_events()
}

get_selected_coffee_events()
</script>
