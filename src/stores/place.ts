import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'
import type { CafeTag, Place } from './xano'

export const use_place_store = defineStore('place', () => {
  const db: Ref<Place[] | null> = ref(null)
  const selected_id = ref<number | null>(null)

  const selected = computed(() => db.value?.find(cafe => cafe.id === selected_id.value) ?? null)

  const db_filtered = computed(() => {
    const selected_price_types: CafeTag[] = []
    const selected_noise_levels: CafeTag[] = []
    const selected_misc: CafeTag[] = []
    const filtered_places: Place[] = []

    if (filters.value.pricing_free) selected_price_types.push('Gratuit')
    if (filters.value.pricing_place) selected_price_types.push('Café', 'Restaurant', 'Bar', 'Brasserie', 'Tiers lieu', 'Autre lieu')
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
          filtered_places.push(cafe)
        }
      })
    }
    return filtered_places
  })

  async function update_open_status() {
    try {
      const xano_open_status_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/place/opening`

      const open_status: { id: number; is_open: boolean }[] = await fetch(xano_open_status_url).then(res => res.json())
      open_status.forEach((place) => {
        const place_to_update = db.value?.find(p => p.id === place.id)
        if (place_to_update) place_to_update.is_open = place.is_open
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function fetch_db() {
    db.value = null
    const error_message = 'Error while getting the database, please check your connection and try again'
    const { default: db_dat } = await import('@/utils/conversions.json')
    const db_parsed = db_dat as string
    const db_decoded = CryptoJS.AES.decrypt(db_parsed, error_message, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }) as any
    const db_decoded_to_json = JSON.parse(db_decoded.toString(CryptoJS.enc.Utf8)) as unknown

    db.value = db_decoded_to_json as Place[]
  }

  function sort_places() {
    db.value?.sort((a, b) => (b.attendance || 0) - (a?.attendance || 0))
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

  return {
    fetch_db,
    db,
    db_filtered,
    selected,
    selected_id,
    establishment_type,
    sort_places,
    update_open_status
  }
})
