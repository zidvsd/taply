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
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Built for local businesses.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              Whatever you run, your profile fits the way customers already
              decide where to go.
            </p>
          </div>

          <div className="flex flex-col lg:col-span-8">
            {BUSINESS_TYPES.map((type, index) => {
              const Icon = type.icon
              return (
                <div
                  key={type.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border py-6 first:pt-0 sm:grid-cols-[3rem_1fr_1fr] sm:gap-x-8"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="h-4 w-4 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:col-start-2">
                    {type.title}
                  </h3>
                  <p className="col-start-2 mt-1 text-sm leading-relaxed text-muted-foreground sm:col-start-3 sm:mt-0">
                    {type.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
