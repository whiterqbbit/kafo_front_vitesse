export function get_day_from_date(date: Date) {
  const new_date = new Date(date)
  const day = new_date.getDate()
  return day
}

export function get_month_name_from_date(date: Date) {
  const new_date = new Date(date)
  const month = new_date.toLocaleString('FR-fr', { month: 'long' })
  return month
}

export function get_day_and_month_name_from_date(date: Date) {
  const new_date = new Date(date)
  const day = new_date.getDate()
  const month = new_date.toLocaleString('FR-fr', { month: 'long' })
  return `${day} ${month}`
}

export function get_relative_date_from_date(date_to_test: Date) {
  const date = new Date(date_to_test)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

  if (date.toDateString() === today.toDateString()) {
    return 'Aujourd\'hui'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Demain'
  } else {
    return dayOfWeek[date.getDay()]
  }
}

export function is_slot_current(start: Date, end: Date) {
  const date_now = new Date()
  const date_start = new Date(start)
  const date_end = new Date(end)
  if (date_now >= date_start && date_now <= date_end) {
    return true
  } else {
    return false
  }
}

export function convert_date(unixTimestamp: Date) {
  // Create a new date object from the Unix timestamp
  const dateObj = new Date(unixTimestamp)

  // Get the year, month, day, hour, minute, and second components of the date
  const year = dateObj.getUTCFullYear()
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getUTCDate().toString().padStart(2, '0')
  const hour = dateObj.getUTCHours().toString().padStart(2, '0')
  const minute = dateObj.getUTCMinutes().toString().padStart(2, '0')
  const second = dateObj.getUTCSeconds().toString().padStart(2, '0')

  // Combine the components into the desired format
  const formattedDate = `${year}${month}${day}T${hour}${minute}${second}Z`

  return formattedDate
}

export function convert_to_hour_format(date_to_compute: Date) {
  const date = new Date(date_to_compute)
  const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).replace(':', 'h')

  return formattedTime
}
