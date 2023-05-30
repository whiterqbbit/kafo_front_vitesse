import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import { use_place_store } from '@/stores/place'
import { filters, reset_filters } from '@/stores/filters'

describe('place', () => {
  let place_store: ReturnType<typeof use_place_store>

  beforeAll(async () => {
    setActivePinia(createPinia())
    place_store = use_place_store()
    await place_store.fetch_db()
  })

  it('fetches the db', async () => {
    expect(place_store.db).toMatchSnapshot()
  })

  it('filters free places', () => {
    reset_filters()
    filters.value.pricing_free = true
    expect(place_store.db_filtered).toMatchSnapshot()
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
