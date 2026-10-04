"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { AlertCircle } from "lucide-react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh]">
      <div className="bg-red-50 p-6 rounded-full text-red-500 mb-6">
        <AlertCircle className="w-16 h-16" />
      </div>
      <h2 className="text-3xl font-bold text-brand-dark mb-4">Oops! Something went wrong.</h2>
      <p className="text-stone-500 mb-8 max-w-md">
        We're having a little trouble loading this page. It might be a temporary hiccup on our end.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">Try Again</Button>
        <Button onClick={() => window.location.href = '/'} variant="outline">Go Home</Button>
      </div>
    </div>
  )
}
