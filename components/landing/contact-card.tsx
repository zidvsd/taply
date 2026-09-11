import {
  CalendarDays,
  Globe,
  Mail,
  Menu,
  Phone,
  Star,
  UserRound,
} from "lucide-react"

import { Iphone } from "@/components/ui/iphone"

interface ContactDetail {
  label: string
  value: string
  icon: typeof Mail
  href: string
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: "Email",
    value: "julian@vance.design",
    icon: Mail,
    href: "mailto:julian@vance.design",
  },
  {
    label: "Direct",
    value: "+1 415 890 2210",
    icon: Phone,
    href: "tel:+14158902210",
  },
  {
    label: "Portfolio",
    value: "vance.design",
    icon: Globe,
    href: "https://vance.design",
  },
]

interface ProfileLink {
  label: string
  value: string
  icon: typeof Star
  href: string
}

const PROFILE_LINKS: ProfileLink[] = [
  {
    label: "Google Reviews",
    value: "Reviews",
    icon: Star,
    href: "https://www.google.com/search?q=Julian+Vance+Industrial+Designer",
  },
  {
    label: "LinkedIn",
    value: "LinkedIn",
    icon: Globe,
    href: "https://www.linkedin.com/in/julian-vance",
  },
  {
    label: "Facebook",
    value: "Facebook",
    icon: Globe,
    href: "https://www.facebook.com/julianvance",
  },
  {
    label: "Instagram",
    value: "@julianvance",
    icon: Globe,
    href: "https://www.instagram.com/julianvance",
  },
  {
    label: "TikTok",
    value: "@julianvance",
    icon: Globe,
    href: "https://www.tiktok.com/@julianvance",
  },
  {
    label: "Book a meeting",
    value: "TidyCal",
    icon: CalendarDays,
    href: "https://tidycal.com/julianvance",
  },
  {
    label: "Menu",
    value: "View menu",
    icon: Menu,
    href: "#menu",
  },
]

const CAPABILITIES = [
  { label: "Save to contacts", value: "One tap" },
  { label: "Works on", value: "iOS & Android" },
  { label: "Profile updates", value: "Instant" },
  { label: "App required", value: "None" },
]

export function ContactCard() {
  return (
    <section
      id="contact-card"
      className="border-b border-neutral-800 bg-foreground px-6 py-24 text-background sm:px-10 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Narrative */}
          <div className="flex flex-col items-start lg:col-span-5">
            <h2 className="mb-6 text-4xl leading-[1.05] font-semibold tracking-tight lg:text-5xl">
              Save your contact, not just a link.
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              Every phone number, email, and profile link packaged into a single
              contact card your customers can save in one tap.
            </p>

            <div className="flex w-full flex-col border-t border-neutral-800">
              {CAPABILITIES.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-neutral-800 py-4"
                >
                  <span className="text-sm text-background">{item.label}</span>

                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div className="flex justify-center lg:col-span-7 lg:justify-end">
            <Iphone className="w-full max-w-sm">
              <div className="min-h-full bg-foreground px-6 pt-24 pb-10 text-background">
                {/* Profile Info */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-20 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-xl font-semibold">
                    JV
                  </div>

                  <h3 className="text-[22px] font-semibold tracking-tight">
                    Julian Vance
                  </h3>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Industrial Designer
                  </p>

                  <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                    San Francisco, CA
                  </p>
                </div>

                {/* Save Contact */}
                <div className="mt-6">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-background py-3.5 text-sm font-medium text-foreground transition-opacity hover:opacity-90 active:scale-[0.98]"
                  >
                    <UserRound
                      className="size-4.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    Save to Contacts
                  </button>
                </div>

                {/* Contact Details */}
                <div className="mt-8 flex w-full flex-col border-t border-neutral-800">
                  {CONTACT_DETAILS.map((detail) => {
                    const Icon = detail.icon

                    return (
                      <a
                        key={detail.label}
                        href={detail.href}
                        className="flex items-center justify-between border-b border-neutral-800 py-3.5 transition-colors hover:bg-neutral-900/50"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className="size-4.5 text-background"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />

                          <span className="text-sm">{detail.label}</span>
                        </div>

                        <span className="font-mono text-[13px] text-muted-foreground">
                          {detail.value}
                        </span>
                      </a>
                    )
                  })}
                </div>

                {/* Profile Links */}
                <div className="mt-8 flex w-full flex-col border-t border-neutral-800">
                  {PROFILE_LINKS.map((link) => {
                    const Icon = link.icon

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center justify-between border-b border-neutral-800 py-3.5 transition-colors hover:bg-neutral-900/50"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className="size-4.5 text-background"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />

                          <span className="text-sm">{link.label}</span>
                        </div>

                        <span className="font-mono text-[13px] text-muted-foreground">
                          {link.value}
                        </span>
                      </a>
                    )
                  })}
                </div>

                {/* Verified */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <span className="size-1.5 rounded-full bg-background" />

                  <span className="text-xs text-muted-foreground">
                    Verified Taply Profile
                  </span>
                </div>
              </div>
            </Iphone>
          </div>
        </div>
      </div>
    </section>
  )
}
