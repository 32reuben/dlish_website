import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getSiteSettingsQuery } from "@/sanity/lib/queries"
import { Link as LinkIcon, MapPin, Mail, Phone } from "lucide-react"
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons"

export async function Footer() {
  const settings = await sanityFetch<any>({ query: getSiteSettingsQuery })

  return (
    <footer className="bg-brand-dark text-brand-light py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="inline-block mb-4">
            <img src="/logo-light.png" alt="D'Lish" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-stone-400 font-medium max-w-xs mb-6">
            Fresh flavours. Serious cravings. Street Food, Bubble Tea, Karak, Desserts, and Protein Meals in Northampton, UK.
          </p>
          <div className="flex gap-4">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-bubbletea transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-bubbletea transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6" />
              </a>
            )}
            {settings?.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-bubbletea transition-colors" aria-label="TikTok">
                <TikTokIcon className="h-5 w-5 mt-0.5" />
              </a>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4 text-white">Explore</h4>
          <ul className="space-y-2 text-stone-400 font-medium">
            <li><Link href="/menu" className="hover:text-brand-bubbletea transition-colors">Menu</Link></li>
            <li><Link href="/catering" className="hover:text-brand-bubbletea transition-colors">Catering & Events</Link></li>
            <li><Link href="/find-us" className="hover:text-brand-bubbletea transition-colors">Find Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
          <ul className="space-y-2 text-stone-400 font-medium">
            <li><Link href="/privacy" className="hover:text-brand-bubbletea transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-bubbletea transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-stone-400 font-medium">
            {settings?.address && (
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-stone-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            )}
            {settings?.email && (
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-stone-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-brand-bubbletea">{settings.email}</a>
              </li>
            )}
            {settings?.phone && (
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-stone-500 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-brand-bubbletea">{settings.phone}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-stone-500 font-medium">
        &copy; {new Date().getFullYear()} D'Lish. All rights reserved.
      </div>
    </footer>
  )
}
