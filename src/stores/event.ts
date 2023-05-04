import { defineStore } from 'pinia'
import type { Event } from './xano'

const xano_get_events_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee_events`
const xano_sub_event_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/events/sub`

const user_store = use_user_store()

export const use_event_store = defineStore('event', () => {
  const selected_coffee_id = ref<number | null>(null)
  const selected_coffee_events: Ref<Event[] | null> = ref(null)
  const selected_coffee_events_loading = ref(false)
  const selected_coffee_events_error = ref<string | null>(null)

  function date_to_day(date: Date) {
    const new_date = new Date(date)
    const day = new_date.getDate()
    return day
  }

  function date_to_month(date: Date) {
    const new_date = new Date(date)
    const month = new_date.toLocaleString('FR-fr', { month: 'long' })
    return month
  }

  function date_to_day_month(date: Date) {
    const new_date = new Date(date)
    const day = new_date.getDate()
    const month = new_date.toLocaleString('FR-fr', { month: 'long' })
    return `${day} ${month}`
  }

  async function get_coffee_events() {
    selected_coffee_events.value = null
    selected_coffee_events_loading.value = true
    selected_coffee_events_error.value = null

    try {
      const url_with_query = `${xano_get_events_url}?coffee_id_req=${selected_coffee_id.value?.toString()}`
      const response = await fetch(url_with_query)
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

  function is_user_in_event(event_id: number) {
    const user_in_event = selected_coffee_events.value?.find(event => event.id === event_id)?.user_id?.find(user => user.id === user_store.id)
    if (user_in_event) {
      return true
    } else {
      return false
    }
  }
  async function submit_events(event_id: number) {
    const subscribe = !is_user_in_event(event_id)
    const url_with_query = `${xano_sub_event_url}/${event_id}`
    try {
      const response = await fetch(url_with_query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_store.token}`,
        },
        body: JSON.stringify(
          {
            subscribe,
          },
        ),
      })
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

  function date_to_relative_date(date_to_test: Date) {
    const date = new Date(date_to_test)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain'
    } else {
      return dayOfWeek[date.getDay()]
    }
  }

  function slot_is_now(start: Date, end: Date) {
    const date_now = new Date()
    const date_start = new Date(start)
    const date_end = new Date(end)
    if (date_now >= date_start && date_now <= date_end) {
      return true
    } else {
      return false
    }
  }

  return {
    selected_coffee_events,
    selected_coffee_events_loading,
    selected_coffee_events_error,
    selected_coffee_id,
    submit_events,
    get_coffee_events,
    date_to_day_month,
    date_to_day,
    date_to_month,
    date_to_relative_date,
    slot_is_now,
    is_user_in_event,
  }
})
