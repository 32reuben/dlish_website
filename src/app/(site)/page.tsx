import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowRight, Utensils, Coffee, IceCream, Carrot, Zap } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getCategoriesQuery, getTrendingSectionQuery, getSiteSettingsQuery, getTestimonialsQuery, getProductsQuery } from "@/sanity/lib/queries"
import { formatPrice } from "@/lib/utils"
import { StructuredData, generateLocalBusinessData } from "@/components/StructuredData"
import { HorizontalReviews } from "@/components/HorizontalReviews"
import { OrderButton } from "@/components/OrderButton"
import { PremiumScrollExperience } from "@/components/PremiumScrollExperience"
import { HeroSection } from "@/components/HeroSection"

export const revalidate = 3600 // Revalidate every hour, or via on-demand webhook

export const metadata: Metadata = {
  title: "D'Lish | Bubble Tea, Street Food & Desserts in Northampton",
  description: "D'LISH: Street Food, Bubble Tea, Karak, Desserts, and Protein Meals in Northampton, UK. Fresh flavours. Serious cravings.",
}

export default async function Home() {
  const [categories, trendingSection, settings, testimonials, products] = await Promise.all([
    sanityFetch<any[]>({ query: getCategoriesQuery, tags: ['category'] }),
    sanityFetch<any>({ query: getTrendingSectionQuery, tags: ['trendingSection', 'product'] }),
    sanityFetch<any>({ query: getSiteSettingsQuery, tags: ['siteSettings'] }),
    sanityFetch<any[]>({ query: getTestimonialsQuery, tags: ['testimonial'] }),
    sanityFetch<any[]>({ query: getProductsQuery, tags: ['product'] })
  ])

  // Get products for the premium scroll experiences
  const milkshake = products?.find(p => p.slug === 'vanilla-milkshake') || products?.find(p => p.categorySlug === 'milkshakes') || { name: 'Vanilla Milkshake', price: 549, desc: 'A rich and creamy classic, blended to perfection for serious cravings.' }
  const bubbleTea = products?.find(p => p.slug === 'mango-passion') || products?.find(p => p.categorySlug === 'bubble-tea') || { name: 'Mango Passion', price: 749, desc: 'Refreshing and bold. Chewy tapioca pearls in our signature brewed tea.' }
  const frappe = products?.find(p => p.slug === 'chocolate-iced-frappe') || products?.find(p => p.categorySlug === 'iced-frappes') || { name: 'Chocolate Iced Frappe', price: 649, desc: 'The ultimate indulgence. Ice blended to frosty perfection.' }

  return (
    <div className="flex flex-col pb-20">
      <StructuredData data={generateLocalBusinessData(settings)} />
      
      {/* Hero Section */}
      <HeroSection settings={settings} />

      {/* THREE SIGNATURE PRODUCT EXPERIENCES */}
      <PremiumScrollExperience milkshake={milkshake} bubbleTea={bubbleTea} frappe={frappe} settings={settings} />

      {/* Category Cards Section */}
      {categories?.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl mt-20 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-brand-dark">Crave something?</h2>
            <Link href="/menu" className="font-bold text-brand-bubbletea flex items-center gap-1 hover:gap-2 transition-all">
              Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, index) => {
              const Icon = cat.iconType || Utensils // Use Sanity image or fallback icon
              const colors = ['bg-brand-bubbletea', 'bg-green-100', 'bg-pink-100', 'bg-orange-100', 'bg-yellow-100', 'bg-brand-streetfood', 'bg-brand-karak', 'bg-brand-protein'];
              const color = cat.color || colors[index % colors.length];
              return (
                <Link href={`/menu#${cat.slug}`} key={cat._id} className={`group relative overflow-hidden rounded-3xl ${color} p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-brand-dark mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon ? (
                      <Image src={cat.icon} alt={cat.name} width={40} height={40} className="w-10 h-10 object-contain" />
                    ) : (
                      <Icon className="w-10 h-10" />
                    )}
                  </div>
                  <h3 className="font-bold text-brand-dark leading-tight">{cat.name}</h3>
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Trending Section */}
      {trendingSection?.items?.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl mb-20">
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
                        <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden bg-white/5">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-4 drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <p className="text-stone-300 text-sm mb-4 line-clamp-2">{item.desc}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <span className="font-display font-bold text-xl">{formatPrice(item.price)}</span>
                        <OrderButton settings={settings} className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-sm hover:bg-brand-bubbletea hover:text-white transition-colors" label="Order" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Google Reviews Horizontal Scroll */}
      <HorizontalReviews testimonials={testimonials} />

    </div>
  )
}
