import { Star } from "lucide-react"
import type { Business } from "@/types/database"
import { getGoogleMapsUrl } from "@/lib/utils"
interface GoogleReviewLinkProps {
  business: Business
}

export function GoogleReviewLink({ business }: GoogleReviewLinkProps) {
  if (!business.google_place_id) return null

  const googleMapsUrl = getGoogleMapsUrl(
    business.name,
    business.google_place_id
  )

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-lg border border-border p-4"
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
