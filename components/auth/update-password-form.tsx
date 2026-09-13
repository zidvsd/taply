"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Loader2, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export function UpdatePasswordForm() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 8) {
      toast.error("Password too short", {
        description: "Your password must be at least 8 characters.",
      })
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are the same.",
      })
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      toast.error("Unable to update password", {
        description: error.message,
      })
      return
    }

    // Clear the form after successful update
    setPassword("")
    setConfirmPassword("")

    toast.success("Password updated", {
      description: "Your password has been changed successfully.",
    })

    setTimeout(() => {
      router.push("/dashboard")
      router.refresh()
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm border bg-background">
          <Lock className="h-5 w-5" />
        </div>

        <h1 className="text-xl font-semibold tracking-tight">
          Create a new password
        </h1>

        <p className="text-sm text-muted-foreground">
          Choose a new password for your Taply account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            New password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            minLength={8}
            className={cn(
              "h-9 w-full rounded-sm border bg-background px-3 text-sm outline-none",
              "placeholder:text-muted-foreground",
              "focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm password
          </label>

          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
            minLength={8}
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
              Updating...
            </>
          ) : (
            "Update password"
          )}
        </button>
      </form>
    </div>
  )
}
