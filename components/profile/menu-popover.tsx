import type { BusinessMenuCategory, BusinessMenuItem } from "@/types/database"

import { ListPopover } from "@/components/profile/list-popover"

interface MenuPopoverProps {
  categories: BusinessMenuCategory[]
  items: BusinessMenuItem[]
}

function formatPrice(price: number | string, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `
  const numeric = typeof price === "string" ? Number(price) : price

  return `${symbol}${numeric.toLocaleString()}`
}

/**
 * Not every business has a menu. This renders nothing unless there's
 * at least one enabled menu item — a barbershop or boutique simply
 * never shows this section, no empty-state clutter, no placeholder.
 */
export function MenuPopover({ categories, items }: MenuPopoverProps) {
  if (items.length === 0) {
    return null
  }

  const uncategorized = items.filter((item) => item.category_id === null)

  const grouped = categories
    .map((category) => ({
      category,
      items: items.filter((item) => item.category_id === category.id),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <ListPopover icon="menu" label="Menu" itemCount={items.length}>
      <div className="flex flex-col">
        {grouped.map(({ category, items: categoryItems }) => (
          <div key={category.id} className="flex flex-col">
            <span className="border-b border-border bg-muted px-4 py-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {category.name}
            </span>

            {categoryItems.map((item) => (
              <MenuItemRow key={item.id} item={item} />
            ))}
          </div>
        ))}

        {uncategorized.length > 0 && (
          <div className="flex flex-col">
            {grouped.length > 0 && (
              <span className="border-b border-border bg-muted px-4 py-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Other
              </span>
            )}

            {uncategorized.map((item) => (
              <MenuItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </ListPopover>
  )
}

function MenuItemRow({ item }: { item: BusinessMenuItem }) {
  return (
    <div className="flex items-center gap-3 border-b border-border p-4 last:border-b-0">
      {item.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- popover content is dynamic per-business; next/image domain config would need every business's host allow-listed
        <img
          src={item.image_url}
          alt=""
          className="h-12 w-12 shrink-0 rounded-md object-cover"
        />
      ) : (
        <div
          className="h-12 w-12 shrink-0 rounded-md bg-muted"
          aria-hidden="true"
        />
      )}

      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {item.name}
          </span>

          {item.description && (
            <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {item.description}
            </span>
          )}
        </div>

        {item.price !== null && (
          <span className="shrink-0 text-sm font-medium text-foreground">
            {formatPrice(item.price, item.currency)}
          </span>
        )}
      </div>
    </div>
  )
}
