"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StudentStudent LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold">Student Login</h1>
        <p className="mt-2 text-sm text-foreground/70">Welcome back. This is a demo auth screen for preview.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="you@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="********" />
          </div>
          <Button className="w-full" variant="gold" type="button" onClick={() => alert("Demo login. Connect DB auth next.")}>
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          New here?{" "}
          <Link className="font-medium text-gold-700 hover:text-gold-800" href="/student/register">
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}
