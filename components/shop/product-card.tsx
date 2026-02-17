import Link from "next/link"
import Image from "next/image"
import { DemoProduct } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

export function ProductCard({ product, className }: { product: DemoProduct; className?: string }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground">
          {product.category.replace("-", " ")}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold">{product.name}</h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-gold-700">₦{product.price.toLocaleString()}</p>
          <p className="text-xs text-foreground/60">{product.fabricType ?? "Premium finish"}</p>
        </div>
      </div>
    </Link>
  )
}
