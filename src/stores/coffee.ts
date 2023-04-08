import { defineStore } from 'pinia'
import type { Cafe } from './xano.d'

const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee`

export const use_coffee_store = defineStore('coffee', () => {
  const db: Ref<Cafe[] | null> = ref(null)
  const db_loading = ref(false)
  const db_error = ref<string>('')
  const selected_id = ref<number | null>(null)

  const selected = computed(() => db.value?.find(cafe => cafe.id === selected_id.value) ?? null)

  async function fetch_db() {
    db.value = null
    db_loading.value = true
    db_error.value = ''

    try {
      const response = await fetch(xano_url)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      db.value = data
    }
    catch (error: any) {
      db_error.value = error.message
    }
    finally {
      db_loading.value = false
    }
  }

  return { fetch_db, db, db_loading, db_error, selected, selected_id }
})
