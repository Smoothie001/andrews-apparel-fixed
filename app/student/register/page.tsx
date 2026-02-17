"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StudentRegisterPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold">Student Registration</h1>
        <p className="mt-2 text-sm text-foreground/70">Register for sewing & fashion training (preview form).</p>

        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Full name</label>
            <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="you@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="+234..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Choose course</label>
            <select className="mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300">
              <option>Fashion & Sewing Fundamentals (Beginner)</option>
              <option>Native Wear Mastery (Intermediate)</option>
              <option>Agbada & Luxury Finishing (Advanced)</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Upload ID (optional)</label>
            <input type="file" className="mt-2 block w-full rounded-md border bg-white p-3 text-sm" />
          </div>

          <div className="sm:col-span-2">
            <Button className="w-full" variant="gold" type="button" onClick={() => alert("Registered (demo). Connect payments + DB next.")}>
              Register
            </Button>
            <p className="mt-4 text-center text-sm text-foreground/70">
              Already registered?{" "}
              <Link className="font-medium text-gold-700 hover:text-gold-800" href="/student/login">
                Student Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
