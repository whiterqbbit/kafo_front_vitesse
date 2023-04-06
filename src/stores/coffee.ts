import { acceptHMRUpdate, defineStore } from 'pinia'

const apiUrl = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee`

export const use_coffee_store = defineStore('coffee', () => {
  const name_coffee = ref('original')
  const coffee_db = ref({})
  const api_call_loading = ref(false)
  const api_call_error = ref<string | null>(null)
  function change_name_coffee(new_name: string) {
    console.log(`changing name to${new_name}`)
    name_coffee.value = `${new_name}tuvoi`
  }

  async function fetch_coffee_db() {
    api_call_loading.value = true
    api_call_error.value = null

    try {
      const response = await fetch(apiUrl)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)

      const data = await response.json()
      coffee_db.value = data
      console.log('data', data)
    }
    catch (error: any) {
      api_call_error.value = error.message
    }
    finally {
      api_call_loading.value = false
    }
  }

  return { name_coffee, change_name_coffee, fetch_coffee_db, coffee_db, api_call_loading, api_call_error }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
