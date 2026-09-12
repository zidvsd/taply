"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UtensilsCrossed, Wrench } from "lucide-react"

interface ListPopoverProps {
  icon: "menu" | "services"
  label: string
  itemCount: number
  children: ReactNode
}

/**
 * Shared trigger + scrollable content shell for any "tap to see a list"
 * section on the profile page (menu, services). Keeps the visual
 * language identical between the two instead of hand-building the
 * popover chrome twice.
 */

const iconMap: Record<ListPopoverProps["icon"], LucideIcon> = {
  menu: UtensilsCrossed,
  services: Wrench,
}

export function ListPopover({
  icon,
  label,
  itemCount,
  children,
}: ListPopoverProps) {
  const Icon = iconMap[icon]

  return (
    <Popover>
      <PopoverTrigger className="flex w-full items-center justify-between rounded-lg border border-border p-4 text-left">
        <div className="flex items-center gap-3">
          <Icon
            className="h-5 w-5 text-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>

        <span className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="max-h-96 w-[calc(100vw-2rem)] max-w-md overflow-y-auto p-0"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
