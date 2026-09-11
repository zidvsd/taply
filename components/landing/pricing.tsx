import Link from "next/link"
import { Check } from "lucide-react"
import type { PricingTier } from "./types"
const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "500",
    currency: "₱",
    description: "One card, one profile, everything you need to get started.",
    cardCount: 1,
    features: [
      "1 NFC card + QR code",
      "Business info, links, hours",
      "One contact action",
      "1 template",
    ],
  },
  {
    name: "Business",
    price: "899",
    currency: "₱",
    description: "The full profile: services, reviews, booking, and more.",
    cardCount: 1,
    highlighted: true,
    features: [
      "1 premium NFC card + QR code",
      "Services and pricing",
      "Reviews, booking link, socials, menu",
      "All templates, custom colors",
    ],
  },
  {
    name: "Pro",
    price: "1,499",
    currency: "₱",
    description: "Multiple cards for multiple customer actions.",
    cardCount: 3,
    features: [
      "3 NFC cards: main, review, booking",
      "Everything in Business",
      "Priority support",
      "Discounted replacement cards",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          One price. No subscription.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Pay once for your profile and card. No monthly fees.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.highlighted
                  ? "flex flex-col rounded-lg bg-foreground p-8 text-background"
                  : "flex flex-col rounded-lg border border-border p-8 text-foreground"
              }
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {tier.name}
              </h3>
              <p
                className={
                  tier.highlighted
                    ? "mt-2 text-sm text-muted-foreground"
                    : "mt-2 text-sm text-muted-foreground"
                }
              >
                {tier.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.currency}
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/signup?tier=${tier.name.toLowerCase()}`}
                className={
                  tier.highlighted
                    ? "mt-8 inline-flex h-11 items-center justify-center rounded-full bg-background text-sm font-medium text-foreground"
                    : "mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
                }
              >
                Get {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
