import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'
import type { CafeTag, Place } from './xano'
import { use_user_store } from './user'

export const use_place_store = defineStore('place', () => {
  const db: Ref<Place[] | null> = ref(null)
  const db_full: Ref<Place[] | null> = ref(null)
  const db_full_computed = computed(() => db_full.value ?? [])
  const selected_id = ref<number | null>(null)
  const distance_is_calculated = ref(false)

  const selected = computed(() => db.value?.find(cafe => cafe.id === selected_id.value) ?? null)
  const selected_full = computed(() => db_full.value?.find(cafe => cafe.id === selected_id.value) ?? null)

  const db_filtered = computed(() => {
    const selected_price_types: CafeTag[] = []
    const selected_noise_levels: CafeTag[] = []
    const selected_misc: CafeTag[] = []
    const filtered_places: Place[] = []

    // Pricing filters
    if (filters.value.pricing_place) selected_price_types.push('Gratuit')
    if (filters.value.pricing_place) selected_price_types.push('Café', 'Restaurant', 'Bar', 'Brasserie', 'Tiers lieu', 'Autre lieu')
    if (filters.value.pricing_hourly) selected_price_types.push('Coworking')

    // Noise level filters
    if (filters.value.noise_level_silent) selected_noise_levels.push('Studieux')
    if (filters.value.noise_level_calm) selected_noise_levels.push('Calme')
    if (filters.value.noise_level_lively) selected_noise_levels.push('Animé')

    // Misc filters
    if (filters.value.wifi) selected_misc.push('Wifi')
    if (filters.value.power) selected_misc.push('Prises')

    function calculate_distance_from_places() {
      // Calculate the distance between two coordinates
      function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371 // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c
        return distance
      }

      const user_coords = use_user_store().user_coords
      if (user_coords === null || user_coords.lat === Infinity || db.value === null) return
      db.value?.forEach((cafe) => {
        const { lat, lng } = cafe.location.data
        cafe.distance = haversineDistance(user_coords.lat, user_coords.lng, lat, lng)
      })

      distance_is_calculated.value = true
    }

    if (!distance_is_calculated.value) calculate_distance_from_places()

    if (db.value) {
      db.value.forEach((cafe) => {
        const { tags, is_open, attendance, our_fav, attendees, distance } = cafe
        const not_empty_matched = !filters.value.not_empty || attendance !== 0
        const price_matched = !selected_price_types.length || selected_price_types.some(r => tags.includes(r))
        const noise_level_matched = !selected_noise_levels.length || selected_noise_levels.some(r => tags.includes(r))
        const misc_matched = !selected_misc.length || selected_misc.every(r => tags.includes(r))
        const is_open_matched = !filters.value.open_now || is_open
        const our_picks_matched = !filters.value.our_picks || our_fav
        const distance_matched = filters.value.max_distance === -1 || (distance && distance < filters.value.max_distance)

        const clubs_selected_matched: boolean = (() => {
          const no_selected_clubs = filters.value.clubs_selected_uuids?.length === 0
          if (no_selected_clubs) return true
          if (!attendees) return false

          return attendees.some((attendee) => {
            if (!attendee.clubs_uuid) return false

            return attendee.clubs_uuid.some(club_uuid =>
              filters.value.clubs_selected_uuids.includes(club_uuid),
            )
          })
        })()

        if (price_matched
          && noise_level_matched
          && misc_matched
          && is_open_matched
          && not_empty_matched
          && distance_matched
          && our_picks_matched
          && clubs_selected_matched
        ) {
          filtered_places.push(cafe)
        }
      })
    }
    return filtered_places
  })

  function get_previous_place_id(id: number) {
    const index = db_filtered.value?.findIndex(p => p.id === id) ?? -1
    if (index === -1) return null
    const previous_place_id = db_filtered.value?.[index - 1].id ?? null
    return previous_place_id
  }

  function get_next_place_id(id: number) {
    const index = db_filtered.value?.findIndex(p => p.id === id) ?? -1
    if (index === -1) return null
    const next_place_id = db_filtered.value?.[index + 1].id ?? null
    return next_place_id
  }

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

  async function fetch_all_places_full() {
    try {
      const password = import.meta.env.VITE_XANO_PASSWORD
      const url = `${import.meta.env.VITE_XANO_GET_ALL_URL}?password=${password}`
      const all_places: Place[] = await fetch(url, {
      })
        .then(res => res.json())
        .then(arr => arr.splice(0, 25))
      db_full.value = all_places
    } catch (error) {
      console.error(error)
    }
  }

  async function update_place(place: Place) {
    try {
      const id = place.id
      const password = import.meta.env.VITE_XANO_PASSWORD
      const url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/coffee/${id}`
      console.log('url', url)
      console.log('place', place)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...place, password }),
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  function sort_places() {
    db.value?.sort((a, b) => {
      const attendanceDiff = (b.attendance || 0) - (a.attendance || 0)
      if (attendanceDiff === 0) {
        return (b.our_fav ? 1 : 0) - (a.our_fav ? 1 : 0)
      }
      return attendanceDiff
    })
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
    db_full_computed,
    selected,
    selected_full,
    selected_id,
    establishment_type,
    sort_places,
    update_open_status,
    get_previous_place_id,
    get_next_place_id,
    fetch_all_places_full,
    update_place,
  }
})
