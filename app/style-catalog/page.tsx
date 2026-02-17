import Image from "next/image"
import Link from "next/link"
import { styles } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"

export default function StyleCatalogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Style Catalog</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Pick a style and we sew it to your measurements — even if it’s not in the store.
          </p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/custom-sewing">Start a request</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {styles.map((s) => (
          <div key={s.slug} id={s.slug} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative aspect-[4/5]">
              <Image src={s.images[0]} alt={s.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="mt-1 text-xs text-foreground/60">{s.outfitType}</p>
              <Button className="mt-3 w-full" variant="outline" asChild>
                <Link href="/custom-sewing">Sew this style</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
