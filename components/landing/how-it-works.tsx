import { Nfc, QrCode, Link2 } from "lucide-react"
import type { Step } from "./types"

const STEPS: Step[] = [
  {
    label: "1",
    title: "Tap",
    description: "A customer taps their phone against your NFC card.",
    icon: Nfc,
  },
  {
    label: "2",
    title: "Scan",
    description: "No NFC? The same card carries a QR code as a fallback.",
    icon: QrCode,
  },
  {
    label: "3",
    title: "Connect",
    description:
      "Either way, they land on your profile — services, hours, reviews, booking.",
    icon: Link2,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Three steps. No app required.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              Every tap or scan leads to the same place, no matter which path a
              customer's phone takes.
            </p>
          </div>

          <ol className="relative flex flex-col gap-10 lg:col-span-8 lg:flex-row lg:gap-0">
            {/* The running line: a single connective thread through all
                three steps, rendered once rather than repeated per-card.
                Horizontal on desktop, vertical on mobile. */}
            <div
              className="absolute top-2 left-3.75 hidden h-[calc(100%-1rem)] w-px bg-border lg:top-3.75 lg:left-0 lg:block lg:h-px lg:w-full"
              aria-hidden="true"
            />
            <div
              className="absolute top-2 left-3.75 h-[calc(100%-1rem)] w-px bg-border lg:hidden"
              aria-hidden="true"
            />

            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <li
                  key={step.label}
                  className="relative flex gap-5 pl-0 lg:flex-1 lg:flex-col lg:gap-0 lg:pr-8 lg:pl-0 lg:last:pr-0"
                >
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background lg:mb-6">
                    <Icon
                      className="h-4 w-4 text-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 pb-2 lg:pb-0">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
