import { Scissors, Coffee, Store } from "lucide-react"
import type { BusinessType } from "./types"

const BUSINESS_TYPES: BusinessType[] = [
  {
    title: "Barbershops & salons",
    description:
      "Services, pricing, booking link, and reviews — customers see it before they walk in.",
    icon: Scissors,
  },
  {
    title: "Restaurants & cafés",
    description:
      "A digital menu, hours, and location that you can update the same day the menu changes.",
    icon: Coffee,
  },
  {
    title: "Boutiques & studios",
    description:
      "Location, socials, and contact details in one place, styled to match your brand.",
    icon: Store,
  },
]

export function BusinessTypes() {
  return (
    <section id="templates" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Built for local businesses.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BUSINESS_TYPES.map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.title}
                className="flex flex-col gap-4 border-t border-border pt-6"
              >
                <Icon
                  className="h-6 w-6 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {type.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {type.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
