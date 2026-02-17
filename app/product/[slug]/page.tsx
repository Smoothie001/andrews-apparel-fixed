import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allProducts } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink } from "@/lib/utils"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = allProducts.find((p) => p.slug === params.slug)
  if (!product) return notFound()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-sm text-foreground/70">
        <Link className="hover:text-gold-700" href="/shop">Shop</Link> /{" "}
        <Link className="hover:text-gold-700" href={`/categories/${product.category}`}>
          {product.category.replace("-", " ")}
        </Link>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(product.images.length ? product.images : [product.images[0]]).slice(0,3).map((src, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-xl border">
                <Image src={src} alt={`${product.name} ${i+1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-foreground/70">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <p className="text-2xl font-extrabold text-gold-700">₦{product.price.toLocaleString()}</p>
            <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800">
              {product.fabricType ?? "Premium"}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">Available sizes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <span key={s} className="rounded-md border bg-white px-3 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="gold" asChild>
              <Link href="/checkout">Buy now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/cart">Add to cart</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href={getWhatsAppLink(`Hi Andrew's Apparel, I'm interested in: ${product.name} (${product.slug}).`)}>
                Ask on WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 rounded-2xl border bg-white p-6">
            <h2 className="font-display text-xl font-bold">Delivery & Returns</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li>• Nationwide delivery within Nigeria (international options available).</li>
              <li>• Estimated delivery: 2–5 business days (in-stock items).</li>
              <li>• Returns accepted within 7 days for eligible items (see Returns policy).</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
