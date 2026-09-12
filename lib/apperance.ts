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
 * Maps a business_appearance row onto the same CSS custom properties
 * globals.css defines (--background, --foreground, --primary, etc).
 * Every component already reads these via Tailwind's semantic classes
 * (bg-background, text-foreground, bg-primary...), so scoping this
 * style object to a wrapping div re-themes the whole profile with zero
 * changes to the components themselves.
 *
 * Any field that's missing or empty falls back to Taply's default
 * token (undefined = inherit from globals.css).
 *
 * NOTE: this object is used two ways —
 *   1. Inline `style` on <main> (themes everything actually inside it)
 *   2. Serialized into a :root <style> block in the layout (themes
 *      Radix portals — popovers, dropdowns, dialogs — which render on
 *      <body> and are NOT descendants of <main>, so inline style alone
 *      never reaches them). See appearanceRootStyleTag() below.
 */
export function buildAppearanceStyle(
  appearance: BusinessAppearance | null
): CSSProperties {
  if (!appearance) return {}

  const style: Record<string, string> = {}

  if (appearance.background_color) {
    style["--background"] = appearance.background_color
    // Popover/dropdown surfaces and muted section headers (e.g. menu
    // category dividers) should read as "the same surface" as the
    // page, not the app's default white/gray.
    style["--popover"] = appearance.background_color
    style["--muted"] = mutedTint(
      appearance.background_color,
      appearance.text_color
    )
  }
  if (appearance.text_color) {
    style["--foreground"] = appearance.text_color
    style["--card-foreground"] = appearance.text_color
    style["--popover-foreground"] = appearance.text_color
    style["--muted-foreground"] = appearance.text_color
  }
  if (appearance.primary_color) {
    style["--primary"] = appearance.primary_color
    // Buttons need readable text on top of the custom primary color.
    // We don't have a per-business "on-primary" field in the schema,
    // so derive it: light primary -> dark text, dark primary -> light text.
    style["--primary-foreground"] = isLightColor(appearance.primary_color)
      ? "#000000"
      : "#FFFFFF"
  }
  if (appearance.accent_color) {
    style["--accent"] = appearance.accent_color
    style["--ring"] = appearance.accent_color
  }
  if (appearance.button_style && BUTTON_RADIUS[appearance.button_style]) {
    style["--radius"] = BUTTON_RADIUS[appearance.button_style]
  }

  return style as CSSProperties
}

/**
 * Same values as buildAppearanceStyle, serialized as a :root rule.
 * Render this via <style dangerouslySetInnerHTML> once per business
 * page (in the [slug] layout) so CSS variables are available document-
 * wide — including inside Radix portals (Popover/Dialog/DropdownMenu
 * content), which mount on <body> and fall outside <main>'s inline
 * style. Values come from the server (business_appearance row), not
 * user free-text input, so this isn't an XSS injection point — but if
 * that ever changes, sanitize before interpolating.
 */
export function appearanceRootStyleTag(
  appearance: BusinessAppearance | null
): string | null {
  if (!appearance) return null

  const style = buildAppearanceStyle(appearance) as Record<string, string>
  const entries = Object.entries(style)

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

/**
 * Derives a "muted surface" tone from the business's background color —
 * a slightly shifted shade used for section dividers (e.g. menu
 * category headers) so they read as a subtle variation of the page
 * background rather than a hardcoded gray that clashes with custom
 * themes. Shifts toward the text color by a small amount rather than
 * toward a fixed gray, so it works for both light and dark
 * background_color values.
 */
function mutedTint(backgroundHex: string, textHex: string | null): string {
  const bg = parseHex(backgroundHex)
  const fg = parseHex(textHex ?? "#000000")

  if (!bg || !fg) return backgroundHex

  const amount = 0.06 // subtle — just enough to separate from background

  const mix = (a: number, b: number) => Math.round(a + (b - a) * amount)

  const r = mix(bg.r, fg.r)
  const g = mix(bg.g, fg.g)
  const b = mix(bg.b, fg.b)

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "")
  if (normalized.length !== 6) return null

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function toHex(value: number): string {
  return Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0")
}
