import Link from "next/link"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/demo-data"

export default function CartPage() {
  const items = allProducts.slice(0, 2)
  const subtotal = items.reduce((s, p) => s + p.price, 0)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Cart</h1>
      <p className="mt-2 text-sm text-foreground/70">Demo cart items for preview screenshots.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,0.4fr]">
        <div className="rounded-3xl border bg-white p-6">
          <div className="space-y-4">
            {items.map((p) => (
              <div key={p.slug} className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-foreground/70">Qty: 1</p>
                </div>
                <p className="font-bold text-gold-700">₦{p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold">Summary</p>
          <div className="mt-3 flex items-center justify-between text-sm text-foreground/70">
            <span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-foreground/70">
            <span>Shipping</span><span>₦2,500</span>
          </div>
          <div className="mt-4 flex items-center justify-between font-bold">
            <span>Total</span><span>₦{(subtotal + 2500).toLocaleString()}</span>
          </div>
          <Button className="mt-6 w-full" variant="gold" asChild>
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
          <Button className="mt-2 w-full" variant="outline" asChild>
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
