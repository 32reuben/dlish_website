import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getSiteSettingsQuery } from "@/sanity/lib/queries"
import { OrderChooser } from "@/components/OrderChooser"

export const metadata: Metadata = {
  title: "Order Online | D'Lish Northampton",
  description: "Order fresh bubble tea, street food, and desserts for delivery or collection in Northampton.",
}

export const revalidate = 3600

export default async function OrderPage() {
  const settings = await sanityFetch<any>({ query: getSiteSettingsQuery, tags: ['siteSettings'] })

  return (
    <div className="container mx-auto px-4 max-w-4xl py-10 min-h-[calc(100vh-160px)] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Order Online</h1>
        <p className="text-stone-500 font-medium text-lg">Choose your preferred delivery partner.</p>
      </div>

      <OrderChooser settings={settings} />
    </div>
  )
}
