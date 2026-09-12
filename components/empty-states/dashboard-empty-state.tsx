import { Link2, Wrench, Clock, CreditCard, Search } from "lucide-react"
import { EmptyState } from "../ui/empty-state"
export function LinksEmptyState() {
  return (
    <EmptyState
      icon={Link2}
      title="No links yet"
      description="Add your Facebook, Instagram, or Google Reviews so customers can find you in one tap."
      actionLabel="Add a link"
      actionHref="/dashboard/links/new"
    />
  )
}

export function ServicesEmptyState() {
  return (
    <EmptyState
      icon={Wrench}
      title="No services yet"
      description="List what you offer and what it costs. Customers see this before they book or walk in."
      actionLabel="Add a service"
      actionHref="/dashboard/services/new"
    />
  )
}

export function HoursEmptyState() {
  return (
    <EmptyState
      icon={Clock}
      title="Hours not set"
      description="Set your weekly hours so your profile can show whether you're open right now."
      actionLabel="Set hours"
      actionHref="/dashboard/hours"
    />
  )
}

export function CardsEmptyState() {
  return (
    <EmptyState
      icon={CreditCard}
      title="No cards linked"
      description="Once you receive your Taply card, link it here to connect it to this profile."
      actionLabel="Link a card"
      actionHref="/dashboard/cards/new"
    />
  )
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results"
      description={`Nothing matches "${query}". Try a different search.`}
    />
  )
}
