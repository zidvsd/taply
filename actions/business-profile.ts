"use server"

import { createClient } from "@/utils/supabase/server"
import type {
  Business,
  BusinessAppearance,
  BusinessHour,
  BusinessLink,
  BusinessService,
  BookingSettings,
} from "@/types/database"

export interface BusinessProfileData {
  business: Business
  links: BusinessLink[]
  services: BusinessService[]
  hours: BusinessHour[]
  appearance: BusinessAppearance | null
  booking: BookingSettings | null
}

/**
 * Fetches everything the public /[slug] page needs for one published
 * business. Returns null if the business doesn't exist or isn't
 * published — the anon RLS policy would return no row in that case
 * anyway, but we check explicitly so the page can render a clean 404
 * instead of a partially-empty page.
 */
export async function getPublicBusinessProfile(
  slug: string
): Promise<BusinessProfileData | null> {
  const supabase = await createClient()

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (businessError || !business) {
    return null
  }

  const [
    linksResult,
    servicesResult,
    hoursResult,
    appearanceResult,
    bookingResult,
  ] = await Promise.all([
    supabase
      .from("business_links")
      .select("*")
      .eq("business_id", business.id)
      .eq("enabled", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("business_services")
      .select("*")
      .eq("business_id", business.id)
      .eq("enabled", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("business_hours")
      .select("*")
      .eq("business_id", business.id)
      .order("day_of_week", { ascending: true }),
    supabase
      .from("business_appearance")
      .select("*")
      .eq("business_id", business.id)
      .maybeSingle(),
    supabase
      .from("booking_settings")
      .select("*")
      .eq("business_id", business.id)
      .eq("enabled", true)
      .maybeSingle(),
  ])

  return {
    business,
    links: linksResult.data ?? [],
    services: servicesResult.data ?? [],
    hours: hoursResult.data ?? [],
    appearance: appearanceResult.data ?? null,
    booking: bookingResult.data ?? null,
  }
}
