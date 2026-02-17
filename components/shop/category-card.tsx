import Link from "next/link"
import Image from "next/image"
import { DemoCategory } from "@/lib/demo-data"

export function CategoryCard({ category }: { category: DemoCategory }) {
  return (
    <Link href={`/categories/${category.slug}`} className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-lg font-bold text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-white/85">{category.description}</p>
        </div>
      </div>
    </Link>
  )
}
