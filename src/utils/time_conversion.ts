export function date_to_day(date: Date) {
  const new_date = new Date(date)
  const day = new_date.getDate()
  return day
}

export function date_to_month(date: Date) {
  const new_date = new Date(date)
  const month = new_date.toLocaleString('FR-fr', { month: 'long' })
  return month
}

export function date_to_day_month(date: Date) {
  const new_date = new Date(date)
  const day = new_date.getDate()
  const month = new_date.toLocaleString('FR-fr', { month: 'long' })
  return `${day} ${month}`
}
