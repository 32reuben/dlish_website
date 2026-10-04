"use client"

import { useState, useEffect, useRef } from "react"
import { Product, ProductCard } from "@/components/ProductCard"

interface Section {
  id: string;
  name: string;
  products: Product[];
}

export function MenuClient({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const navRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting)
        if (visibleSections.length > 0) {
          // Find the one closest to the top
          const topSection = visibleSections.reduce((prev, current) => {
            return (prev.boundingClientRect.top < current.boundingClientRect.top) ? prev : current
          })
          setActiveSection(topSection.target.id)
        }
      },
      { rootMargin: "-100px 0px -60% 0px" } // Adjust margin for when section is considered "active"
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  // Scroll Nav into view when active section changes
  useEffect(() => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-id="${activeSection}"]`)
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140 // Offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Sticky Category Navigation */}
      <div className="sticky top-[80px] z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div 
          ref={navRef}
          className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-4 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              data-id={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                activeSection === section.id
                  ? 'bg-brand-dark text-white shadow-md scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-brand-dark border border-stone-200'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-20 pb-20">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-40">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-4xl font-bold text-brand-dark tracking-tight">{section.name}</h2>
              {section.id === 'milk-shakes' && <span className="text-stone-500 font-bold mt-2">Large +£1.50</span>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            {section.products.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300">
                <p className="text-stone-500 font-bold">More items coming soon!</p>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
