"use server"

import { cache } from "react"
import { createClient } from "@/utils/supabase/server"
import type {
  Business,
  BusinessAppearance,
  BusinessHour,
  BusinessLink,
  BusinessMenuCategory,
  BusinessMenuItem,
  BusinessService,
} from "@/types/database"

export interface BusinessProfileData {
  business: Business
  links: BusinessLink[]
  services: BusinessService[]
  hours: BusinessHour[]
  appearance: BusinessAppearance | null
  menuCategories: BusinessMenuCategory[]
  menuItems: BusinessMenuItem[]
}

/**
 * Fetches everything the /[slug] route group needs for one published
 * business. Returns null if the business doesn't exist or isn't
 * published — the anon RLS policy would return no row in that case
 * anyway, but we check explicitly so callers can render a clean 404
 * instead of a partially-empty page.
 *
 * Wrapped in React's cache() so layout.tsx, generateMetadata, and any
 * page/child page that calls this with the same slug within one
 * request all share a single Supabase round-trip instead of
 * duplicating it. This is request-scoped memoization, not a
 * persistent cache — it resets on every new request.
 *
 * Menu categories/items are fetched for every business regardless of
 * type — most businesses will simply have zero rows, and MenuPopover
 * renders nothing in that case. There's no "business type" flag to
 * branch on, so "has menu items" is the signal, not a category.
 */
export const getPublicBusinessProfile = cache(
  async (slug: string): Promise<BusinessProfileData | null> => {
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
      menuCategoriesResult,
      menuItemsResult,
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
        .from("business_menu_categories")
        .select("*")
        .eq("business_id", business.id)
        .eq("enabled", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("business_menu_items")
        .select("*")
        .eq("business_id", business.id)
        .eq("enabled", true)
        .order("display_order", { ascending: true }),
    ])

    return {
      business,
      links: linksResult.data ?? [],
      services: servicesResult.data ?? [],
      hours: hoursResult.data ?? [],
      appearance: appearanceResult.data ?? null,
      menuCategories: menuCategoriesResult.data ?? [],
      menuItems: menuItemsResult.data ?? [],
    }
  }
)
