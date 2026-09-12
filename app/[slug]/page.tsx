import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import { GoogleReviewLink } from "@/components/profile/google-review-link"
import { ServicesPopover } from "@/components/profile/services-popover"
import { MenuPopover } from "@/components/profile/menu-popover"
import { LinksList } from "@/components/profile/links-list"
import { HoursList } from "@/components/profile/hours-list"
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

  const {
    business,
    links,
    services,
    hours,
    appearance,
    menuCategories,
    menuItems,
  } = profile
  const activeAppearance = resolveAppearanceForRender(appearance)

  return (
    <div className="flex flex-col gap-3">
      <GoogleReviewLink business={business} />

      <MenuPopover categories={menuCategories} items={menuItems} />

      {activeAppearance?.show_services !== false && (
        <ServicesPopover services={services} />
      )}

      {activeAppearance?.show_social_links !== false && (
        <LinksList links={links} />
      )}

      {activeAppearance?.show_hours !== false && <HoursList hours={hours} />}
    </div>
  )
}
