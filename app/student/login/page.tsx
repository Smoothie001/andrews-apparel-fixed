import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Student Login</h1>
        <p className="mt-2 text-sm text-gray-600">
          Login to access your course details and announcements.
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="********"
            />
          </div>

          <Button className="w-full" type="button">
            Login
          </Button>

          <p className="text-center text-sm text-gray-600">
            New student?{" "}
            <Link className="font-medium text-blue-600 hover:underline" href="/student/register">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
