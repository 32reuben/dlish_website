import Link from "next/link"
import { Button } from "./ui/Button"
import { OrderButton } from "./OrderButton"
import { Menu } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getSiteSettingsQuery } from "@/sanity/lib/queries"
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons"
import { MobileNav } from "./MobileNav"

export async function Navigation() {
  const settings = await sanityFetch<any>({ query: getSiteSettingsQuery })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo-main.png" alt="D'Lish" className="h-12 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-stone-600">
          <Link href="/menu" className="hover:text-brand-bubbletea transition-colors">Menu</Link>
          <Link href="/catering" className="hover:text-brand-streetfood transition-colors">Catering & Events</Link>
          <Link href="/find-us" className="hover:text-brand-karak transition-colors">Find Us</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 mr-2">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-brand-bubbletea transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-brand-bubbletea transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
            )}
            {settings?.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-brand-bubbletea transition-colors" aria-label="TikTok">
                <TikTokIcon className="h-4 w-4 mt-0.5" />
              </a>
            )}
          </div>
          
          <OrderButton settings={settings} variant="primary" className="hidden md:inline-flex" />
          
          {/* Mobile Instagram */}
          <div className="md:hidden flex items-center">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-brand-bubbletea transition-colors p-2" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <MobileNav settings={settings} />
        </div>
      </div>
    </header>
  )
}
