import Link from "next/link"
import Image from "next/image"
import icon from "@/public/icon.svg"
import type { NavLink } from "./types"

interface FooterColumn {
  heading: string
  links: NavLink[]
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 border-b border-border pb-12 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2">
               <Image
                         src={icon}
                         alt="Taply"
                         width={28}
                         height={28}
                         className="h-7 w-auto"
                       />
              <span className="text-sm font-semibold text-foreground">
                Taply
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Your business, one tap away.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">
                {column.heading}
              </span>

              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Taply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
