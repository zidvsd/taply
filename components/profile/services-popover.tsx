import type { BusinessService } from "@/types/database"

import { ListPopover } from "@/components/profile/list-popover"

interface ServicesPopoverProps {
  services: BusinessService[]
}

function formatPrice(price: number | string, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `
  const numeric = typeof price === "string" ? Number(price) : price

  return `${symbol}${numeric.toLocaleString()}`
}

export function ServicesPopover({ services }: ServicesPopoverProps) {
  if (services.length === 0) {
    return null
  }

  return (
    <ListPopover icon="services" label="Services" itemCount={services.length}>
      <div className="flex flex-col">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-3 border-b border-border p-4 last:border-b-0"
          >
            {service.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element -- popover content is dynamic per-business; next/image domain config would need every business's host allow-listed
              <img
                src={service.image_url}
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
                  {service.name}
                </span>

                {service.description && (
                  <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {service.description}
                  </span>
                )}

                {service.duration_minutes !== null && (
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {service.duration_minutes} min
                  </span>
                )}
              </div>

              {service.price !== null && (
                <span className="shrink-0 text-sm font-medium text-foreground">
                  {formatPrice(service.price, service.currency)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ListPopover>
  )
}
