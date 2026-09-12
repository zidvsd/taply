import type { BusinessHour } from "@/types/database"

export const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export function dayLabel(dayOfWeek: number): string {
  return DAY_LABELS[dayOfWeek] ?? ""
}

export function isOpenNow(hours: BusinessHour[]): boolean {
  const now = new Date()
  const dayOfWeek = now.getDay()

  const today = hours.find((entry) => entry.day_of_week === dayOfWeek)

  if (!today || today.is_closed || !today.open_time || !today.close_time) {
    return false
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const [openHour, openMinute] = today.open_time.split(":").map(Number)

  const [closeHour, closeMinute] = today.close_time.split(":").map(Number)

  const openMinutes = openHour * 60 + openMinute
  const closeMinutes = closeHour * 60 + closeMinute

  // Handles normal schedules such as 9:00 AM – 6:00 PM
  if (closeMinutes > openMinutes) {
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes
  }

  // Handles overnight schedules such as 10:00 PM – 2:00 AM
  return currentMinutes >= openMinutes || currentMinutes < closeMinutes
}
