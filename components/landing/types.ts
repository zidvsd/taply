import type { LucideIcon } from "lucide-react"

export interface NavLink {
  label: string
  href: string
}

export interface Step {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

export interface BusinessType {
  title: string
  description: string
  icon: LucideIcon
}

export interface ProfileAction {
  label: string
  icon: LucideIcon
  primary?: boolean
}

export interface PricingTier {
  name: string
  price: string
  currency: string
  description: string
  features: string[]
  cardCount: number
  highlighted?: boolean
}
