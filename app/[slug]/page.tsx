import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import { ProfileHeader } from "@/components/profile/profile-header"
import { PrimaryActions } from "@/components/profile/primary-actions"
import { GoogleReviewLink } from "@/components/profile/google-review-link"
import { ServicesList } from "@/components/profile/services-list"
import { LinksList } from "@/components/profile/links-list"
import { HoursList } from "@/components/profile/hours-list"
import { ProfileFootnote } from "@/components/profile/profile-footnote"
import { ProfileSetupPendingState } from "@/components/empty-states/profile-setup-pending"
import {
  appearanceFontFamily,
  buildAppearanceStyle,
  resolveAppearanceForRender,
} from "@/lib/apperance"

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

  const { business, links, services, hours, appearance } = profile

  // Single gating point for the future pricing tier lock — see
  // lib/appearance.ts. For MVP this just returns `appearance` unchanged.
  const activeAppearance = resolveAppearanceForRender(appearance)

  const hasContent =
    links.length > 0 ||
    services.length > 0 ||
    hours.length > 0 ||
    Boolean(business.google_review_url)

  return (
    <main
      className="min-h-screen bg-background px-4 pt-8 pb-16"
      style={{
        ...buildAppearanceStyle(activeAppearance),
        fontFamily: appearanceFontFamily(activeAppearance),
      }}
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        {activeAppearance?.show_logo !== false && (
          <ProfileHeader business={business} hours={hours} />
        )}

        <PrimaryActions business={business} />

        <GoogleReviewLink business={business} />

        {hasContent ? (
          <>
            {activeAppearance?.show_services !== false && (
              <ServicesList services={services} />
            )}
            {activeAppearance?.show_social_links !== false && (
              <LinksList links={links} />
            )}
            {activeAppearance?.show_hours !== false && (
              <HoursList hours={hours} />
            )}
          </>
        ) : (
          <ProfileSetupPendingState />
        )}

        <ProfileFootnote />
      </div>
    </main>
  )
}
