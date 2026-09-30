import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">D'LISH</h3>
          <p className="text-stone-400 font-medium max-w-xs">
            Fresh flavours. Serious cravings. Street Food, Bubble Tea, Karak, Desserts, and Protein Meals in Northampton, UK.
          </p>
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
          <ul className="space-y-2 text-stone-400 font-medium">
            <li>Northampton, UK</li>
            <li>info@dlish.example.com</li>
            <li>01234 567890</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-stone-500 font-medium">
        &copy; {new Date().getFullYear()} D'Lish. All rights reserved.
      </div>
    </footer>
  )
}
