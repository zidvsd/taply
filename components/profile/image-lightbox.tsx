"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "../ui/visually-hidden"
interface ImageLightboxProps {
  src: string
  alt: string
  /** Thumbnail sizing/shape — passed straight to the trigger's image */
  thumbnailClassName: string
  sizes?: string
}

/**
 * Tap a thumbnail to open it full-size in a dialog. Used for service
 * and menu item photos on the public profile.
 *
 * Base UI's DialogTrigger renders a real <button> by default (there's
 * no `asChild` prop like Radix) — so the thumbnail image goes directly
 * inside it rather than the trigger wrapping an existing button.
 *
 * DialogContent ships with card padding/border meant for forms, which
 * we don't want around a photo, so those are overridden here to a
 * borderless full-bleed treatment. The built-in close button
 * (top-right X) is kept and repositioned to sit on top of the photo.
 */
export function ImageLightbox({
  src,
  alt,
  thumbnailClassName,
  sizes,
}: ImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={`relative overflow-hidden bg-muted ${thumbnailClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </DialogTrigger>

      <DialogContent
        className="max-w-lg gap-0 overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-lg [&>button]:top-3 [&>button]:right-3 [&>button]:rounded-full [&>button]:bg-background [&>button]:p-1.5 [&>button]:opacity-100"
        showCloseButton
      >
        {/* Dialog requires an accessible title for screen readers, but
            this dialog is purely visual (a photo) — hide it visually
            without removing it from the accessibility tree. */}
        <VisuallyHidden>
          <DialogTitle>{alt}</DialogTitle>
        </VisuallyHidden>

        <div className="relative aspect-square w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="512px"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
