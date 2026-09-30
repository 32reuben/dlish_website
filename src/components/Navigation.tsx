import Link from "next/link"
import { Button } from "./ui/Button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-3xl font-bold tracking-tighter text-brand-dark">
          D'LISH
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-stone-600">
          <Link href="/menu" className="hover:text-brand-bubbletea transition-colors">Menu</Link>
          <Link href="/catering" className="hover:text-brand-streetfood transition-colors">Catering & Events</Link>
          <Link href="/find-us" className="hover:text-brand-karak transition-colors">Find Us</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="primary" className="hidden md:inline-flex">ORDER NOW</Button>
          
          {/* Mobile Menu Toggle (Placeholder for real state) */}
          <button className="md:hidden p-2 text-brand-dark">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
