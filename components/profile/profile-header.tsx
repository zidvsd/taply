import type { Business, BusinessHour } from "@/types/database"
import { isOpenNow } from "@/lib/hours"
interface ProfileHeaderProps {
  business: Business
  hours: BusinessHour[]
}

export function ProfileHeader({ business, hours }: ProfileHeaderProps) {
  const open = isOpenNow(hours)

  const initials = business.name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col items-center pt-4 pb-8 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted text-lg font-semibold text-foreground">
        {initials}
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {business.name}
      </h1>

      {business.description && (
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {business.description}
        </p>
      )}

      {hours.length > 0 && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
          <span
            className={
              open
                ? "h-1.5 w-1.5 rounded-full bg-foreground"
                : "h-1.5 w-1.5 rounded-full bg-muted-foreground"
            }
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-foreground">
            {open ? "Open now" : "Closed"}
          </span>
        </div>
      )}
    </div>
  )
}
