import type { BusinessAppearance } from "@/types/database"
import type { CSSProperties } from "react"

/**
 * MVP: every business gets custom appearance applied, regardless of plan.
 * When custom themes become a paid tier, gate it here — this is the one
 * place that decides whether a business's own colors are used or the
 * app falls back to Taply's default black/white theme. Everything
 * downstream (buildAppearanceStyle) doesn't need to know about plans at
 * all; it just receives `appearance` or `null`.
 *
 * Example future gate:
 *   return business.plan === "business" || business.plan === "pro"
 *     ? appearance
 *     : null;
 */
export function resolveAppearanceForRender(
  appearance: BusinessAppearance | null
): BusinessAppearance | null {
  return appearance
}

const BUTTON_RADIUS: Record<string, string> = {
  pill: "9999px",
  rounded: "0.75rem",
  square: "0.25rem",
}

/**
 * Shared CSS-variable map, used by both buildAppearanceStyle (inline
 * style on <main>) and appearanceRootStyleTag (a <style> tag at
 * document root). Both need the exact same key/value pairs — this is
 * the one place that decides what those are.
 */
function appearanceCssVariables(
  appearance: BusinessAppearance | null
): Record<string, string> {
  if (!appearance) return {}

  const vars: Record<string, string> = {}

  if (appearance.background_color) {
    vars["--background"] = appearance.background_color
  }
  if (appearance.text_color) {
    vars["--foreground"] = appearance.text_color
    vars["--card-foreground"] = appearance.text_color
    vars["--popover-foreground"] = appearance.text_color
  }
  if (appearance.primary_color) {
    vars["--primary"] = appearance.primary_color
    // Buttons need readable text on top of the custom primary color.
    // We don't have a per-business "on-primary" field in the schema,
    // so derive it: light primary -> dark text, dark primary -> light text.
    vars["--primary-foreground"] = isLightColor(appearance.primary_color)
      ? "#000000"
      : "#FFFFFF"
  }
  if (appearance.accent_color) {
    vars["--accent"] = appearance.accent_color
    vars["--ring"] = appearance.accent_color
  }
  if (appearance.button_style && BUTTON_RADIUS[appearance.button_style]) {
    vars["--radius"] = BUTTON_RADIUS[appearance.button_style]
  }

  return vars
}

/**
 * Maps a business_appearance row onto the same CSS custom properties
 * globals.css defines (--background, --foreground, --primary, etc).
 * Every component already reads these via Tailwind's semantic classes
 * (bg-background, text-foreground, bg-primary...), so scoping this
 * style object to a wrapping div re-themes the whole profile with zero
 * changes to the components themselves.
 *
 * Any field that's missing or empty falls back to Taply's default
 * token (undefined = inherit from globals.css).
 */
export function buildAppearanceStyle(
  appearance: BusinessAppearance | null
): CSSProperties {
  return appearanceCssVariables(appearance) as CSSProperties
}

/**
 * Radix components (Popover, Dialog, DropdownMenu, etc.) render their
 * content in a portal appended to <body>, outside the <main> subtree
 * that buildAppearanceStyle themes. An inline `style` on <main> never
 * reaches portaled content, so if a themed profile ever uses a Radix
 * popover/dialog again, that content falls back to Taply's default
 * theme instead of the business's own colors.
 *
 * This returns a <style> tag body that sets the same variables at
 * :root, making them available document-wide so portaled content
 * matches. Safe to inject via dangerouslySetInnerHTML: values come
 * from business_appearance (hex colors, radius keywords), never from
 * unescaped user free-text.
 *
 * Returns null when there's nothing to override, so callers can skip
 * rendering the tag entirely.
 */
export function appearanceRootStyleTag(
  appearance: BusinessAppearance | null
): string | null {
  const vars = appearanceCssVariables(appearance)
  const entries = Object.entries(vars)

  if (entries.length === 0) return null

  const declarations = entries
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ")

  return `:root { ${declarations} }`
}

export function appearanceFontFamily(
  appearance: BusinessAppearance | null
): string | undefined {
  return appearance?.font_pairing || undefined
}

/** Rough luminance check so button text stays readable on a custom color. */
function isLightColor(hex: string): boolean {
  const normalized = hex.replace("#", "")
  if (normalized.length !== 6) return false

  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
