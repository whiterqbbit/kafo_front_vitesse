import { defineStore } from 'pinia'
import type { Event } from './xano'

const xano_events_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee_events`

export const use_event_store = defineStore('event', () => {
  const selected_coffee_id = ref<number | null>(null)
  const selected_coffee_events: Ref<Event[] | null> = ref(null)
  const selected_coffee_events_loading = ref(false)
  const selected_coffee_events_error = ref<string | null>(null)

  async function get_coffee_events() {
    selected_coffee_events.value = null
    selected_coffee_events_loading.value = true
    selected_coffee_events_error.value = null

    try {
      const url_plus_id = `${xano_events_url}?coffee_id_req=${selected_coffee_id.value?.toString()}`
      const response = await fetch(url_plus_id)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data = await response.json()

      selected_coffee_events.value = data
    } catch (error) {
      const typed_error = error as Error

      selected_coffee_events_error.value = typed_error.message
    } finally {
      selected_coffee_events_loading.value = false
    }
    return selected_coffee_events.value
  }
  return { selected_coffee_events, selected_coffee_events_loading, selected_coffee_events_error, selected_coffee_id, get_coffee_events }
})
