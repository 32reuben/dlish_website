import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getCategoriesQuery, getProductsQuery } from "@/sanity/lib/queries"
import { MenuClient } from "./MenuClient"

export const metadata: Metadata = {
  title: "Menu | D'Lish Northampton",
  description: "Explore the D'Lish menu: Bubble Tea, Karak, Indian Street Food, Desserts, and Protein Meals in Northampton.",
}

export const revalidate = 3600

export default async function MenuPage() {
  const [categories, products] = await Promise.all([
    sanityFetch<any[]>({ query: getCategoriesQuery, tags: ['category'] }),
    sanityFetch<any[]>({ query: getProductsQuery, tags: ['product'] })
  ])

  // Process data into Sections
  const sections = []

  // 1. Popular
  const popularProducts = products.filter(p => p.popular)
  if (popularProducts.length > 0) {
    sections.push({
      id: 'popular',
      name: 'Popular',
      products: popularProducts
    })
  }

  // 2. CMS Categories
  // Sort by order field if available
  const sortedCategories = [...(categories || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
  
  sortedCategories.forEach(cat => {
    sections.push({
      id: cat.slug,
      name: cat.name,
      products: products.filter(p => p.categorySlug === cat.slug)
    })
  })

  // 3. Vegetarian
  const vegProducts = products.filter(p => p.dietaryTags?.includes('Vegetarian'))
  if (vegProducts.length > 0) {
    sections.push({
      id: 'vegetarian',
      name: 'Vegetarian',
      products: vegProducts
    })
  }

  // 4. New & Trending
  const trendingProducts = products.filter(p => 
    p.badges?.includes('NEW') || 
    p.badges?.includes('TRENDING') || 
    p.badges?.includes('BESTSELLER')
  )
  if (trendingProducts.length > 0) {
    sections.push({
      id: 'new-and-trending',
      name: 'New & Trending',
      products: trendingProducts
    })
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl pt-10">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-display font-bold text-brand-dark mb-4">Our Menu</h1>
        <p className="text-stone-500 font-medium max-w-2xl mx-auto">
          Freshly made, packed with flavour. Please note: we prepare food in a kitchen where allergens are present. Always ask staff about allergens before ordering.
        </p>
      </div>

      <MenuClient sections={sections} />
    </div>
  )
}
