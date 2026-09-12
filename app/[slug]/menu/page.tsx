import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ImageOff } from "lucide-react"
import { getPublicBusinessProfile } from "@/actions/business-profile"
import type { BusinessMenuItem } from "@/types/database"

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

  return { title: `Menu – ${profile.business.name} | Taply` }
}

function formatPrice(price: number | string, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `
  const numeric = typeof price === "string" ? Number(price) : price

  return `${symbol}${numeric.toLocaleString()}`
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    notFound()
  }

  const { categories, items } = {
    categories: profile.menuCategories,
    items: profile.menuItems,
  }

  // The tab that links here is hidden when there are zero items (see
  // ProfileTabs), but someone could still hit this URL directly.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-sm font-medium text-foreground">No menu yet</p>
        <p className="text-sm text-muted-foreground">
          This business hasn&apos;t added menu items.
        </p>
      </div>
    )
  }

  const uncategorized = items.filter((item) => item.category_id === null)

  const grouped = categories
    .map((category) => ({
      category,
      items: items.filter((item) => item.category_id === category.id),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-10">
      {grouped.map(({ category, items: categoryItems }) => (
        <section key={category.id} className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-foreground">
            {category.name}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {categoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      {uncategorized.length > 0 && (
        <section className="flex flex-col gap-4">
          {grouped.length > 0 && (
            <h2 className="text-sm font-medium text-foreground">Other</h2>
          )}

          <div className="grid grid-cols-2 gap-3">
            {uncategorized.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function MenuItemCard({ item }: { item: BusinessMenuItem }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- per-business dynamic image hosts; see menu-popover.tsx
          <img
            src={item.image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff
              className="h-6 w-6 text-muted-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-foreground">
            {item.name}
          </span>

          {item.price !== null && (
            <span className="shrink-0 text-sm text-muted-foreground">
              {formatPrice(item.price, item.currency)}
            </span>
          )}
        </div>

        {item.description && (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
    </div>
  )
}
