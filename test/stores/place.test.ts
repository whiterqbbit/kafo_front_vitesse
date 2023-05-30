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

  // it('sorts the db by our_fav', () => {
  //   if (place_store.db) {
  //     const not_favorite_place = place_store.db.find(p => !p.our_fav)
  //     second_place.our_fav = true
  //     place_store.sort_places()
  //     expect(place_store.db[0].id).toBe(second_place.id)
  //   } else {
  //     throw new Error('db is null')
  //   }
  // })
})
