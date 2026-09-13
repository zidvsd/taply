"use client"

import Image from "next/image"
import Link from "next/link"
import icon from "@/public/icon.svg"
import { UpdatePasswordForm } from "@/components/auth/update-password-form"
export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src={icon}
            alt="Taply"
            width={28}
            height={28}
            className="h-7 w-7"
          />

          <span className="text-sm font-semibold tracking-tight text-foreground">
            Taply
          </span>
        </Link>

        <UpdatePasswordForm />
      </div>
    </div>
  )
}
