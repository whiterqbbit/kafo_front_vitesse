<template>
  <div class="w-full flex rounded-xl bg-cafe-400 p-1">
    <div class="w-1/4 flex flex-col p-3 text-cafe-50">
      <span class="text-xl font-bold">
        {{ get_day_from_date(day) }} {{ get_month_name_from_date(day) }}
      </span>
      <span class="text-sm font-bold">
        {{ get_relative_date_from_date(day) }}
      </span>
    </div>
    <div v-if="events_of_the_day" class="w-3/4 flex flex-col gap-1">
      <div
        v-for="event in events_of_the_day"
        :key="event.id || 'Fallback'"
        class="w-full flex flex-col gap-1 rounded-xl bg-cafe-100 p-3"
      >
        <div v-if="event.in_current_slot" class="text-xl font-bold uppercase">
          En ce moment
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
          <div v-if="!is_loading.get(event.id)">
            {{ event_store?.is_user_in_event(event.id) ? 'Quitter' : 'Rejoindre' }}
          </div>
          <ThreeDotsSpinner v-else class="mx-auto" />
        </button>
      </div>
    </div>
    <div v-else class="flex-co w-3/4 flex place-items-center justify-center rounded-xl bg-cafe-600 p-3">
      <div class="font-bold uppercase text-cafe-100">
        Indisponible
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
const is_loading = ref(new Map())

// Creates an array of the event of the day and add useful variables to each event
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
      event.in_current_slot = is_slot_current(event.start, event.end)

      let date_relative_to_today = get_relative_date_from_date(day.value)
      if ((date_relative_to_today === 'Aujourd\'hui') && event.in_current_slot) {
        date_relative_to_today = 'En ce moment'
      }
      event.relative_to_now = date_relative_to_today
      return true
    }
    return false
  })
  events.sort((a, b) => {
    if (a.start > b.start) return -1
    if (b.start < a.start) return 1
    return 0
  })
  if (events?.length) return events
  return null
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
  is_loading.value.set(event_id, true)
  try {
    await event_store.submit_events(event_id)
  } catch (error) {
    console.error(error)
  } finally {
    is_loading.value.set(event_id, false)
  }
  if (!events_of_the_day.value) return
  events_of_the_day?.value.sort((a, b) => {
    if (a.start > b.start) return -1
    if (b.start < a.start) return 1
    return 0
  })
}
</script>
