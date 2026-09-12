import Link from "next/link"

export function ProfileFootnote() {
  return (
    <div className="flex flex-col items-center pt-8 pb-4 text-center">
      <p className="text-xs text-muted-foreground">Powered by Taply</p>
      <Link href="/signup" className="mt-1 text-xs font-medium text-foreground">
        Get your own Taply card
      </Link>
    </div>
  )
}
