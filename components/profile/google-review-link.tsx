import { Star } from "lucide-react"

import type { Business } from "@/types/database"

interface GoogleReviewLinkProps {
  business: Business
}

export function GoogleReviewLink({ business }: GoogleReviewLinkProps) {
  if (!business.google_review_url) {
    return null
  }

  return (
    <a
      href={business.google_review_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center gap-3">
        <Star
          className="h-5 w-5 text-foreground"
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <span className="text-sm font-medium text-foreground">
          Leave us a review
        </span>
      </div>

      <span className="text-sm text-muted-foreground">Google</span>
    </a>
  )
}
