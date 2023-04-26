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
    const selected_price_types: CafeTag[] = []
    const selected_noise_levels: CafeTag[] = []
    const selected_misc: CafeTag[] = []
    const filtered_coffees: Cafe[] = []

    if (filters.value.pricing_free) selected_price_types.push('Gratuit')
    if (filters.value.pricing_coffee) selected_price_types.push('Café', 'Restaurant', 'Bar', 'Brasserie', 'Tiers lieu', 'Autre lieu')
    if (filters.value.pricing_hourly) selected_price_types.push('Coworking')

    if (filters.value.noise_level_silent) selected_noise_levels.push('Studieux')
    if (filters.value.noise_level_calm) selected_noise_levels.push('Calme')
    if (filters.value.noise_level_lively) selected_noise_levels.push('Animé')

    if (filters.value.wifi) selected_misc.push('Wifi')
    if (filters.value.power) selected_misc.push('Prises')
    if (filters.value.our_picks) selected_misc.push('Top rated')

    if (db.value) {
      db.value.forEach((cafe) => {
        const { tags, is_open, attendance } = cafe
        const not_empty_matched = !filters.value.not_empty || attendance !== 0
        const price_matched = !selected_price_types.length || selected_price_types.some(r => tags.includes(r))
        const noise_level_matched = !selected_noise_levels.length || selected_noise_levels.some(r => tags.includes(r))
        const misc_matched = !selected_misc.length || selected_misc.every(r => tags.includes(r))
        const is_open_matched = !filters.value.open_now || is_open

        if (price_matched && noise_level_matched && misc_matched && is_open_matched && not_empty_matched) {
          filtered_coffees.push(cafe)
        }
      })
    }
    return filtered_coffees
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
  function establishment_type(tags: any) {
    const tagsList = [
      'Café',
      'Bar',
      'Bistrot',
      'Brasserie',
      'Hôtel',
      'Coworking',
      'Tiers lieu',
      'Autre lieu',
      'Restaurant',
      'Salon de thé',
    ]

    for (const single_tag of tagsList) {
      if (tags.includes(single_tag)) return single_tag
    }
    return ''
  }

  return { fetch_db, db, db_loading, db_filtered, db_error, selected, selected_id, establishment_type }
})
