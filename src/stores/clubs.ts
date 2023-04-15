import { defineStore } from 'pinia'
import type { Club } from './xano.d'

const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/club`

export const use_club_store = defineStore('club', () => {
  const db: Ref<Club[] | null> = ref(null)
  const db_loading = ref(false)
  const db_error = ref<string | null>(null)
  const selected_id = ref<number | null>(null)

  const selected = computed(() => db.value?.find(club => club.id === selected_id.value) ?? null)

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

  return { fetch_db, db, db_loading, db_error, selected, selected_id }
})
