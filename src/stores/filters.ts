import type { Club } from '@/stores/xano.d'

export const filters = reactive({
  limit_to_map: false,
  pricing_free: true,
  pricing_coffee: true,
  pricing_hourly: false,
  coworking: false,
  coffee_shop: false,
  bar_restaurant: false,
  third_place: false,
  max_distance: <Number | null> null,
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
  reset() {
    this.coworking = false
    this.coffee_shop = false
    this.bar_restaurant = false
    this.third_place = false
    this.max_distance = null
    this.noise_level_silent = false
    this.noise_level_calm = false
    this.noise_level_lively = false
    this.pricing_free = true
    this.pricing_coffee = true
    this.pricing_hourly = false
    this.open_now = true
    this.wifi = true
    this.power = true
    this.our_picks = false
    this.filter_status = ''
    this.not_empty = false
    this.clubs_tech = []
    this.clubs_domain = []
    this.clubs_roles = []
  },
})
