"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ProfileTabsProps {
  slug: string
  showMenu: boolean
}

/**
 * Tabs for the three [slug] routes. Menu is conditionally shown —
 * a business with zero menu items (e.g. a barbershop) shouldn't
 * get an empty tab that leads to a blank page.
 *
 * Sticky on scroll so a visitor deep in a long menu can still reach
 * Reviews/Profile without scrolling back to the top — this page is a
 * single mobile column, so a bottom nav would compete with the
 * device's own browser chrome; an inline sticky bar stays anchored to
 * the business content above it instead of imitating a native app.
 */
export function ProfileTabs({ slug, showMenu }: ProfileTabsProps) {
  const pathname = usePathname()

  const tabs = [
    { label: "Profile", href: `/${slug}` },
    ...(showMenu ? [{ label: "Menu", href: `/${slug}/menu` }] : []),
    { label: "Reviews", href: `/${slug}/reviews` },
  ]

  return (
    <nav
      className="sticky top-0 z-10 -mx-4 flex border-b border-border bg-background/95 px-4 backdrop-blur-sm"
      aria-label="Profile sections"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex-1 py-3 text-center text-sm font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {isActive && (
              <span
                className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-primary"
                aria-hidden="true"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
