import Link from "next/link"

export function FinalCta() {
  return (
    <section className="bg-foreground px-6 py-24 text-background md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Get your Taply card.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Set up your profile and get your card in a few minutes.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-background px-10 text-sm font-semibold text-foreground"
        >
          Get started
        </Link>
      </div>
    </section>
  )
}
