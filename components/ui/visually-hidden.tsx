import * as React from "react"

/**
 * Base UI has no built-in VisuallyHidden primitive (unlike Radix's
 * @radix-ui/react-visually-hidden). This is the standard sr-only
 * technique used across most accessible component libraries: content
 * stays in the accessibility tree and announced by screen readers,
 * but is clipped to 1px and removed from visual layout.
 */
export function VisuallyHidden({
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
