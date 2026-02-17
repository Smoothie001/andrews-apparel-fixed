import { notFound } from "next/navigation"
import { categories, allProducts } from "@/lib/demo-data"
import { ProductCard } from "@/components/shop/product-card"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug)
  if (!category) return notFound()

  const products = allProducts.filter((p) => p.category === category.slug).slice(0, 24)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">{category.name}</h1>
      <p className="mt-2 text-sm text-foreground/70">{category.description}</p>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  )
}
