import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"
import { getPublicBusinessProfile } from "@/actions/business-profile"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    return { title: "Profile not found | Taply" }
  }

  return { title: `Reviews – ${profile.business.name} | Taply` }
}

/**
 * Placeholder until the Google Places API integration is wired up.
 * Once that's ready, replace the body below with real review cards —
 * keep the same notFound()/metadata scaffolding, this shell doesn't
 * need to change.
 */
export default async function ReviewsPage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    notFound()
  }

  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <Star
        className="h-6 w-6 text-muted-foreground"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-foreground">Reviews coming soon</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        This section will show what customers are saying on Google.
      </p>
    </div>
  )
}
