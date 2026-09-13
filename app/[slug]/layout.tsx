import { notFound } from "next/navigation"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import { ProfileHeader } from "@/components/profile/profile-header"
import { PrimaryActions } from "@/components/profile/primary-actions"
import { ProfileFootnote } from "@/components/profile/profile-footnote"
import { ProfileTabs, type ProfileTab } from "@/components/profile/profile-tabs"
import {
  appearanceFontFamily,
  appearanceRootStyleTag,
  buildAppearanceStyle,
  resolveAppearanceForRender,
} from "@/lib/apperance"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function BusinessProfileLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug) // deduped via cache()

  if (!profile) {
    notFound()
  }

  const { business, hours, appearance, services, menuItems } = profile
  const activeAppearance = resolveAppearanceForRender(appearance)
  const rootStyleTag = appearanceRootStyleTag(activeAppearance)

  // Tabs are built from what the business actually has — no tab ever
  // points to an empty or "coming soon" page. Order matches the
  // priority customers care about: profile, menu, services, reviews.
  const tabs: ProfileTab[] = [{ label: "Profile", href: "", segment: "" }]

  if (menuItems.length > 0) {
    tabs.push({ label: "Menu", href: "menu", segment: "menu" })
  }
  if (services.length > 0) {
    tabs.push({ label: "Services", href: "services", segment: "services" })
  }
  if (business.google_review_url) {
    tabs.push({ label: "Reviews", href: "reviews", segment: "reviews" })
  }

  return (
    <>
      {/*
        Radix Popover/Dialog/DropdownMenu content renders in a portal
        appended to <body>, outside this subtree — so the inline
        `style` on <main> below never reaches it. Setting the same
        custom properties at :root makes them available document-wide,
        so any portaled content (should we use a popover/dialog again)
        matches this business's theme instead of Taply's default.
        Safe to inline: values come from business_appearance, not
        unescaped user free-text.
      */}
      {rootStyleTag && (
        <style dangerouslySetInnerHTML={{ __html: rootStyleTag }} />
      )}

      <main
        className="min-h-screen bg-background px-4 pt-8 pb-16"
        style={{
          ...buildAppearanceStyle(activeAppearance),
          fontFamily: appearanceFontFamily(activeAppearance),
        }}
      >
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          {activeAppearance?.show_logo !== false && (
            <ProfileHeader business={business} hours={hours} />
          )}

          <PrimaryActions business={business} />

          <ProfileTabs slug={slug} tabs={tabs} />

          <div className="flex flex-col gap-8">
            {children}
            <ProfileFootnote />
          </div>
        </div>
      </main>
    </>
  )
}
