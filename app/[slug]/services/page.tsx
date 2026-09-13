import { notFound } from "next/navigation"

import { getPublicBusinessProfile } from "@/actions/business-profile"
import { ImageLightbox } from "@/components/profile/image-lightbox"

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "PHP" ? "₱" : `${currency} `

  return `${symbol}${price.toLocaleString()}`
}

export default async function ServicesPage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getPublicBusinessProfile(slug)

  if (!profile) {
    notFound()
  }

  const { services } = profile

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={
            index < services.length - 1 ? "border-b border-border p-4" : "p-4"
          }
        >
          <div className="flex gap-4">
            {service.image_url && (
              <ImageLightbox
                src={service.image_url}
                alt={service.name}
                thumbnailClassName="h-20 w-20 shrink-0 rounded-md border border-border"
              />
            )}

            <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col">
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
                <span className="shrink-0 text-sm font-medium text-foreground">
                  {formatPrice(service.price, service.currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
