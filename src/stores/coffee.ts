import { defineStore } from 'pinia'
import type { Cafe, CafeTag } from './xano.d'

const xano_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee`

export const use_coffee_store = defineStore('coffee', () => {
  const db: Ref<Cafe[] | null> = ref(null)
  const db_loading = ref(false)
  const db_error = ref<string | null>(null)
  const selected_id = ref<number | null>(null)

  const selected = computed(() => db.value?.find(cafe => cafe.id === selected_id.value) ?? null)
  const db_filtered = computed(() => {
    const array_price: CafeTag[] = []
    const array_noise: CafeTag[] = []
    const array_other: CafeTag[] = []
    const filtered_coffee_array: Cafe[] = []

    if (filters.pricing_free) array_price.push('Gratuit')
    if (filters.pricing_coffee) array_price.push('Café', 'Restaurant', 'Bar', 'Brasserie', 'Tiers lieu', 'Autre lieu')
    if (filters.pricing_hourly) array_price.push('Coworking')

    if (filters.noise_level_silent) array_noise.push('Studieux')
    if (filters.noise_level_calm) array_noise.push('Calme')
    if (filters.noise_level_lively) array_noise.push('Animé')

    if (filters.wifi) array_other.push('Wifi')
    if (filters.power) array_other.push('Prises')
    if (filters.our_picks) array_other.push('Top rated')

    if (db.value) {
      db.value.forEach((cafe) => {
        const { tags, is_open, attendance } = cafe
        const not_empty_matched = !filters.not_empty || attendance !== 0
        const price_matched = !array_price.length || array_price.some(r => tags.includes(r))
        const noise_matched = !array_noise.length || array_noise.some(r => tags.includes(r))
        const other_matched = !array_other.length || array_other.every(r => tags.includes(r))
        const open_matched = !filters.open_now || is_open

        if (price_matched && noise_matched && other_matched && open_matched && not_empty_matched) {
          filtered_coffee_array.push(cafe)
        }
      })
    }
    return filtered_coffee_array
  })

  async function fetch_db() {
    db.value = null
    db_loading.value = true
    db_error.value = null

    try {
      if (preferences.offline_mode) {
        const { default: db_json } = await import('@/utils/db.json')
        const db_parsed = db_json as unknown
        db.value = db_parsed as Cafe[]
      } else {
        const response = await fetch(xano_url)
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

        const data = await response.json()
        db.value = data
      }
    } catch (error: any) {
      db_error.value = error.message
    } finally {
      db_loading.value = false
    }
  }

  return { fetch_db, db, db_loading, db_filtered, db_error, selected, selected_id }
})
