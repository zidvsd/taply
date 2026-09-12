import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="text-sm font-medium text-muted-foreground">404</span>

      <h1 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-foreground">
        This page doesn&apos;t exist.
      </h1>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        The link may be broken, or the page may have moved. Check the address
        and try again.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  )
}
