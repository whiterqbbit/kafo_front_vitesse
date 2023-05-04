import { defineStore } from 'pinia'
import type { Feature, Suggestion } from '@/stores/mapbox.d'

export const use_utils_store = defineStore('utils', () => {
  let session_id = generate_id()
  let search_count = 0

  function generate_id() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  async function mapbox_search_suggest(query: string) {
    try {
      if (search_count > 50) {
        session_id = generate_id()
        search_count = 0
      }

      const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:8ZEKOqwt/mapbox_search_suggest`
      const response = await fetch(xano_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, session_id }),
      })
      const data: Suggestion[] = await response.json()
      //   console.log('data mapbox_search_suggest', data)

      search_count += 1
      //   console.log(`${query} is searched`, `search_count : ${search_count}`, `session_id : ${session_id}`)
      return data
    } catch (error) {
      console.error('Error in mapbox_search_suggest:', error)
      throw error
    }
  }

  async function mapbox_search_retrieve(id: string) {
    try {
      const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:8ZEKOqwt/mapbox_retrieve`
      const response = await fetch(xano_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, session_id }),
      })

      const data: Feature[] = await response.json()
      //   console.log('data mapbox_search_retrieve', data)
      search_count = 100
      return data
    } catch (error) {
      console.error('Error in mapbox_search_retrieve:', error)
      throw error
    }
  }

  return { generate_id, mapbox_search_suggest, mapbox_search_retrieve }
})
