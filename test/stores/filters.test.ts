import { describe, expect, it } from 'vitest'
import { filters, reset_filters } from '@/stores/filters'

describe('filters store', () => {
  it('resets filters default values', () => {
    reset_filters()
    expect(filters.value.max_distance).toBe(-1)
    expect(filters.value.noise_level_silent).toBe(false)
    expect(filters.value.noise_level_calm).toBe(false)
    expect(filters.value.noise_level_lively).toBe(false)
    expect(filters.value.pricing_free).toBe(false)
    expect(filters.value.pricing_place).toBe(false)
    expect(filters.value.pricing_hourly).toBe(false)
    expect(filters.value.open_now).toBe(false)
    expect(filters.value.wifi).toBe(false)
    expect(filters.value.power).toBe(false)
    expect(filters.value.floor).toBe(false)
    expect(filters.value.not_empty).toBe(false)
    expect(filters.value.clubs_selected_uuids).toEqual([])
  })
})
