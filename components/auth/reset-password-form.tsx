"use client"

import { useState } from "react"
import Link from "next/link"

import { ArrowLeft, Loader2, Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Email required", {
        description: "Please enter your email address.",
      })
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })

    setLoading(false)

    if (error) {
      toast.error("Unable to send reset email", {
        description: error.message,
      })
      return
    }

    setSent(true)

    toast.success("Check your email", {
      description: "We've sent you a password reset link.",
    })
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm border bg-background">
            <Mail className="h-5 w-5" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight">
            Check your email
          </h1>

          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>

        <div className="rounded-sm border bg-background p-4 text-sm text-muted-foreground">
          <p>Didn't receive the email? Check your spam folder or try again.</p>
        </div>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="h-9 rounded-sm border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Try another email
        </button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Reset your password
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className={cn(
              "h-9 w-full rounded-sm border bg-background px-3 text-sm outline-none",
              "placeholder:text-muted-foreground",
              "focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </div>
  )
}
