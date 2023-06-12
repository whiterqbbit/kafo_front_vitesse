import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import FilterModal from '@/components/FilterModal.vue'
import { use_place_store } from '@/stores/place'
import { filters } from '@/stores/filters'

describe('FilterModal.vue', () => {
  let place_store: ReturnType<typeof use_place_store>

  beforeAll(async () => {
    setActivePinia(createPinia())
    place_store = use_place_store()
    await place_store.fetch_db()
  })

  it('should render', () => {
    const wrapper = mount(FilterModal)
    expect(wrapper.text()).toContain('Essentiels')
  })

  it('should check "Coups de coeurs" checkbox on label click', async () => {
    const wrapper = mount(FilterModal)
    expect(filters.value.our_picks).toBe(false)

    await wrapper.find('label[for="filter-our-picks"]').trigger('click')

    expect(filters.value.our_picks).toBe(true)
  })

  it('should check "Ouvert actuellement" checkbox on label click', async () => {
    const wrapper = mount(FilterModal)
    expect(filters.value.open_now).toBe(false)

    await wrapper.find('label[for="filter-open"]').trigger('click')

    expect(filters.value.open_now).toBe(true)
  })

  it ('should reset filters on button "init"', async () => {
    const wrapper = mount(FilterModal)

    expect(filters.value.max_distance).toBe(-1)

    await wrapper.findComponent({ ref: 'filter-open' }).trigger('click')
    await wrapper.findComponent({ ref: 'filter-our-picks' }).trigger('click')
    await wrapper.find('label[for="filter-distance-2km"]').trigger('click')
    await wrapper.find('label[for="filter-coworking-calm"]').trigger('click')
    await wrapper.find('label[for="filter-floor"]').trigger('click')

    expect(filters.value.open_now).toBe(true)
    expect(filters.value.noise_level_calm).toBe(true)
    expect(filters.value.max_distance).toBe(2)
    expect(filters.value.our_picks).toBe(true)
    expect(filters.value.floor).toBe(true)

    await wrapper.find('input#init').trigger('click')

    expect(filters.value.max_distance).toBe(-1)
    expect(filters.value.open_now).toBe(false)
    expect(filters.value.noise_level_calm).toBe(false)
    expect(filters.value.floor).toBe(false)
    expect(filters.value.our_picks).toBe(true) // exception because the reset function doesn't reset the "our_picks" filter
  })
})
