"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ShoppingBag, Menu, X, Scissors, GraduationCap, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, getWhatsAppLink } from "@/lib/utils"

const links = [
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/custom-sewing", label: "Custom Sewing", icon: Scissors },
  { href: "/style-catalog", label: "Style Catalog", icon: Scissors },
  { href: "/fashion-school", label: "Fashion School", icon: GraduationCap },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          <span className="text-gold-gradient">Andrew&apos;s</span> Apparel
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold-600",
                pathname === l.href ? "text-gold-700" : "text-foreground/80"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cart">Cart</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button variant="gold" asChild>
            <Link href={getWhatsAppLink("Hi Andrew's Apparel, I want to place an order / custom sewing request.")}>
              WhatsApp
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium hover:bg-gold-50 hover:text-gold-700",
                  pathname === l.href ? "bg-gold-50 text-gold-700" : "text-foreground/80"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Button className="flex-1" variant="outline" asChild>
                <Link href="/cart">Cart</Link>
              </Button>
              <Button className="flex-1" variant="gold" asChild>
                <Link href={getWhatsAppLink("Hi Andrew's Apparel, I want to place an order / custom sewing request.")}>
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
