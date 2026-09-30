import { MetadataRoute } from 'next'
import { sanityFetch } from "@/sanity/lib/fetch"
import { getProductsQuery } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dlish.example.com'

  const products = await sanityFetch<any[]>({ query: getProductsQuery })
  
  const productUrls = products
    .filter(p => p.categorySlug === 'bubble-tea')
    .map((p) => ({
      url: `${baseUrl}/bubble-tea/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catering`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/find-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
  ]
}
