import { groq } from 'next-sanity'

export const getCategoriesQuery = groq`*[_type == "category" && visible == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
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
  sizes,
  "image": image.asset->url,
  "categorySlug": category->slug.current,
  available,
  badges,
  allergens,
  dietaryTags,
  popular
}`

export const getSiteSettingsQuery = `*[_type == "siteSettings"][0]{
  address,
  openingHours,
  phone,
  email,
  whatsappNumber,
  mapsLink,
  justEatUrl,
  uberEatsUrl,
  showCallInChooser,
  googleProfileUrl,
  googleReviewUrl,
  instagramUrl,
  facebookUrl,
  tiktokUrl,
  collectionInfo,
  deliveryInfo,
  mapEmbedUrl
}`

export const getCateringPageQuery = groq`*[_type == "cateringPage"][0]`

export const getTestimonialsQuery = groq`*[_type == "testimonial" && visible == true] | order(order asc) {
  displayName,
  text,
  source
}`

export const getAnnouncementQuery = groq`*[_type == "announcementBar"][0]`
