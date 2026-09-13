import "server-only"

import { cookies } from "next/headers"
import Link from "next/link"

import { getCurrentUser } from "@/actions/get-current-user"
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"

export async function HeaderAuthSlot() {
  await cookies()

  const { user, profile } = await getCurrentUser()

  if (user) {
    return <UserAvatarDropdown user={user} profile={profile} />
  }

  return (
    <>
      <Link
        href="/login"
        className="hidden text-sm text-foreground transition-colors hover:text-muted-foreground sm:inline"
      >
        Sign in
      </Link>

      <Link
        href="/signup"
        className="inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Get Taply
      </Link>
    </>
  )
}
