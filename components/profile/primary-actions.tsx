import { UserRound, Phone, Navigation, Mail } from "lucide-react"
import type { Business } from "@/types/database"

interface PrimaryActionsProps {
  business: Business
}

export function PrimaryActions({ business }: PrimaryActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <a
        href={`/api/vcard/${business.slug}`}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground"
      >
        <UserRound className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        Save to contacts
      </a>

      <div className="grid grid-cols-3 gap-2">
        {business.phone && (
          <a
            href={`tel:${business.phone}`}
            className="flex h-11 flex-col items-center justify-center gap-1 rounded-lg border border-border text-foreground"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs">Call</span>
          </a>
        )}
        {business.email && (
          <a
            href={`mailto:${business.email}`}
            className="flex h-11 flex-col items-center justify-center gap-1 rounded-lg border border-border text-foreground"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs">Email</span>
          </a>
        )}
        {business.maps_url && (
          <a
            href={business.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-col items-center justify-center gap-1 rounded-lg border border-border text-foreground"
          >
            <Navigation
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-xs">Directions</span>
          </a>
        )}
      </div>
    </div>
  )
}
