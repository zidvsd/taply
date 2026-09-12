import {
  MessageCircle,
  Star,
  MapPin,
  Globe,
  Calendar,
  Mail,
  Phone,
  Link as LinkIcon,
} from "lucide-react"

import type { BusinessLink } from "@/types/database"

import { SiInstagram, SiFacebook, SiYoutube, SiTiktok } from "react-icons/si"

import type { IconType } from "react-icons"

type PlatformIcon = IconType | typeof LinkIcon

const PLATFORM_ICON: Record<string, PlatformIcon> = {
  // Brand icons
  facebook: SiFacebook,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  youtube: SiYoutube,

  // Lucide icons
  messenger: MessageCircle,
  google_reviews: Star,
  google_maps: MapPin,
  website: Globe,
  booking: Calendar,
  email: Mail,
  phone: Phone,
}

interface LinksListProps {
  links: BusinessLink[]
}

export function LinksList({ links }: LinksListProps) {
  // Google Reviews gets its own prioritized placement
  // via GoogleReviewLink, so don't show it twice.
  const visibleLinks = links.filter(
    (link) => link.platform !== "google_reviews"
  )

  if (visibleLinks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col">
      <span className="mb-2 px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Links
      </span>

      <div className="flex flex-col rounded-lg border border-border">
        {visibleLinks.map((link, index) => {
          const Icon = link.platform
            ? (PLATFORM_ICON[link.platform] ?? LinkIcon)
            : LinkIcon

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                index < visibleLinks.length - 1
                  ? "flex items-center gap-3 border-b border-border p-4"
                  : "flex items-center gap-3 p-4"
              }
            >
              <Icon
                className="h-4.5 w-4.5 shrink-0 text-foreground"
                aria-hidden="true"
              />

              <span className="text-sm text-foreground">{link.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
