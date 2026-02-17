import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Scissors, GraduationCap, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/shop/category-card"
import { ProductCard } from "@/components/shop/product-card"
import { categories, allProducts } from "@/lib/demo-data"

export default function HomePage() {
  const featured = allProducts.slice(0, 8)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1520975898741-27b2a8bd7edc?auto=format&fit=crop&w=1800&q=80"
            alt="Premium fashion"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20">
              <Star className="h-4 w-4 text-gold-400" /> Premium finishing • Lokoja, Kogi
            </p>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready-made luxury & bespoke tailoring — built to your measurements.
            </h1>
            <p className="mt-4 text-base text-white/85 sm:text-lg">
              Shop Agbada, Native/Ankara, Jalabiya, Vintage, Caps & Shoes — or upload your own style and we sew it for you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="gold" asChild>
                <Link href="/shop">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/15" asChild>
                <Link href="/custom-sewing">
                  Custom Sewing <Scissors className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/fashion-school">
                  Learn Fashion <GraduationCap className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15">
              <div>
                <p className="text-2xl font-bold">48–72h</p>
                <p className="text-xs text-white/80">Express option</p>
              </div>
              <div>
                <p className="text-2xl font-bold">30+</p>
                <p className="text-xs text-white/80">Demo products</p>
              </div>
              <div>
                <p className="text-2xl font-bold">20</p>
                <p className="text-xs text-white/80">Style catalog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-sm text-foreground/70">Explore ready-made pieces and accessories.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/shop" className="inline-flex items-center">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-gold-50/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">Featured Pieces</h2>
              <p className="mt-2 text-sm text-foreground/70">Curated picks for screenshots & a premium look.</p>
            </div>
            <Button variant="gold" asChild>
              <Link href="/shop">
                Shop now <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border bg-white p-8 shadow-sm md:grid-cols-2 md:items-center md:p-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-4 py-2 text-xs font-semibold text-gold-800">
              <Scissors className="h-4 w-4" /> Custom Sewing
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold">Upload your style. Add measurements. We sew.</h3>
            <p className="mt-3 text-sm text-foreground/70">
              Choose from our style catalog or upload your own design. Save measurement profiles and request a quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold" asChild>
                <Link href="/custom-sewing">
                  Start a request <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/style-catalog">Browse styles</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1520975757190-4e5cbd0fa55f?auto=format&fit=crop&w=1400&q=80"
              alt="Custom tailoring"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
