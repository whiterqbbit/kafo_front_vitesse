import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Attendance, Event, Place } from './xano'

export const use_event_store = defineStore('event', () => {
  const selected_place_id = ref<number | null>(null)
  const selected_place_events: Ref<Event[] | null> = ref(null)
  const selected_place_events_loading = ref(false)
  const selected_place_events_error = ref<string | null>(null)
  const is_populated = ref(false)

  async function get_place_events() {
    selected_place_events.value = null
    selected_place_events_loading.value = true
    selected_place_events_error.value = null

    try {
      const xano_get_events_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee_events`
      const url_with_query = `${xano_get_events_url}?coffee_id_req=${selected_place_id.value?.toString()}`
      const response = await fetch(url_with_query)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}. Failed to fetch place events.`)
      const data = await response.json()

      selected_place_events.value = data
    } catch (error) {
      const typed_error = error as Error

      selected_place_events_error.value = typed_error.message
    } finally {
      selected_place_events_loading.value = false
    }
    return selected_place_events.value
  }

  async function populate_places() {
    try {
      const xano_attendance_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/attendance`
      const attendance: Attendance[] = await fetch(xano_attendance_url).then(res => res.json())
      const place_store = use_place_store()
      if (!place_store.db) throw new Error('Place store or its \'db\' property is not available.')

      const places: Place[] = place_store?.db

      attendance.forEach((place) => {
        const updated_place = places?.find((p: Place) => p.id === place.place_id)
        if (!updated_place) throw Error

        updated_place.events = place.events
        updated_place.attendance = place.attendance
        updated_place.attendees = place.attendees
      })
      place_store.sort_places()
    } catch (error) {
      console.error(error)
    }
  }

  function is_user_in_event(event_id: number) {
    const user_store = use_user_store()
    if (!selected_place_events.value || !Array.isArray(selected_place_events.value)) return false
    const user_is_in_event = selected_place_events?.value?.find(event => event.id === event_id)?.user_id?.find(user => user.id === user_store.id)
    if (user_is_in_event) return true
    return false
  }

  async function submit_events(event_id: number) {
    const cookies = useCookies(['user'])
    const user_auth_cookie = cookies.get('token')
    const subscribe = !is_user_in_event(event_id)
    const xano_sub_event_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/events/sub`
    const url_with_query = `${xano_sub_event_url}/${event_id}`

    try {
      const response = await fetch(url_with_query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_auth_cookie}`,
        },
        body: JSON.stringify({ subscribe }),
      })
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}. Failed to submit event.`)
      const data = await response.json()

      selected_place_events.value = data
    } catch (error) {
      const typed_error = error as Error

      selected_place_events_error.value = typed_error.message
    } finally {
      selected_place_events_loading.value = false
    }
    return selected_place_events.value
  }

  return {
    selected_place_events,
    selected_place_events_loading,
    selected_place_events_error,
    selected_place_id,
    submit_events,
    get_place_events,
    populate_places,
    is_populated,
    is_user_in_event,
  }
})
