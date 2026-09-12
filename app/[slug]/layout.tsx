import { notFound } from "next/navigation"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import { ProfileHeader } from "@/components/profile/profile-header"
import { PrimaryActions } from "@/components/profile/primary-actions"
import { ProfileFootnote } from "@/components/profile/profile-footnote"
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

export default async function BusinessLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug) // deduped via cache()
  if (!profile) {
    notFound()
  }

  const { business, hours, appearance } = profile
  const activeAppearance = resolveAppearanceForRender(appearance)
  const rootStyleTag = appearanceRootStyleTag(activeAppearance)

  return (
    <>
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
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          {activeAppearance?.show_logo !== false && (
            <ProfileHeader business={business} hours={hours} />
          )}

          <PrimaryActions business={business} />

          {children}

          <ProfileFootnote />
        </div>
      </main>
    </>
  )
}
