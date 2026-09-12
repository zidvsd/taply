import { Clock3 } from "lucide-react"

export function ProfileSetupPendingState() {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Clock3
        className="h-6 w-6 text-muted-foreground"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-sm font-medium text-foreground">
        This profile is still being set up
      </h3>
      <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Check back soon, or contact the business directly.
      </p>
    </div>
  )
}
