import { Check } from "lucide-react"

const HIGHLIGHTS = [
  "Services and pricing, always current",
  "Google Reviews and Maps, one tap away",
  "Business hours that update instantly",
]

export function ProfileShowcase() {
  return (
    <section className="w-full border-b border-neutral-200 bg-background px-6 py-24 text-foreground sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Everything customers need, right when they&apos;re interested.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            One page, built for your business, that you control from a dashboard
            — not a scattered set of links.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 size-5 shrink-0 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span className="text-base text-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
