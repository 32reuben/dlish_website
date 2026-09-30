import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getCateringPageQuery } from "@/sanity/lib/queries"
import { CateringForm } from "@/components/CateringForm"
import { Zap, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Catering & Events | D'Lish Northampton",
  description: "Book D'Lish for your next event in Northampton. From Bubble Tea stations to Indian Street Food buffets.",
}

export const revalidate = 3600

export default async function CateringPage() {
  const content = await sanityFetch<any>({ query: getCateringPageQuery, tags: ['cateringPage'] })

  return (
    <div className="container mx-auto px-4 max-w-6xl py-10 min-h-[calc(100vh-160px)]">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-brand-streetfood/10 p-3 rounded-full text-brand-streetfood mb-4">
          <Zap className="w-8 h-8" />
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-dark mb-6">Catering & Events</h1>
        <p className="text-stone-600 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {content?.introText}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          
          <div className="bg-brand-dark rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-brand-bubbletea">What we offer</h3>
            <ul className="space-y-4">
              {content?.foodCategories?.map((cat: string) => (
                <li key={cat} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-bubbletea flex-shrink-0" />
                  <span className="font-medium text-lg text-stone-300">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-stone-50 rounded-3xl p-8 border border-stone-200">
            <h3 className="text-2xl font-bold mb-6 text-brand-dark">Perfect for</h3>
            <div className="flex flex-wrap gap-2">
              {content?.eventTypes?.map((type: string) => (
                <span key={type} className="bg-white border border-stone-200 px-4 py-2 rounded-full text-sm font-bold text-stone-600">
                  {type}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Request a Quote</h2>
            <p className="text-stone-500">Fill out the details below and we'll craft the perfect package for your event.</p>
          </div>
          <CateringForm />
        </div>
      </div>
    </div>
  )
}
