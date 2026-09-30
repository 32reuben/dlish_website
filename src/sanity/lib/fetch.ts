import { client } from './client'
import { projectId } from '../env'
import { getCategoriesQuery, getTrendingSectionQuery, getProductsQuery, getSiteSettingsQuery, getCateringPageQuery } from './queries'
import { Coffee, Utensils, IceCream, Carrot } from 'lucide-react'

// Placeholder Mock Data
const MOCK_CATEGORIES = [
  { _id: '1', name: "Bubble Tea", slug: "bubble-tea", color: "bg-brand-bubbletea", iconType: Coffee },
  { _id: '2', name: "Karak & Hot Drinks", slug: "karak", color: "bg-brand-karak", iconType: Coffee },
  { _id: '3', name: "Indian Street Food", slug: "street-food", color: "bg-brand-streetfood", iconType: Utensils },
  { _id: '4', name: "Desserts & Cakes", slug: "desserts", color: "bg-brand-dessert", iconType: IceCream },
  { _id: '5', name: "Protein Meals", slug: "protein-meals", color: "bg-brand-protein", iconType: Carrot },
]

const MOCK_PRODUCTS = [
  { _id: '101', name: "Brown Sugar Boba", slug: "brown-sugar-boba", desc: "Classic milk tea with warm brown sugar tapioca pearls.", price: 450, categorySlug: "bubble-tea", available: true, badges: ["TRENDING"], allergens: ["Milk"], popular: true },
  { _id: '102', name: "Classic Karak Chai", slug: "classic-karak", desc: "Slow-brewed spiced tea with evaporated milk.", price: 250, categorySlug: "karak", available: true, badges: ["BESTSELLER"], allergens: ["Milk"], dietaryTags: ["Vegetarian"], popular: true },
  { _id: '103', name: "Spicy Pani Puri", slug: "spicy-pani-puri", desc: "Crispy hollow spheres filled with spicy tangy water.", price: 500, categorySlug: "street-food", available: true, badges: ["BESTSELLER"], allergens: ["Cereals containing gluten"], dietaryTags: ["Vegetarian", "Vegan"], popular: true },
  { _id: '104', name: "Smashed Samosa Chaat", slug: "samosa-chaat", desc: "Crispy samosas topped with chickpeas, yogurt and chutneys.", price: 650, categorySlug: "street-food", available: true, badges: [], allergens: ["Cereals containing gluten", "Milk"], dietaryTags: ["Vegetarian"] },
  { _id: '105', name: "Lean Chicken Box", slug: "lean-chicken-box", desc: "Grilled chicken with quinoa, broccoli and light sauce.", price: 850, categorySlug: "protein-meals", available: true, badges: ["NEW"], allergens: [], popular: false },
  { _id: '106', name: "Mango Fruit Tea", slug: "mango-fruit-tea", desc: "Refreshing jasmine green tea with sweet mango.", price: 400, categorySlug: "bubble-tea", available: true, badges: [], allergens: [], dietaryTags: ["Vegan"] },
  { _id: '107', name: "Unavailable Cake", slug: "sold-out-cake", desc: "Delicious cake that is currently sold out.", price: 400, categorySlug: "desserts", available: false, badges: [], allergens: ["Milk", "Eggs", "Cereals containing gluten"], dietaryTags: ["Vegetarian"] },
]

const MOCK_TRENDING = {
  title: "Trending at D'Lish",
  items: MOCK_PRODUCTS.filter(p => p.badges?.includes("TRENDING") || p.badges?.includes("BESTSELLER") || p.badges?.includes("NEW"))
}

const MOCK_SITE_SETTINGS = {
  orderLinkType: 'WhatsApp',
  orderLinkTarget: '447000000000',
  whatsappNumber: '447000000000',
  phone: '01234 567890',
  email: 'info@dlish.example.com',
  address: '123 High Street, Northampton, NN1 1AA, UK',
  openingHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
  collectionInfo: 'Collection is available during all opening hours. Please wait for your confirmation message before arriving.',
  deliveryInfo: 'Delivery available within a 3-mile radius via Deliveroo and UberEats.',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156157.6534246067!2d-1.0269095034639438!3d52.23847253457199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48770ebd3ba5653b%3A0xc4931a231505c24e!2sNorthampton!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk'
}

const MOCK_CATERING = {
  introText: "Whether it's a birthday, corporate event, or a casual get-together, D'Lish brings the serious cravings to you. From bespoke Bubble Tea stations to giant Samosa Chaat platters, we've got you covered.",
  foodCategories: ["Bubble Tea Station", "Indian Street Food Buffets", "Dessert Tables", "Protein & Salad Bowls"],
  eventTypes: ["Birthday Parties", "Corporate Events", "Weddings", "Festivals"]
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}): Promise<QueryResponse> {
  // If we haven't configured a real Sanity project yet, return mock data so the site still works
  if (projectId === 'placeholder-project-id') {
    if (query === getCategoriesQuery) return MOCK_CATEGORIES as any
    if (query === getTrendingSectionQuery) return MOCK_TRENDING as any
    if (query === getProductsQuery) return MOCK_PRODUCTS as any
    if (query === getSiteSettingsQuery) return MOCK_SITE_SETTINGS as any
    if (query === getCateringPageQuery) return MOCK_CATERING as any
    return null as any
  }

  return client.fetch<QueryResponse>(query, params, {
    next: {
      tags,
      revalidate: 3600 // Cache for 1 hour by default, or use tags for on-demand revalidation
    },
  })
}
