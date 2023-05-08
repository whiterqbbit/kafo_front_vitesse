import { defineStore } from 'pinia'
import type { Attendance, Event } from './xano'

export const use_event_store = defineStore('event', () => {
  const selected_coffee_id = ref<number | null>(null)
  const selected_coffee_events: Ref<Event[] | null> = ref(null)
  const selected_coffee_events_loading = ref(false)
  const selected_coffee_events_error = ref<string | null>(null)
  const is_populated = ref(false)

  async function get_coffee_events() {
    selected_coffee_events.value = null
    selected_coffee_events_loading.value = true
    selected_coffee_events_error.value = null

    try {
      const xano_get_events_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee_events`
      const url_with_query = `${xano_get_events_url}?coffee_id_req=${selected_coffee_id.value?.toString()}`
      const response = await fetch(url_with_query)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}. Failed to fetch coffee events.`)
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

  async function populate_events() {
    try {
      const xano_attendance_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/attendance`
      const attendance: Attendance = await fetch(xano_attendance_url).then(res => res.json())
      console.log('attendance =>', attendance)
    } catch (error) {
      console.error(error)
    }
  }

  function is_user_in_event(event_id: number) {
    const user_store = use_user_store()
    const user_is_in_event = selected_coffee_events.value?.find(event => event.id === event_id)?.user_id?.find(user => user.id === user_store.id)
    if (user_is_in_event) return true
    return false
  }

  async function submit_events(event_id: number) {
    const subscribe = !is_user_in_event(event_id)
    const xano_sub_event_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/events/sub`
    const url_with_query = `${xano_sub_event_url}/${event_id}`
    const user_store = use_user_store()

    try {
      const response = await fetch(url_with_query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_store.token}`,
        },
        body: JSON.stringify({ subscribe }),
      })
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}. Failed to submit event.`)
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

  return {
    selected_coffee_events,
    selected_coffee_events_loading,
    selected_coffee_events_error,
    selected_coffee_id,
    submit_events,
    get_coffee_events,
    populate_events,
    is_populated,
    is_user_in_event,
  }
})
