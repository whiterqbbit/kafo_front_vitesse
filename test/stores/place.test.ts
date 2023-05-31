import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import { use_place_store } from '@/stores/place'
import { filters, reset_filters } from '@/stores/filters'

describe('place store', () => {
  let place_store: ReturnType<typeof use_place_store>

  beforeAll(async () => {
    setActivePinia(createPinia())
    place_store = use_place_store()
    await place_store.fetch_db()
  })

  it('fetches the db', async () => {
    expect(place_store.db).toMatchSnapshot()
  })

  it('filters according to pricing', () => {
    reset_filters()
    const unfiltered_db = place_store.db_filtered

    filters.value.pricing_hourly = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)

    reset_filters()
    filters.value.pricing_place = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)
  })

  it('filters according to noise', () => {
    reset_filters()
    const unfiltered_db = place_store.db_filtered

    filters.value.noise_level_silent = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)

    reset_filters()
    filters.value.noise_level_calm = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)

    reset_filters()
    filters.value.noise_level_lively = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)
  })

  it('filters according to misc', () => {
    reset_filters()
    const unfiltered_db = place_store.db_filtered

    filters.value.wifi = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)
    expect(place_store.db_filtered[0].tags).toContain('Wifi')

    reset_filters()
    filters.value.power = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)

    reset_filters()
    filters.value.floor = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBeGreaterThan(0)
  })

  it('filters according to open', () => {
    reset_filters()
    const unfiltered_db = place_store.db_filtered

    unfiltered_db[0].is_open = unfiltered_db[1].is_open = true
    filters.value.open_now = true
    expect(place_store.db_filtered.length).toBeLessThan(unfiltered_db.length)
    expect(place_store.db_filtered.length).toBe(2)
  })

  it('sorts the db by attendance', () => {
    if (place_store.db) {
      const second_place = place_store.db[1]
      second_place.attendance = 100
      place_store.sort_places()
      expect(place_store.db[0].id).toBe(second_place.id)
    } else {
      throw new Error('db is null')
    }
  })

  it('sorts the db by our_fav', () => {
    if (place_store.db) {
      let not_favorite_place_index = -1
      let not_favorite_place_id = -1
      for (let i = place_store.db.length - 1; i >= 0; i--) {
        if (!place_store.db[i].our_fav) {
          not_favorite_place_index = i
          not_favorite_place_id = place_store.db[i].id
          break
        }
      }
      if (not_favorite_place_index === -1) throw new Error('no place has our_fav = false')
      place_store.db[not_favorite_place_index].our_fav = true
      place_store.sort_places()
      const new_index = place_store.db.findIndex(p => p.id === not_favorite_place_id)
      expect(new_index).toBeLessThan(not_favorite_place_index)
    } else {
      throw new Error('db is null')
    }
  })
})
