export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: "admin" | "customer"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "customer"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "customer"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      businesses: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          cover_url: string | null
          phone: string | null
          email: string | null
          website_url: string | null
          address: string | null
          city: string | null
          country: string | null
          google_place_url: string | null
          google_review_url: string | null
          maps_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          cover_url?: string | null
          phone?: string | null
          email?: string | null
          website_url?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          google_place_url?: string | null
          google_review_url?: string | null
          maps_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          cover_url?: string | null
          phone?: string | null
          email?: string | null
          website_url?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          google_place_url?: string | null
          google_review_url?: string | null
          maps_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_links: {
        Row: {
          id: string
          business_id: string
          label: string
          url: string
          platform: string | null
          icon: string | null
          display_order: number
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          label: string
          url: string
          platform?: string | null
          icon?: string | null
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          label?: string
          url?: string
          platform?: string | null
          icon?: string | null
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_services: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          price: number | null
          currency: string
          duration_minutes: number | null
          image_url: string | null
          display_order: number
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          price?: number | null
          currency?: string
          duration_minutes?: number | null
          image_url?: string | null
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          price?: number | null
          currency?: string
          duration_minutes?: number | null
          image_url?: string | null
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_hours: {
        Row: {
          id: string
          business_id: string
          day_of_week: number
          is_closed: boolean
          open_time: string | null
          close_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          day_of_week: number
          is_closed?: boolean
          open_time?: string | null
          close_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          day_of_week?: number
          is_closed?: boolean
          open_time?: string | null
          close_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_appearance: {
        Row: {
          id: string
          business_id: string
          template: string
          primary_color: string
          accent_color: string
          background_color: string
          text_color: string
          button_style: string
          font_pairing: string
          show_logo: boolean
          show_services: boolean
          show_hours: boolean
          show_social_links: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          template?: string
          primary_color?: string
          accent_color?: string
          background_color?: string
          text_color?: string
          button_style?: string
          font_pairing?: string
          show_logo?: boolean
          show_services?: boolean
          show_hours?: boolean
          show_social_links?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          template?: string
          primary_color?: string
          accent_color?: string
          background_color?: string
          text_color?: string
          button_style?: string
          font_pairing?: string
          show_logo?: boolean
          show_services?: boolean
          show_hours?: boolean
          show_social_links?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_sections: {
        Row: {
          id: string
          business_id: string
          section_type: string
          title: string | null
          content: Json
          display_order: number
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          section_type: string
          title?: string | null
          content?: Json
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          section_type?: string
          title?: string | null
          content?: Json
          display_order?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      business_cards: {
        Row: {
          id: string
          business_id: string
          name: string
          card_type:
            "profile" | "review" | "menu" | "booking" | "social" | "location"
          slug: string
          destination_path: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          card_type?:
            "profile" | "review" | "menu" | "booking" | "social" | "location"
          slug: string
          destination_path: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          card_type?:
            "profile" | "review" | "menu" | "booking" | "social" | "location"
          slug?: string
          destination_path?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      booking_settings: {
        Row: {
          id: string
          business_id: string
          enabled: boolean
          provider: string | null
          booking_url: string | null
          embed_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          enabled?: boolean
          provider?: string | null
          booking_url?: string | null
          embed_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          enabled?: boolean
          provider?: string | null
          booking_url?: string | null
          embed_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      analytics_events: {
        Row: {
          id: string
          business_id: string
          card_id: string | null
          event_type: string
          target: string | null
          source: string | null
          visitor_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          card_id?: string | null
          event_type: string
          target?: string | null
          source?: string | null
          visitor_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          card_id?: string | null
          event_type?: string
          target?: string | null
          source?: string | null
          visitor_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Convenience Types                                                          */
/* -------------------------------------------------------------------------- */

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Business = Database["public"]["Tables"]["businesses"]["Row"]

export type BusinessLink = Database["public"]["Tables"]["business_links"]["Row"]

export type BusinessService =
  Database["public"]["Tables"]["business_services"]["Row"]

export type BusinessHour = Database["public"]["Tables"]["business_hours"]["Row"]

export type BusinessAppearance =
  Database["public"]["Tables"]["business_appearance"]["Row"]

export type BusinessSection =
  Database["public"]["Tables"]["business_sections"]["Row"]

export type BusinessCard = Database["public"]["Tables"]["business_cards"]["Row"]

export type BookingSettings =
  Database["public"]["Tables"]["booking_settings"]["Row"]

export type AnalyticsEvent =
  Database["public"]["Tables"]["analytics_events"]["Row"]

/* -------------------------------------------------------------------------- */
/* Insert Types                                                               */
/* -------------------------------------------------------------------------- */

export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]

export type BusinessInsert =
  Database["public"]["Tables"]["businesses"]["Insert"]

export type BusinessLinkInsert =
  Database["public"]["Tables"]["business_links"]["Insert"]

export type BusinessServiceInsert =
  Database["public"]["Tables"]["business_services"]["Insert"]

export type BusinessHourInsert =
  Database["public"]["Tables"]["business_hours"]["Insert"]

export type BusinessAppearanceInsert =
  Database["public"]["Tables"]["business_appearance"]["Insert"]

export type BusinessSectionInsert =
  Database["public"]["Tables"]["business_sections"]["Insert"]

export type BusinessCardInsert =
  Database["public"]["Tables"]["business_cards"]["Insert"]

export type BookingSettingsInsert =
  Database["public"]["Tables"]["booking_settings"]["Insert"]

export type AnalyticsEventInsert =
  Database["public"]["Tables"]["analytics_events"]["Insert"]

/* -------------------------------------------------------------------------- */
/* Update Types                                                               */
/* -------------------------------------------------------------------------- */

export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export type BusinessUpdate =
  Database["public"]["Tables"]["businesses"]["Update"]

export type BusinessLinkUpdate =
  Database["public"]["Tables"]["business_links"]["Update"]

export type BusinessServiceUpdate =
  Database["public"]["Tables"]["business_services"]["Update"]

export type BusinessHourUpdate =
  Database["public"]["Tables"]["business_hours"]["Update"]

export type BusinessAppearanceUpdate =
  Database["public"]["Tables"]["business_appearance"]["Update"]

export type BusinessSectionUpdate =
  Database["public"]["Tables"]["business_sections"]["Update"]

export type BusinessCardUpdate =
  Database["public"]["Tables"]["business_cards"]["Update"]

export type BookingSettingsUpdate =
  Database["public"]["Tables"]["booking_settings"]["Update"]

export type AnalyticsEventUpdate =
  Database["public"]["Tables"]["analytics_events"]["Update"]

/* -------------------------------------------------------------------------- */
/* Enum-like Constants                                                        */
/* -------------------------------------------------------------------------- */

export const CARD_TYPES = [
  "profile",
  "review",
  "menu",
  "booking",
  "social",
  "location",
] as const

export type CardType = (typeof CARD_TYPES)[number]

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number]
