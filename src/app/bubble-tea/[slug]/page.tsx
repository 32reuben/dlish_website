import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from "@/sanity/lib/fetch"
import { getProductsQuery, getSiteSettingsQuery } from "@/sanity/lib/queries"
import { CustomiserClient } from "./CustomiserClient"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const products = await sanityFetch<any[]>({ query: getProductsQuery, tags: ['product'] })
  const drink = products.find(p => p.slug === params.slug)
  
  if (!drink) return { title: 'Not Found' }
  
  return {
    title: `Customise ${drink.name} | D'Lish Northampton`,
    description: drink.desc || `Customise your ${drink.name} at D'Lish Northampton. Choose your flavour, size, sweetness, and toppings.`,
  }
}

// Hardcoded static options since these rarely change and are simple, 
// though we can pull these from Sanity if configured.
const SWEETNESS_OPTIONS = ["0%", "25%", "50%", "75%", "100%"]
const ICE_OPTIONS = ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"]

// Mock additional data (Flavours, Toppings, Settings)
const MOCK_FLAVOURS = [
  { name: "Original", extraPrice: 0 },
  { name: "Taro", extraPrice: 50 },
  { name: "Matcha", extraPrice: 50 },
  { name: "Strawberry", extraPrice: 50 },
]

const MOCK_TOPPINGS = [
  { name: "Tapioca Pearls", extraPrice: 50 },
  { name: "Popping Boba", extraPrice: 75 },
  { name: "Lychee Jelly", extraPrice: 50 },
  { name: "Cream Crown", extraPrice: 100 },
]

const MOCK_SETTINGS = {
  multipleToppingsAllowed: true,
  maxToppings: 3,
  regularSizeExtra: 0,
  largeSizeExtra: 75,
}

export default async function BubbleTeaCustomiserPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const [products, siteSettings] = await Promise.all([
    sanityFetch<any[]>({ query: getProductsQuery, tags: ['product'] }),
    sanityFetch<any>({ query: getSiteSettingsQuery, tags: ['siteSettings'] })
  ])
  const drink = products.find(p => p.slug === params.slug)

  if (!drink) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl py-10 min-h-[calc(100vh-160px)] flex flex-col">
      <CustomiserClient 
        drink={drink}
        flavours={MOCK_FLAVOURS}
        toppings={MOCK_TOPPINGS}
        settings={MOCK_SETTINGS}
        siteSettings={siteSettings}
        sweetnessOptions={SWEETNESS_OPTIONS}
        iceOptions={ICE_OPTIONS}
      />
    </div>
  )
}
