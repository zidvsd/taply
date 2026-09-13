"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export interface ProfileTab {
  label: string
  href: string
  /** Exact segment match, e.g. "" for the root profile tab, "menu", "reviews" */
  segment: string
}

interface ProfileTabsProps {
  slug: string
  tabs: ProfileTab[]
}

export function ProfileTabs({ slug, tabs }: ProfileTabsProps) {
  const pathname = usePathname()

  // Only ever render tabs if there's more than one real destination —
  // a single-tab bar (e.g. a barbershop with no menu, no reviews link)
  // is just noise, not navigation.
  if (tabs.length <= 1) return null

  return (
    <nav className="flex border-b border-border" aria-label="Profile sections">
      {tabs.map((tab) => {
        const isActive =
          pathname === `/${slug}${tab.href ? `/${tab.href}` : ""}`

        return (
          <Link
            key={tab.segment}
            href={`/${slug}${tab.href ? `/${tab.href}` : ""}`}
            className={
              isActive
                ? "flex-1 border-b-2 border-foreground pb-3 text-center text-sm font-medium text-foreground"
                : "flex-1 border-b-2 border-transparent pb-3 text-center text-sm font-medium text-muted-foreground"
            }
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
