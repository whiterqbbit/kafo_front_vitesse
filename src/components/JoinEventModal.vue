<template>
  <div id="main_container" class="w-full flex flex-col place-content-center place-items-center rounded-3xl bg-cafe-200 p-6 text-cafe-600 shadow-md md:w-1/2">
    <EventCard :day="today" />
    <div class="my-4 font-bold underline btn" @click="display_more_events = !display_more_events">
      {{ !display_more_events ? "Plus d'évènements" : "Moins d'évènements" }}
      <img>
    </div>
    <div v-if="display_more_events" class="w-full flex flex-col animate-fade-in animate-duration-130 gap-3">
      <EventCard v-for="i in 5" :key="i" :day="new Date(today.getTime() + i * 24 * 60 * 60 * 1000)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  place_id: String,
})
const display_more_events = ref(false)
const today = new Date()

// Get the selected place from the store
const selected_place_id = Number(props.place_id)
const place_store = use_place_store()
place_store.selected_id = selected_place_id

// Get the events of the place
const event_store = use_event_store()
event_store.selected_place_id = selected_place_id

async function get_selected_place_events() {
  await event_store.get_place_events()
}

get_selected_place_events()
</script>
