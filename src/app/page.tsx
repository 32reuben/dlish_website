import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowRight, Utensils, Coffee, IceCream, Carrot, Zap } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getCategoriesQuery, getTrendingSectionQuery, getSiteSettingsQuery } from "@/sanity/lib/queries"
import { formatPrice } from "@/lib/utils"
import { StructuredData, generateLocalBusinessData } from "@/components/StructuredData"

export const revalidate = 3600 // Revalidate every hour, or via on-demand webhook

export const metadata: Metadata = {
  title: "D'Lish | Bubble Tea, Street Food & Desserts in Northampton",
  description: "D'LISH: Street Food, Bubble Tea, Karak, Desserts, and Protein Meals in Northampton, UK. Fresh flavours. Serious cravings.",
}

export default async function Home() {
  const [categories, trendingSection, settings] = await Promise.all([
    sanityFetch<any[]>({ query: getCategoriesQuery, tags: ['category'] }),
    sanityFetch<any>({ query: getTrendingSectionQuery, tags: ['trendingSection', 'product'] }),
    sanityFetch<any>({ query: getSiteSettingsQuery, tags: ['siteSettings'] })
  ])

  return (
    <div className="flex flex-col gap-20 pb-20">
      <StructuredData data={generateLocalBusinessData(settings)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-bubbletea/10 pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="new" className="mb-6">Northampton's Newest Vibe</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-dark mb-6">
            Fresh flavours.<br/>
            <span className="text-brand-bubbletea">Serious cravings.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-3xl mx-auto font-medium">
            D'LISH: Street Food • Bubble Tea • Karak • Desserts • Protein Meals
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-brand-dark/20">
              ORDER NOW
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-lg shadow-brand-bubbletea/20" asChild>
              <Link href="/menu">EXPLORE MENU</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-stone-500">
            <Link href="/catering" className="hover:text-brand-streetfood flex items-center gap-1 transition-colors">
              <Zap className="w-4 h-4" /> CATERING & EVENTS
            </Link>
            <Link href="/find-us" className="hover:text-brand-karak flex items-center gap-1 transition-colors">
              FIND D'LISH <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      {categories?.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-brand-dark">Crave something?</h2>
            <Link href="/menu" className="font-bold text-brand-bubbletea flex items-center gap-1 hover:gap-2 transition-all">
              Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.iconType || Utensils // Use Sanity image or fallback icon
              return (
                <Link href={`/menu#${cat.slug}`} key={cat._id} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-stone-100 p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 ${cat.color || 'bg-brand-dark'} group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon ? (
                      <Image src={cat.icon} alt={cat.name} width={40} height={40} className="w-10 h-10 object-contain" />
                    ) : (
                      <Icon className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="font-bold text-brand-dark leading-tight">{cat.name}</h3>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Trending Section */}
      {trendingSection?.items?.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-bubbletea/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <Badge variant="trending" className="mb-4 text-brand-dark bg-brand-bubbletea shadow-none">Trending at D'Lish</Badge>
                <h2 className="text-4xl font-bold">{trendingSection.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {trendingSection.items.map((item: any) => {
                  const badgeType = item.badges?.[0]?.toLowerCase() as 'trending' | 'new' | 'bestseller' | 'limited' | undefined;
                  return (
                    <div key={item._id} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/20 transition-colors flex flex-col">
                      {badgeType && <Badge variant={badgeType} className="mb-4 self-start">{item.badges[0]}</Badge>}
                      
                      {item.image && (
                        <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <p className="text-stone-300 text-sm mb-4 line-clamp-2">{item.desc}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <span className="font-display font-bold text-xl">{formatPrice(item.price)}</span>
                        <button className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-sm hover:bg-brand-bubbletea hover:text-white transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
