import { notFound } from "next/navigation"

import { getPublicBusinessProfile } from "@/actions/business-profile"
import { ImageLightbox } from "@/components/profile/image-lightbox"

import type { BusinessMenuItem } from "@/types/database"

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `
  return `${symbol}${price.toLocaleString()}`
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    notFound()
  }

  const { menuCategories, menuItems } = profile

  // The layout only renders a Menu tab when menuItems.length > 0, so
  // this page is never reached with zero items — no empty state needed
  // here specifically.

  const uncategorized = menuItems.filter((item) => item.category_id === null)
  const grouped = menuCategories
    .map((category) => ({
      category,
      items: menuItems.filter((item) => item.category_id === category.id),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-8">
      {grouped.map(({ category, items }) => (
        <div key={category.id} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-foreground">
            {category.name}
          </h2>
          <MenuItemGrid items={items} />
        </div>
      ))}

      {uncategorized.length > 0 && (
        <div className="flex flex-col gap-3">
          {grouped.length > 0 && (
            <h2 className="text-sm font-medium text-foreground">Other</h2>
          )}
          <MenuItemGrid items={uncategorized} />
        </div>
      )}
    </div>
  )
}

function MenuItemGrid({ items }: { items: BusinessMenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          {item.image_url && (
            <ImageLightbox
              src={item.image_url}
              alt={item.name}
              thumbnailClassName="aspect-square w-full rounded-lg"
              sizes="(max-width: 448px) 50vw, 224px"
            />
          )}
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium text-foreground">
              {item.name}
            </span>
            {item.price !== null && (
              <span className="shrink-0 text-sm font-medium text-foreground">
                {formatPrice(item.price, item.currency)}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
