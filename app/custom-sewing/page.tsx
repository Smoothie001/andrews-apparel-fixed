"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { courses, styles } from "@/lib/demo-data"

const outfitTypes = ["Agbada", "Native", "Jalabiya", "Ankara", "Vintage", "Other"] as const

export default function CustomSewingPage() {
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState<"upload" | "catalog">("upload")

  const [outfit, setOutfit] = useState<(typeof outfitTypes)[number]>("Agbada")
  const [timeline, setTimeline] = useState<"Standard" | "Express">("Standard")
  const [notes, setNotes] = useState("")
  const [profileName, setProfileName] = useState("My Measurements")

  const measurementFields = useMemo(
    () => [
      { key: "chest", label: "Chest (inches)" },
      { key: "waist", label: "Waist (inches)" },
      { key: "hip", label: "Hip (inches)" },
      { key: "shoulder", label: "Shoulder (inches)" },
      { key: "sleeve", label: "Sleeve Length (inches)" },
      { key: "height", label: "Height (cm)" },
    ],
    []
  )
  const [measurements, setMeasurements] = useState<Record<string, string>>(
    Object.fromEntries(measurementFields.map((f) => [f.key, ""]))
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Custom Sewing</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Upload your style + measurements, or pick from our style catalog and we’ll sew it for you.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={mode === "upload" ? "gold" : "outline"} onClick={() => setMode("upload")}>
            Upload style
          </Button>
          <Button variant={mode === "catalog" ? "gold" : "outline"} onClick={() => setMode("catalog")}>
            Choose style
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Step {step} of 3</p>
            <div className="flex gap-2">
              <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
                Back
              </Button>
              <Button variant="gold" onClick={() => setStep((s) => Math.min(3, s + 1))}>
                Next
              </Button>
            </div>
          </div>

          {step === 1 && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-semibold">Outfit type</label>
                <select
                  value={outfit}
                  onChange={(e) => setOutfit(e.target.value as any)}
                  className="mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"
                >
                  {outfitTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {mode === "upload" ? (
                <div>
                  <label className="text-sm font-semibold">Upload style image(s)</label>
                  <input
                    type="file"
                    multiple
                    className="mt-2 block w-full rounded-md border bg-white p-3 text-sm"
                  />
                  <p className="mt-2 text-xs text-foreground/60">
                    For preview: this upload is local only. DB upload can be wired later.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-semibold">Choose a style from catalog</label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {styles.slice(0, 6).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/style-catalog#${s.slug}`}
                        className="rounded-xl border bg-white p-3 text-sm hover:border-gold-300 hover:bg-gold-50/30"
                      >
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-foreground/60">{s.outfitType}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold">Timeline</label>
                <div className="mt-2 flex gap-2">
                  <Button variant={timeline === "Standard" ? "gold" : "outline"} onClick={() => setTimeline("Standard")}>
                    Standard
                  </Button>
                  <Button variant={timeline === "Express" ? "gold" : "outline"} onClick={() => setTimeline("Express")}>
                    Express
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-semibold">Measurement profile name</label>
                <input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"
                  placeholder="e.g., My Normal Fit"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {measurementFields.map((f) => (
                  <div key={f.key}>
                    <label className="text-sm font-medium">{f.label}</label>
                    <input
                      value={measurements[f.key] ?? ""}
                      onChange={(e) => setMeasurements((m) => ({ ...m, [f.key]: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"
                      placeholder="Enter value"
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gold-50/60 p-4 text-sm text-foreground/70">
                Tip: For screenshots, fill a few fields — later we can add a measurement guide with illustrations.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-semibold">Extra notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 min-h-[120px] w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-300"
                  placeholder="Add lining preference, fit style, embroidery, delivery location, etc."
                />
              </div>

              <div className="rounded-2xl border bg-white p-5">
                <p className="text-sm font-semibold">Preview summary</p>
                <ul className="mt-3 space-y-1 text-sm text-foreground/70">
                  <li>• Mode: {mode === "upload" ? "Upload my style" : "Choose from style catalog"}</li>
                  <li>• Outfit: {outfit}</li>
                  <li>• Timeline: {timeline}</li>
                  <li>• Profile: {profileName}</li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button variant="gold" onClick={() => alert("Request submitted (demo). Next: connect DB + payments.")}>
                    Submit request
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/style-catalog">Browse more styles</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold">What you get</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li>• Quote & timeline from our team</li>
              <li>• Save measurement profiles for future orders</li>
              <li>• Quality finishing & packaging</li>
              <li>• WhatsApp support</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold">Want to learn instead?</p>
            <p className="mt-2 text-sm text-foreground/70">
              Join our fashion school program. Beginner to advanced.
            </p>
            <div className="mt-4 space-y-2">
              {courses.map((c) => (
                <div key={c.slug} className="rounded-xl border bg-white p-4">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-foreground/60">
                    {c.level} • {c.duration} • ₦{c.fee.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="gold" asChild>
              <Link href="/fashion-school">View courses</Link>
            </Button>
          </div>
        </aside>
      </div>
    </main>
  )
}
