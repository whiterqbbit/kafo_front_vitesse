import { useStorage } from '@vueuse/core'
import type { Club } from '@/stores/xano.d'

export const filters = reactive({
  limit_to_map: useStorage('limit_to_map', false),
  pricing_free: useStorage('pricing_free', true),
  pricing_coffee: useStorage('pricing_coffee', true),
  pricing_hourly: useStorage('pricing_hourly', false),
  max_distance: useStorage('max_distance', <Number | null> null),
  noise_level_silent: useStorage('noise_level_silent', false),
  noise_level_calm: useStorage('noise_level_calm', false),
  noise_level_lively: useStorage('noise_level_lively', false),
  open_now: useStorage('open_now', true),
  wifi: useStorage('wifi', true),
  power: useStorage('power', true),
  our_picks: useStorage('our_picks', false),
  filter_status: useStorage('filter_status', ''),
  not_empty: useStorage('not_empty', false),
  clubs_tech: useStorage('clubs_tech', <Club[]>[]),
  clubs_domain: useStorage('clubs_domain', <Club[]>[]),
  clubs_roles: useStorage('clubs_roles', <Club[]>[]),
  reset() {
    this.max_distance.value = null
    this.noise_level_silent.value = false
    this.noise_level_calm.value = false
    this.noise_level_lively.value = false
    this.pricing_free.value = true
    this.pricing_coffee.value = true
    this.pricing_hourly.value = false
    this.open_now.value = true
    this.wifi.value = true
    this.power.value = true
    this.our_picks.value = false
    this.filter_status.value = ''
    this.not_empty.value = false
    this.clubs_tech.value = []
    this.clubs_domain.value = []
    this.clubs_roles.value = []
  },
})
