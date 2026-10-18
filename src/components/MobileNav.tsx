"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { OrderButton } from "./OrderButton"

export function MobileNav({ settings }: { settings: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        className="md:hidden p-2 text-brand-dark hover:text-brand-bubbletea transition-colors" 
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between border-b border-stone-100">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <img src="/logo-main.png" alt="D'Lish" className="h-12 w-auto object-contain" />
            </Link>
            <button 
              className="p-2 text-brand-dark hover:text-brand-bubbletea transition-colors" 
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <nav className="flex flex-col px-6 py-8 gap-4 text-2xl font-display font-bold text-brand-dark overflow-y-auto">
            <Link 
              href="/menu" 
              onClick={() => setIsOpen(false)} 
              className="py-3 px-2 rounded-xl active:bg-stone-100 hover:text-brand-bubbletea transition-colors"
            >
              Menu
            </Link>
            <Link 
              href="/catering" 
              onClick={() => setIsOpen(false)} 
              className="py-3 px-2 rounded-xl active:bg-stone-100 hover:text-brand-streetfood transition-colors"
            >
              Catering & Events
            </Link>
            <Link 
              href="/find-us" 
              onClick={() => setIsOpen(false)} 
              className="py-3 px-2 rounded-xl active:bg-stone-100 hover:text-brand-karak transition-colors"
            >
              Find Us
            </Link>
            
            <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col gap-4">
              <OrderButton settings={settings} label="Order Online" variant="primary" className="w-full h-14 rounded-full text-lg" />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
