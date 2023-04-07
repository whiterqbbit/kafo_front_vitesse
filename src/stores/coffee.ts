import { defineStore } from 'pinia'
import type { Cafe } from './xano.d'

const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee`

export const use_coffee_store = defineStore('coffee', () => {
  const coffee_db: Ref<Cafe[] | null> = ref(null)
  const coffee_db_loading = ref(false)
  const coffee_db_error = ref<string>('')

  async function fetch_coffee_db() {
    coffee_db.value = null
    coffee_db_loading.value = true
    coffee_db_error.value = ''

    try {
      const response = await fetch(xano_url)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      coffee_db.value = data
      console.log('data', data)
    }
    catch (error: any) {
      coffee_db_error.value = error.message
    }
    finally {
      coffee_db_loading.value = false
    }
  }

  return { fetch_coffee_db, coffee_db, coffee_db_loading, coffee_db_error }
})
