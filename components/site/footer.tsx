import Link from "next/link"
import { getWhatsAppLink } from "@/lib/utils"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-display text-lg font-bold">
              <span className="text-gold-gradient">Andrew&apos;s</span> Apparel
            </div>
            <p className="mt-3 text-sm text-foreground/70">
              Premium African fashion, custom sewing, and fashion training — built with clean finishing and comfort.
            </p>
            <a
              className="mt-4 inline-flex text-sm font-medium text-gold-700 hover:text-gold-800"
              href={getWhatsAppLink("Hi Andrew's Apparel, I have a question.")}
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li><Link className="hover:text-gold-700" href="/shop">All Products</Link></li>
              <li><Link className="hover:text-gold-700" href="/categories/agbada">Agbada</Link></li>
              <li><Link className="hover:text-gold-700" href="/categories/native-ankara">Native & Ankara</Link></li>
              <li><Link className="hover:text-gold-700" href="/categories/jalabiya">Jalabiya</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li><Link className="hover:text-gold-700" href="/custom-sewing">Custom Sewing</Link></li>
              <li><Link className="hover:text-gold-700" href="/style-catalog">Style Catalog</Link></li>
              <li><Link className="hover:text-gold-700" href="/fashion-school">Fashion School</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li><Link className="hover:text-gold-700" href="/about">About</Link></li>
              <li><Link className="hover:text-gold-700" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-gold-700" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-gold-700" href="/policies/returns">Returns</Link></li>
              <li><Link className="hover:text-gold-700" href="/policies/privacy">Privacy</Link></li>
              <li><Link className="hover:text-gold-700" href="/policies/terms">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Andrew&apos;s Apparel. All rights reserved.</p>
          <p>Lokoja, Kogi • Custom sewing & ready-made luxury.</p>
        </div>
      </div>
    </footer>
  )
}
