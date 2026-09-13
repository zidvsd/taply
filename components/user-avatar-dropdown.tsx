"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { createClient } from "@/utils/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserAvatarDropdownProps = {
  user: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      picture?: string
      full_name?: string
      name?: string
      first_name?: string
    }
  }
  profile: {
    first_name: string | null
    avatar_url: string | null
  } | null
}

export function UserAvatarDropdown({ user, profile }: UserAvatarDropdownProps) {
  const router = useRouter()
  const supabase = createClient()

  const displayName =
    profile?.first_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.first_name ||
    user.email?.split("@")[0] ||
    "User"

  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const avatarUrl =
    profile?.avatar_url ||
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    undefined

  async function handleSignOut() {
    await supabase.auth.signOut()

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
            className="flex items-center gap-2 rounded-sm transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
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

        <div className="hidden max-w-36 flex-col items-start text-left sm:flex">
          <span className="truncate text-sm font-medium">{displayName}</span>

          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>

        <ChevronsUpDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-sm"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-sm">
              <AvatarImage
                src={avatarUrl}
                alt={`${displayName}'s profile picture`}
                className="object-cover"
              />

              <AvatarFallback className="rounded-sm text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium">{displayName}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link
                href="/dashboard"
                className="flex w-full cursor-pointer items-center"
              />
            }
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={
              <Link
                href="/profile"
                className="flex w-full cursor-pointer items-center"
              />
            }
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            render={
              <Link
                href="/settings"
                className="flex w-full cursor-pointer items-center"
              />
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
