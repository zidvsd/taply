import type { BusinessHour } from "@/types/database"
import { dayLabel } from "@/lib/hours"

interface HoursListProps {
  hours: BusinessHour[]
}

function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":")
  const hour = Number(hourStr)
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:${minute} ${period}`
}

export function HoursList({ hours }: HoursListProps) {
  if (hours.length === 0) return null

  const today = new Date().getDay()
  const sorted = [...hours].sort((a, b) => a.day_of_week - b.day_of_week)

  return (
    <div className="flex flex-col">
      <span className="mb-2 px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Hours
      </span>
      <div className="flex flex-col rounded-lg border border-border">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className={
              index < sorted.length - 1
                ? "flex items-center justify-between border-b border-border px-4 py-2.5"
                : "flex items-center justify-between px-4 py-2.5"
            }
          >
            <span
              className={
                entry.day_of_week === today
                  ? "text-sm font-medium text-foreground"
                  : "text-sm text-muted-foreground"
              }
            >
              {dayLabel(entry.day_of_week)}
            </span>
            <span
              className={
                entry.day_of_week === today
                  ? "text-sm font-medium text-foreground"
                  : "text-sm text-muted-foreground"
              }
            >
              {entry.is_closed || !entry.open_time || !entry.close_time
                ? "Closed"
                : `${formatTime(entry.open_time)} – ${formatTime(entry.close_time)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
