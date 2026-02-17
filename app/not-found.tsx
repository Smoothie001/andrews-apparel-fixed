import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8 text-center">
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-sm text-foreground/70">
        The page you&apos;re looking for doesn&apos;t exist. Use the buttons below.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="gold" asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">Shop</Link>
        </Button>
      </div>
    </main>
  )
}
