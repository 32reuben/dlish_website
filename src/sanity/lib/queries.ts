import { groq } from 'next-sanity'

export const getCategoriesQuery = groq`*[_type == "category" && visible == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  "color": "bg-brand-dark", // Placeholder for actual color field if added later
  "icon": icon.asset->url
}`

export const getTrendingSectionQuery = groq`*[_type == "trendingSection"][0] {
  title,
  items[]-> {
    _id,
    name,
    "slug": slug.current,
    "price": basePrice,
    "desc": shortDescription,
    badges,
    "image": image.asset->url
  }
}`

export const getProductsQuery = groq`*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  "desc": shortDescription,
  "price": basePrice,
  "image": image.asset->url,
  "categorySlug": category->slug.current,
  available,
  badges,
  allergens,
  dietaryTags,
  popular
}`

export const getSiteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const getCateringPageQuery = groq`*[_type == "cateringPage"][0]`
