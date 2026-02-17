import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { courses } from "@/lib/demo-data"

export default function FashionSchoolPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm md:p-12">
        <p className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-4 py-2 text-xs font-semibold text-gold-800">
          <GraduationCap className="h-4 w-4" /> Fashion School
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Learn sewing & fashion professionally</h1>
        <p className="mt-3 max-w-2xl text-sm text-foreground/70">
          Hands-on training for beginners to advanced learners. Build real outfits, master finishing, and learn pattern adjustments.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {courses.map((c) => (
            <div key={c.slug} className="rounded-2xl border bg-white p-6">
              <p className="text-xs font-semibold text-gold-800">{c.level}</p>
              <p className="mt-2 font-display text-xl font-bold">{c.name}</p>
              <p className="mt-1 text-sm text-foreground/70">{c.duration}</p>
              <p className="mt-4 text-2xl font-extrabold text-gold-700">₦{c.fee.toLocaleString()}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {c.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant="gold" asChild>
                <Link href="/student/register">Register</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/student/login">Student Login</Link>
          </Button>
          <Button variant="gold" asChild>
            <Link href="/student/register">Join now</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
