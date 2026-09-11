import Link from "next/link"
import { ArrowDown, Radio } from "lucide-react"

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
          <div className="group relative aspect-[1.586/1] w-full max-w-135 overflow-hidden rounded-[18px] border border-[#2C2C2E] bg-[#000000] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.18)] select-none sm:p-10">
            {/* Subtle surface highlight */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/3 to-transparent" />

            {/* Card header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[22px] font-semibold tracking-tight text-white">
                  Taply
                </span>

                <span className="font-mono text-[11px] tracking-widest text-[#6E6E73] uppercase">
                  Edition 01
                </span>
              </div>

              <Radio
                className="size-6.5 text-white opacity-80"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            {/* Hardware ID */}
            <div className="relative z-10 my-auto">
              <div className="mb-1 font-mono text-[12px] tracking-widest text-[#6E6E73] uppercase">
                Hardware ID
              </div>

              <div className="font-mono text-[14px] tracking-widest text-white">
                TPLY-8840-NC
              </div>
            </div>

            {/* Card footer */}
            <div className="relative z-10 flex items-end justify-between border-t border-[#2C2C2E]/80 pt-4">
              <div>
                <div className="text-[17px] font-medium tracking-tight text-white">
                  Julian Vance
                </div>

                <div className="mt-0.5 text-[13px] text-[#6E6E73]">
                  Studio Industrial Design
                </div>
              </div>

              {/* QR */}
              <div className="flex size-12 items-center justify-center rounded-[6px] bg-white p-1.5">
                <svg
                  className="size-full"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 3h6v6H3zm2 2v2h2V5zm8-2h6v6h-6zm2 2v2h2V5zM3 13h6v6H3zm2 2v2h2v-2zm10 0h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm-2-4h2v2h-2zm4 4h2v2h-2zm-6-2h2v2h-2zm8-2h2v2h-2zm-2-2h2v2h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Future visual / content */}
        <div className="flex w-full justify-center lg:justify-start">
          {/* Add second visual here */}
        </div>
      </div>
    </section>
  )
}
