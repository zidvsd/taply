import "server-only"

import { cache } from "react"

import { createClient } from "@/utils/supabase/server"

export interface CurrentUserProfile {
  first_name: string | null
  avatar_url: string | null
}

export interface CurrentUser {
  id: string
  email?: string
}

export interface CurrentUserResult {
  user: CurrentUser | null
  profile: CurrentUserProfile | null
}

export const getCurrentUser = cache(async (): Promise<CurrentUserResult> => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims?.sub) {
    return {
      user: null,
      profile: null,
    }
  }

  const claims = data.claims
  const userId = claims.sub

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, avatar_url")
    .eq("id", userId)
    .maybeSingle()

  return {
    user: {
      id: userId,
      email: typeof claims.email === "string" ? claims.email : undefined,
    },
    profile: profile ?? null,
  }
})
