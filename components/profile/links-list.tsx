import {
  Calendar,
  Globe,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react"

import type { BusinessLink } from "@/types/database"

import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaReddit,
  FaSnapchat,
  FaTelegram,
  FaThreads,
  FaXTwitter,
  FaLinkedin,
  FaTiktok,
  FaTwitch,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6"

import type { IconType } from "react-icons"

type PlatformIcon = IconType | typeof LinkIcon

const PLATFORM_ICON: Record<string, PlatformIcon> = {
  // Social media
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  twitter: FaXTwitter,
  threads: FaThreads,
  pinterest: FaPinterest,
  snapchat: FaSnapchat,
  reddit: FaReddit,
  twitch: FaTwitch,

  // Messaging
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  messenger: MessageCircle,

  // Google / business
  google_reviews: Star,
  google_maps: MapPin,

  // Business
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
