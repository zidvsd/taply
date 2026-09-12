import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-16 text-center">
      <Icon
        className="h-6 w-6 text-muted-foreground"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <h3 className="mt-4 text-sm font-medium text-foreground">{title}</h3>

      <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {actionLabel && (actionHref || onAction) && (
        <Button onClick={onAction} size="sm" className="mt-6">
          {actionHref ? <a href={actionHref}>{actionLabel}</a> : actionLabel}
        </Button>
      )}
    </div>
  )
}
