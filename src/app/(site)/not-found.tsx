import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Coffee } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center min-h-[60vh]">
      <div className="bg-brand-bubbletea/10 p-8 rounded-full text-brand-bubbletea mb-6">
        <Coffee className="w-20 h-20" />
      </div>
      <h2 className="text-5xl font-display font-bold text-brand-dark mb-4">404 - Page Not Found</h2>
      <p className="text-xl text-stone-500 mb-8 max-w-md font-medium">
        We spilled the tea... We can't find the page you're looking for!
      </p>
      <Button asChild size="lg" className="shadow-md">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
