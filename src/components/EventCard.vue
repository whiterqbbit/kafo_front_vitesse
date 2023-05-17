<template>
  <div v-if="events_of_the_day" class="w-full flex flex-col gap-1">
    <div
      v-for="event in events_of_the_day"
      :key="event.id || 'Fallback'"
      class="w-full flex justify-between rounded-xl bg-cafe-400 p-1"
    >
      <div class="w-1/4 flex flex-col p-3 text-xl font-bold text-cafe-50">
        {{ get_day_from_date(event?.jour) }} {{ get_month_name_from_date(event?.jour) }}
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-100 p-3">
        <div class="text-xl font-bold uppercase">
          {{ event.relative_to_now }}
        </div>
        <div>
          {{ convert_to_hour_format(event.start) }} - {{ convert_to_hour_format(event.end) }}
        </div>
        <div v-if="event.user_id?.length && !event.in_current_slot" class="my-2 mt-5 max-h-80 flex flex-col gap-4 overflow-auto">
          <AvatarStack :attendees="event.user_id" />
        </div>
        <div v-else-if="event.user_id?.length">
          <div v-for="user in event.user_id" :key="user.id || 'fallback-key'" class="flex items-center gap-3 rounded-xl p-1.5" :class="user_store.id === user.id ? 'bg-cafe-300' : '' ">
            <img :src="user.pic_xsmall ? user.pic_xsmall : default_user_pic" class="aspect-square h-15 rounded-full object-cover">
            <div>
              <div class="text-lg font-bold">
                {{ user.first_name }}
              </div>
              <div>{{ user.job_title }}</div>
            </div>
          </div>
        </div>
        <button class="w-full p-2 font-bold" :class="event?.in_current_slot ? 'btn-grass' : 'btn-cafe  hover:bg-cafe-500'" @click="submit_to_event(event.id)">
          {{ event_store?.is_user_in_event(event.id) ? 'Quitter' : 'Rejoindre' }}
        </button>
      </div>
    </div>
  </div>
  <div v-else class="w-full">
    <div
      class="w-full flex justify-between rounded-xl bg-cafe-400 p-1"
    >
      <div class="text-cafe- w-1/4 flex flex-col p-3 font-bold text-cafe-50">
        <div class="text-xl">
          {{ get_day_from_date(day) }} {{ get_month_name_from_date(day) }}
        </div>
      </div>
      <div class="w-3/4 rounded-xl bg-cafe-600 p-3">
        <div class="mb-5 text-xl font-bold uppercase text-cafe-25">
          {{ get_relative_date_from_date(day) }}
        </div>
        <div class="font-bold uppercase text-cafe-100">
          indisponible
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get_day_from_date, get_month_name_from_date, get_relative_date_from_date, is_slot_current } from '@/utils/date_utils'
import default_user_pic from '@/assets/img/default_user_pic.png'

const props = defineProps({
  day: {
    type: Date,
    required: false,
    default: null,
  },
})

const event_store = use_event_store()
const user_store = use_user_store()

const day = ref(props.day ?? new Date())

// the next : create an array of the event of the day and add usefull variable to each event
const events_of_the_day = computed(() => {
  if (!event_store.selected_place_events) {
    return null
  }
  const events = event_store.selected_place_events?.filter((event) => {
    if (!event.jour) return false
    const event_date = new Date(event.jour)
    if (
      event_date.getDate() === day.value.getDate()
      && event_date.getMonth() === day.value.getMonth()
      && event_date.getFullYear() === day.value.getFullYear()
    ) {
      // add a boolean to know if the event is in the current slot
      event.in_current_slot = is_slot_current(event.start, event.end)

      // add a relative string
      let relative_string = get_relative_date_from_date(day.value)
      if ((relative_string === 'Aujourd\'hui') && event.in_current_slot) {
        relative_string = 'En ce moment'
      }
      event.relative_to_now = relative_string
      return true
    }
    return false
  })
  if (events?.length) return events
  return []
})
function convert_to_hour_format(date_to_compute: Date) {
  const date = new Date(date_to_compute)
  const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).replace(':', 'h')

  return formattedTime
}
async function submit_to_event(event_id: number) {
  if (!user_store.id) {
    display.login_modal = true
    return false
  }
  await event_store.submit_events(event_id)
  await event_store.get_place_events() // refresh the events
  await event_store.populate_places()
}
</script>
