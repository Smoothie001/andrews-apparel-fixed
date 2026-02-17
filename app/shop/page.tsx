"use client"

import { useMemo, useState } from "react"
import { allProducts, categories } from "@/lib/demo-data"
import { ProductCard } from "@/components/shop/product-card"
import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<string>("all")
  const [sort, setSort] = useState<"new" | "low" | "high">("new")

  const products = useMemo(() => {
    let items = allProducts
    if (cat !== "all") items = items.filter((p) => p.category === cat)
    if (q.trim()) {
      const s = q.toLowerCase()
      items = items.filter((p) => p.name.toLowerCase().includes(s) || (p.fabricType ?? "").toLowerCase().includes(s))
    }
    if (sort === "low") items = [...items].sort((a, b) => a.price - b.price)
    if (sort === "high") items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [q, cat, sort])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Shop Collection</h1>
          <p className="mt-2 text-sm text-foreground/70">Ready-made outfits and accessories with a premium finish.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300 sm:w-64"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"
          >
            <option value="new">Sort: Newest</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
          <Button variant="gold" onClick={() => { setQ(""); setCat("all"); setSort("new") }}>
            Reset
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  )
}
