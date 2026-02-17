export type DemoCategory = {
  name: string
  slug: string
  description: string
  image: string
}

export type DemoProduct = {
  name: string
  slug: string
  category: string
  price: number
  fabricType?: string
  gender?: "Male" | "Female" | "Unisex"
  images: string[]
  description: string
  sizes: string[]
}

export type DemoStyle = {
  name: string
  slug: string
  outfitType: string
  images: string[]
  description: string
}

export type DemoCourse = {
  name: string
  slug: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  fee: number
  highlights: string[]
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const categories: DemoCategory[] = [
  {
    name: "Agbada",
    slug: "agbada",
    description: "Premium Agbada sets crafted for weddings, events, and royalty.",
    image: u("photo-1520975958225-2b53a4f4aa27"),
  },
  {
    name: "Native & Ankara",
    slug: "native-ankara",
    description: "Modern native fits and Ankara styles for everyday drip.",
    image: u("photo-1520975661595-6453be3f7070"),
  },
  {
    name: "Jalabiya",
    slug: "jalabiya",
    description: "Clean, classy jalabiya for comfort and elegance.",
    image: u("photo-1520975682031-a5c2b5d7f0b8"),
  },
  {
    name: "Vintage",
    slug: "vintage",
    description: "Timeless vintage pieces and inspired looks.",
    image: u("photo-1520975869019-1c2f4e4c2d70"),
  },
  {
    name: "Caps",
    slug: "caps",
    description: "Fitted caps, embroidered designs, and traditional caps.",
    image: u("photo-1520975741138-6d8d0c2b3a8b"),
  },
  {
    name: "Shoes",
    slug: "shoes",
    description: "Classic loafers, sandals, and matching footwear.",
    image: u("photo-1520975708791-2b9a4c9cf5a0"),
  },
]

const makeProduct = (p: Omit<DemoProduct, "description"> & { desc?: string }): DemoProduct => ({
  ...p,
  description:
    p.desc ??
    "Tailored with premium finishing, breathable lining, and a confident fit. Perfect for events and everyday luxury.",
})

export const products: DemoProduct[] = [
  makeProduct({
    name: "Royal Agbada Set – Champagne Gold",
    slug: "royal-agbada-champagne-gold",
    category: "agbada",
    price: 145000,
    fabricType: "Guinea Brocade",
    gender: "Male",
    images: [u("photo-1520975898741-27b2a8bd7edc"), u("photo-1520975905482-4aab6b7b9f27")],
    sizes: ["S", "M", "L", "XL", "XXL"],
  }),
  makeProduct({
    name: "Classic Senator Wear – Midnight Black",
    slug: "classic-senator-midnight-black",
    category: "native-ankara",
    price: 72000,
    fabricType: "Cotton",
    gender: "Male",
    images: [u("photo-1520975951596-9e4e1d2b1ed4")],
    sizes: ["S", "M", "L", "XL", "XXL"],
  }),
  makeProduct({
    name: "Ankara Two-Piece – Bold Patterns",
    slug: "ankara-two-piece-bold-patterns",
    category: "native-ankara",
    price: 55000,
    fabricType: "Ankara Wax",
    gender: "Unisex",
    images: [u("photo-1520975757190-4e5cbd0fa55f")],
    sizes: ["S", "M", "L", "XL"],
  }),
  makeProduct({
    name: "Modern Jalabiya – Stone Grey",
    slug: "modern-jalabiya-stone-grey",
    category: "jalabiya",
    price: 68000,
    fabricType: "Linen Blend",
    gender: "Male",
    images: [u("photo-1520975709769-3d6a9490e3f5")],
    sizes: ["S", "M", "L", "XL", "XXL"],
  }),
  makeProduct({
    name: "Vintage Street Set – Denim Blue",
    slug: "vintage-street-set-denim-blue",
    category: "vintage",
    price: 49000,
    fabricType: "Denim",
    gender: "Unisex",
    images: [u("photo-1520975861430-7fe24f9d2fd3")],
    sizes: ["S", "M", "L", "XL"],
  }),
  makeProduct({
    name: "Embroidered Traditional Cap – Gold Thread",
    slug: "embroidered-traditional-cap-gold-thread",
    category: "caps",
    price: 12000,
    images: [u("photo-1520975747436-3a4c0d7e77f9")],
    sizes: ["One Size"],
  }),
  makeProduct({
    name: "Handmade Leather Loafers – Espresso",
    slug: "handmade-leather-loafers-espresso",
    category: "shoes",
    price: 38000,
    images: [u("photo-1520975713296-7a9b0b07f812")],
    sizes: ["40", "41", "42", "43", "44", "45"],
  }),
]

// Expand to ~30 products by cloning with variations
const extra = []
for (let i = 0; i < 24; i++) {
  const base = products[i % products.length]
  extra.push(
    makeProduct({
      ...base,
      name: `${base.name} (Edition ${i + 1})`,
      slug: `${base.slug}-ed-${i + 1}`,
      price: Math.round(base.price * (0.9 + (i % 6) * 0.05)),
      images: [base.images[0]],
    })
  )
}
export const allProducts: DemoProduct[] = [...products, ...extra]

export const styles: DemoStyle[] = Array.from({ length: 20 }).map((_, i) => ({
  name: `Custom Style #${i + 1}`,
  slug: `custom-style-${i + 1}`,
  outfitType: ["Agbada", "Native", "Jalabiya", "Ankara", "Vintage"][i % 5],
  images: [u("photo-1520975898741-27b2a8bd7edc"), u("photo-1520975757190-4e5cbd0fa55f")].slice(0, (i % 2) + 1),
  description:
    "Pick this style and we’ll sew it to your measurements. Choose fabric, timeline, and finishing.",
}))

export const courses: DemoCourse[] = [
  {
    name: "Fashion & Sewing Fundamentals",
    slug: "fundamentals",
    level: "Beginner",
    duration: "6 weeks",
    fee: 85000,
    highlights: ["Measurements & cutting", "Basic machine handling", "Simple shirt & trouser"],
  },
  {
    name: "Native Wear Mastery",
    slug: "native-wear-mastery",
    level: "Intermediate",
    duration: "8 weeks",
    fee: 120000,
    highlights: ["Senator & Kaftan", "Finishing & lining", "Pattern adjustments"],
  },
  {
    name: "Agbada & Luxury Finishing",
    slug: "agbada-luxury",
    level: "Advanced",
    duration: "10 weeks",
    fee: 180000,
    highlights: ["Brocade handling", "Embroidery basics", "Premium finishing workflows"],
  },
]
