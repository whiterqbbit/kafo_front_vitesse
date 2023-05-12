import { useStorage } from '@vueuse/core'
import type { Club } from '@/stores/xano.d'

export const filters = useStorage('filters', {
  limit_to_map: false,
  pricing_free: true,
  pricing_place: true,
  pricing_hourly: false,
  max_distance: -1,
  noise_level_silent: false,
  noise_level_calm: false,
  noise_level_lively: false,
  open_now: true,
  wifi: true,
  power: true,
  our_picks: false,
  filter_status: '',
  not_empty: false,
  clubs_tech: <Club[]>[],
  clubs_domain: <Club[]>[],
  clubs_roles: <Club[]>[],
})

export function reset_filters() {
  filters.value.max_distance = -1
  filters.value.noise_level_silent = false
  filters.value.noise_level_calm = false
  filters.value.noise_level_lively = false
  filters.value.pricing_free = false
  filters.value.pricing_place = false
  filters.value.pricing_hourly = false
  filters.value.open_now = false
  filters.value.wifi = false
  filters.value.power = false
  filters.value.our_picks = false
  filters.value.filter_status = ''
  filters.value.not_empty = false
  filters.value.clubs_tech = []
  filters.value.clubs_domain = []
  filters.value.clubs_roles = []
}
