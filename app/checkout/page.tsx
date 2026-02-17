"use client"

import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-sm text-foreground/70">Preview checkout — connect Stripe/Paystack later.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-sm font-semibold">Delivery details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input className="h-11 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="Full name" />
            <input className="h-11 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="Phone" />
            <input className="sm:col-span-2 h-11 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="Address" />
            <input className="h-11 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="City" />
            <input className="h-11 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300" placeholder="State" />
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-sm font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-foreground/70">Choose a method (demo).</p>
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 rounded-xl border p-4 text-sm">
              <input type="radio" name="pm" defaultChecked /> Stripe (Card)
            </label>
            <label className="flex items-center gap-2 rounded-xl border p-4 text-sm">
              <input type="radio" name="pm" /> Paystack
            </label>
            <label className="flex items-center gap-2 rounded-xl border p-4 text-sm">
              <input type="radio" name="pm" /> Bank Transfer
            </label>
          </div>

          <Button className="mt-6 w-full" variant="gold" onClick={() => alert("Demo payment. Wire real payments next.")}>
            Pay now
          </Button>
        </div>
      </div>
    </main>
  )
}
