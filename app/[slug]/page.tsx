import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import { GoogleReviewLink } from "@/components/profile/google-review-link"
import { LinksList } from "@/components/profile/links-list"
import { HoursList } from "@/components/profile/hours-list"
import { ProfileSetupPendingState } from "@/components/empty-states/profile-setup-pending"
import { resolveAppearanceForRender } from "@/lib/apperance"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug) // same cached call

  if (!profile) {
    return { title: "Profile not found | Taply" }
  }

  const { business } = profile

  return {
    title: `${business.name} | Taply`,
    description:
      business.description ??
      `Contact, services, and hours for ${business.name}.`,
    openGraph: {
      title: business.name,
      description: business.description ?? undefined,
      images: business.logo_url ? [business.logo_url] : undefined,
    },
  }
}

export default async function BusinessProfilePage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    notFound()
  }

  const { business, links, hours, appearance } = profile
  const activeAppearance = resolveAppearanceForRender(appearance)

  // Menu and Services now live on their own tabs (/menu, /services),
  // built conditionally in layout.tsx from real content — they're
  // intentionally not repeated here to avoid the double-navigation
  // problem (a business showing "Menu" both as a tab and a popover).
  const hasContent =
    links.length > 0 || hours.length > 0 || Boolean(business.google_review_url)

  if (!hasContent) {
    return <ProfileSetupPendingState />
  }

  return (
    <div className="flex flex-col gap-3">
      <GoogleReviewLink business={business} />

      {activeAppearance?.show_social_links !== false && (
        <LinksList links={links} />
      )}

      {activeAppearance?.show_hours !== false && <HoursList hours={hours} />}
    </div>
  )
}
