import type { BusinessService } from "@/types/database"

interface ServicesListProps {
  services: BusinessService[]
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `
  return `${symbol}${price.toLocaleString()}`
}

export function ServicesList({ services }: ServicesListProps) {
  if (services.length === 0) return null

  return (
    <div className="flex flex-col">
      <span className="mb-2 px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Services
      </span>
      <div className="flex flex-col rounded-lg border border-border">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={
              index < services.length - 1
                ? "flex items-center justify-between border-b border-border p-4"
                : "flex items-center justify-between p-4"
            }
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {service.name}
              </span>
              {service.description && (
                <span className="mt-0.5 text-xs text-muted-foreground">
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
              <span className="shrink-0 pl-4 text-sm font-medium text-foreground">
                {formatPrice(service.price, service.currency)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
