export function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":")

  const hour = Number(hourStr)

  const period = hour >= 12 ? "PM" : "AM"

  const displayHour = hour % 12 === 0 ? 12 : hour % 12

  return `${displayHour}:${minute} ${period}`
}
