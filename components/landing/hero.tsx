import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { NfcCard } from "@/components/nfc-card"

export function Hero() {
  return (
    <section
      id="product"
      className="bg-background px-6 pt-32 pb-16 text-foreground md:pt-40"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Hero copy */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
            Your business.
            <br />
            One tap away.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A digital business profile for local businesses. Customers tap an
            NFC card or scan a QR code to reach your services, reviews, and
            booking.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground"
            >
              Get started
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground"
            >
              See how it works
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* NFC Hardware Showcase */}
        <div className="flex w-full items-center justify-center">
          <NfcCard />
        </div>
      </div>
    </section>
  )
}
