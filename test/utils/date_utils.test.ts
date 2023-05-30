import { describe, expect, it } from 'vitest'
import { convert_date, convert_to_hour_format, get_day_and_month_name_from_date, get_day_from_date, get_month_name_from_date, get_relative_date_from_date, is_slot_current } from '@/utils/date_utils'

describe('date_utils', () => {
  it('gets day from date', () => {
    const date = new Date(2023, 5, 29)
    expect(get_day_from_date(date)).toEqual(29)
  })

  it('gets month name from date', () => {
    const date = new Date(2023, 5, 29)
    expect(get_month_name_from_date(date)).toEqual('juin')
  })

  it('gets day and month name from date', () => {
    const date = new Date(2023, 5, 29)
    expect(get_day_and_month_name_from_date(date)).toEqual('29 juin')
  })

  it('gets relative date from date', () => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(today.getDate() + 2)

    expect(get_relative_date_from_date(today)).toEqual('Aujourd\'hui')
    expect(get_relative_date_from_date(tomorrow)).toEqual('Demain')
    expect(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']).toContain(get_relative_date_from_date(dayAfterTomorrow)) // Depending on the current day
  })

  it('checks if slot is current', () => {
    const now = new Date()
    const start = new Date(now.getTime() - 10000) // 10 seconds before now
    const end = new Date(now.getTime() + 10000) // 10 seconds after now
    const earlier_start = new Date(now.getTime() - 20000) // 20 seconds before now
    const later_end = new Date(now.getTime() + 20000) // 20 seconds after now

    expect(is_slot_current(start, now)).toEqual(true)
    expect(is_slot_current(now, end)).toEqual(true)
    expect(is_slot_current(start, end)).toEqual(true)
    expect(is_slot_current(start, start)).toEqual(false)
    expect(is_slot_current(end, end)).toEqual(false)
    expect(is_slot_current(earlier_start, start)).toEqual(false)
    expect(is_slot_current(end, later_end)).toEqual(false)
  })

  it('converts date to string', () => {
    const date = new Date(Date.UTC(2023, 5, 29, 12, 34, 56))
    expect(convert_date(date)).toEqual('20230629T123456Z')
  })

  it('converts date to hour format', () => {
    const date = new Date(Date.UTC(2023, 5, 29, 12, 34, 56))
    expect(convert_to_hour_format(date)).toEqual('14h34') // Assuming your system is in the Central European Time (CET) time zone
  })
})
