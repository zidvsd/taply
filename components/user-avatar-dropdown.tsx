"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type {
  CurrentUser,
  CurrentUserProfile,
} from "@/actions/get-current-user"

type UserAvatarDropdownProps = {
  user: CurrentUser
  profile: CurrentUserProfile | null
}

export function UserAvatarDropdown({ user, profile }: UserAvatarDropdownProps) {
  const router = useRouter()
  const supabase = createClient()

  const displayName = profile?.first_name || user.email?.split("@")[0] || "User"

  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const avatarUrl = profile?.avatar_url || undefined

  async function handleSignOut() {
    await supabase.auth.signOut()
    toast.success("Signed out successfully.")
    router.push("/login")
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open account menu"
            className="rounded-sm transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <Avatar className="h-9 w-9 rounded-sm">
          <AvatarImage
            src={avatarUrl}
            alt={`${displayName}'s profile picture`}
            className="object-cover"
          />

          <AvatarFallback className="rounded-sm text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 rounded-sm"
      >
        <DropdownMenuItem
          render={
            <Link href="/dashboard">
              <LayoutDashboard />
              Dashboard
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link href="/dashboard/profile">
              <User />
              Profile
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link href="/dashboard/settings">
              <Settings />
              Settings
            </Link>
          }
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
