"use client"

import { useState } from "react"
import { Radio } from "lucide-react"

export interface ProfileTheme {
  template: string
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  buttonStyle: string
  fontPairing: string
}

export function NfcCard() {
  const [cardTheme, setCardTheme] = useState<"dark" | "light">("dark")

  const isLight = cardTheme === "light"

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div
        className={`group relative flex aspect-[1.586/1] w-full max-w-135 flex-col overflow-hidden rounded-[18px] border p-5 shadow-[0_30px_90px_rgba(0,0,0,0.18)] transition-colors duration-300 select-none sm:p-8 ${
          isLight
            ? "border-[#E5E5EA] bg-[#FFFFFF]"
            : "border-[#2C2C2E] bg-[#000000]"
        }`}
      >
        {/* Subtle surface highlight */}
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent to-transparent transition-opacity duration-300 ${
            isLight ? "via-black/2" : "via-white/3"
          }`}
        />

        {/* Card header */}
        <div className="relative z-10 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`text-[22px] font-semibold tracking-tight ${
                isLight ? "text-[#0B0B0C]" : "text-white"
              }`}
            >
              Taply
            </span>

            <span
              className={`font-mono text-[11px] tracking-widest uppercase ${
                isLight ? "text-[#8E8E93]" : "text-[#6E6E73]"
              }`}
            >
              Edition 01
            </span>
          </div>

          <Radio
            className={`size-6.5 opacity-80 ${
              isLight ? "text-[#0B0B0C]" : "text-white"
            }`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Hardware ID */}
        <div className="relative z-10 flex flex-1 flex-col justify-center py-4 sm:py-8">
          <div
            className={`mb-1.5 font-mono text-[12px] tracking-widest uppercase ${
              isLight ? "text-[#8E8E93]" : "text-[#6E6E73]"
            }`}
          >
            Hardware ID
          </div>

          <div
            className={`font-mono text-[14px] tracking-widest ${
              isLight ? "text-[#0B0B0C]" : "text-white"
            }`}
          >
            TPLY-8840-NC
          </div>
        </div>

        {/* Card footer */}
        <div
          className={`relative z-10 flex shrink-0 items-end justify-between border-t pt-3 sm:pt-5 ${
            isLight ? "border-[#E5E5EA]" : "border-[#2C2C2E]/80"
          }`}
        >
          <div className="min-w-0">
            <div
              className={`truncate text-[17px] font-medium tracking-tight ${
                isLight ? "text-[#0B0B0C]" : "text-white"
              }`}
            >
              Julian Vance
            </div>

            <div
              className={`mt-0.5 truncate text-[13px] ${
                isLight ? "text-[#8E8E93]" : "text-[#6E6E73]"
              }`}
            >
              Studio Industrial Design
            </div>
          </div>

          {/* QR */}
          <div
            className={`ml-3 flex size-10 shrink-0 items-center justify-center rounded-sm p-1.5 sm:size-12 sm:rounded-[10px] ${
              isLight ? "bg-[#0B0B0C]" : "bg-white"
            }`}
          >
            <svg
              className={isLight ? "size-full text-white" : "size-full"}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 3h6v6H3zm2 2v2h2V5zm8-2h6v6h-6zm2 2v2h2V5zM3 13h6v6H3zm2 2v2h2v-2zm10 0h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm-2-4h2v2h-2zm4 4h2v2h-2zm-6-2h2v2h-2zm8-2h2v2h-2zm-2-2h2v2h-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={() =>
          setCardTheme((current) => (current === "light" ? "dark" : "light"))
        }
        aria-pressed={isLight}
        className="relative z-50 inline-flex touch-manipulation items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground active:scale-95"
      >
        <span
          className={`size-2.5 rounded-full border ${
            isLight ? "border-[#E5E5EA] bg-white" : "border-[#2C2C2E] bg-black"
          }`}
          aria-hidden="true"
        />

        {isLight ? "Light mode" : "Dark mode"}
      </button>
    </div>
  )
}
