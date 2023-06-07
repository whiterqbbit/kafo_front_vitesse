import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Club } from './xano.d'

const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/club`

export const use_club_store = defineStore('club', () => {
  const db: Ref<Club[] | null> = ref(null)
  const db_loading = ref(false)
  const db_error = ref<string | null>(null)
  const selected_id = ref<number | null>(null)

  const selected = computed(() => db.value?.find(club => club.id === selected_id.value) ?? null)

  const db_filtered = computed(() => {
    const filtered_Clubs: Club[] = []
    const place_store = use_place_store()
    const places = place_store.db_filtered
    const uuids_filtered: string[] = []

    if (!db.value || !places) return filtered_Clubs

    places.forEach((place) => {
      const { attendees } = place
      if (!attendees) return

      attendees.forEach((attendee) => {
        if (!attendee.clubs_uuid) return

        attendee.clubs_uuid.forEach((club_uuid) => {
          if (!uuids_filtered.includes(club_uuid)) uuids_filtered.push(club_uuid)
        })
      })
    })

    db.value.forEach((club) => {
      if (uuids_filtered.includes(club.uuid)) filtered_Clubs.push(club)
    })

    return filtered_Clubs
  })

  async function fetch_db() {
    db.value = null
    db_loading.value = true
    db_error.value = null

    try {
      const response = await fetch(xano_url)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      db.value = data
    } catch (error: any) {
      db_error.value = error.message
    } finally {
      db_loading.value = false
    }
  }

  async function get_specific_club(uuid: string) {
    const url_with_query = `${xano_url}/${uuid}`
    try {
      const response = await fetch(url_with_query)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      return data
    } catch (error: any) {
      db_error.value = error.message
    }
  }

  async function join_club(uuid: string) {
    const url_with_query = `${xano_url}/sub/${uuid}`
    const token = useCookies(['user']).get('token')

    try {
      const response = await fetch(url_with_query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ subscribe: true }),
      })

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      return data
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return {
    fetch_db,
    db,
    db_loading,
    db_error,
    selected,
    selected_id,
    db_filtered,
    get_specific_club,
    join_club,
  }
})
