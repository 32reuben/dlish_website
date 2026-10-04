import { client } from './client'
import { projectId } from '../env'
import { getCategoriesQuery, getTrendingSectionQuery, getProductsQuery, getSiteSettingsQuery, getCateringPageQuery, getTestimonialsQuery, getAnnouncementQuery } from './queries'
import { Coffee, Utensils, IceCream, Carrot, CupSoda, Sandwich } from 'lucide-react'

// Placeholder Mock Data
const MOCK_CATEGORIES = [
  { _id: '1', name: "Fizzy Bubble Tea", slug: "fizzy-bubble-tea", color: "bg-brand-bubbletea", iconType: CupSoda },
  { _id: '2', name: "Matcha", slug: "matcha", color: "bg-green-100", iconType: CupSoda },
  { _id: '3', name: "Milk Shakes", slug: "milk-shakes", color: "bg-pink-100", iconType: IceCream },
  { _id: '4', name: "Iced Frappe", slug: "iced-frappe", color: "bg-orange-100", iconType: IceCream },
  { _id: '5', name: "Lassi", slug: "lassi", color: "bg-yellow-100", iconType: CupSoda },
  { _id: '6', name: "Indian Bites", slug: "indian-bites", color: "bg-brand-streetfood", iconType: Sandwich },
  { _id: '7', name: "Hot Drinks", slug: "hot-drinks", color: "bg-brand-karak", iconType: Coffee },
  { _id: '8', name: "Protein Meals (Coming Soon)", slug: "protein-meals", color: "bg-brand-protein", iconType: Carrot },
]

const MOCK_PRODUCTS: any[] = [
  { _id: '201', name: "Strawberry Spark", desc: "Strawberry Sparkling", slug: "strawberry-spark", price: 749, categorySlug: "fizzy-bubble-tea", available: true, badges: ["NEW"], image: "/products/strawberry spark.png" },
  { _id: '202', name: "Watermelon Breeze", desc: "Watermelon, Lemon & Mint", slug: "watermelon-breeze", price: 749, categorySlug: "fizzy-bubble-tea", available: true, badges: ["NEW"], image: "/products/watermelon breeze.png" },
  { _id: '203', name: "Green Apple Zing", desc: "Green Apple, Lime Soda", slug: "green-apple-zing", price: 749, categorySlug: "fizzy-bubble-tea", available: true, badges: ["NEW"], image: "/products/green apple zing.png" },
  { _id: '204', name: "Mango Passion", desc: "Mango Passion Fruit", slug: "mango-passion", price: 749, categorySlug: "fizzy-bubble-tea", available: true, badges: ["NEW"], image: "/products/mango passion.png" },
  { _id: '205', name: "Sunset Fusion", desc: "Blueberry & Lychee", slug: "sunset-fusion", price: 749, categorySlug: "fizzy-bubble-tea", available: true, badges: ["NEW"], image: "/products/sunset fusion.png" },
  
  { _id: '301', name: "Blueberry Matcha", slug: "blueberry-matcha", price: 649, categorySlug: "matcha", available: true, image: "/products/blueberry matcha.png" },
  { _id: '302', name: "Mango Matcha", slug: "mango-matcha", price: 649, categorySlug: "matcha", available: true, image: "/products/mango matcha.png" },
  { _id: '303', name: "Banana Matcha", slug: "banana-matcha", price: 649, categorySlug: "matcha", available: true, image: "/products/banana matcha.png" },
  { _id: '304', name: "Strawberry Matcha Latte", slug: "strawberry-matcha-latte", price: 649, categorySlug: "matcha", available: true, image: "/products/strawberry matcha.png" },
  
  { _id: '401', name: "Chocolate", slug: "chocolate-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/choclate milkshake.png" },
  { _id: '402', name: "Vanilla", slug: "vanilla-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/vanila milkshake.png" },
  { _id: '403', name: "Strawberry", slug: "strawberry-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/strawberry milkshake.png" },
  { _id: '404', name: "Banana", slug: "banana-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/banana milkshake.png" },
  { _id: '405', name: "Ferrero", slug: "ferrero-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/ferrero milkshake.png" },
  { _id: '406', name: "Oreo", slug: "oreo-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/oreo milkshake.png" },
  { _id: '407', name: "Kinder Bueno", slug: "kinder-bueno-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/kinder bueno milkshake.png" },
  { _id: '408', name: "Biscoff", slug: "biscoff-shake", price: 549, categorySlug: "milk-shakes", available: true, image: "/products/biscoff milkshake.png" },
  
  { _id: '501', name: "Chocolate", slug: "chocolate-frappe", price: 375, categorySlug: "iced-frappe", available: true, badges: ["NEW"], image: "/products/chocolate iced frappe.png" },
  { _id: '502', name: "Vanilla", slug: "vanilla-frappe", price: 375, categorySlug: "iced-frappe", available: true, badges: ["NEW"], image: "/products/vanila iced frappe.png" },
  { _id: '503', name: "Salted Caramel", slug: "salted-caramel-frappe", price: 499, categorySlug: "iced-frappe", available: true, badges: ["Premium Frappe", "NEW"], image: "/products/salted caramel iced frappe.png" },
  { _id: '504', name: "Biscoff", slug: "biscoff-frappe", price: 499, categorySlug: "iced-frappe", available: true, badges: ["Premium Frappe", "NEW"], image: "/products/biscoff iced frappe.png" },
  
  { _id: '601', name: "Plain Lassi", slug: "plain-lassi", price: 399, categorySlug: "lassi", available: true, image: "/products/plain lassi.png" },
  { _id: '602', name: "Mango Lassi", slug: "mango-lassi", price: 449, categorySlug: "lassi", available: true, image: "/products/mango lassi.png" },
  
  { _id: '701', name: "Samosa (1 piece)", slug: "samosa-1", price: 150, categorySlug: "indian-bites", available: true, image: "/products/samosa (1piece).png" },
  { _id: '702', name: "Samosa (2 pieces)", slug: "samosa-2", price: 275, categorySlug: "indian-bites", available: true, image: "/products/samosa(2 piece).png" },
  { _id: '703', name: "Spring Roll (3 pieces)", slug: "spring-roll-3", price: 299, categorySlug: "indian-bites", available: true, image: "/products/spring roll.png" },
  { _id: '704', name: "Pani Puri Classic (5 pieces)", slug: "pani-puri-5", price: 499, categorySlug: "indian-bites", available: true, image: "/products/panu puri classic (5 pieces).png" },
  { _id: '705', name: "Pani Puri Premium (8 pieces)", slug: "pani-puri-8", price: 649, categorySlug: "indian-bites", available: true, image: "/products/pani puri premium (8 pieces).png" },
  
  { _id: '801', name: "Karak Tea", slug: "karak-tea", price: 249, categorySlug: "hot-drinks", available: true, image: "/products/karak tea.png" },
  { _id: '802', name: "Coffee", slug: "coffee", price: 249, categorySlug: "hot-drinks", available: true, image: "/products/coffee.png" },
  
  { _id: '901', name: "Lean Chicken Box", slug: "lean-chicken-box", categorySlug: "protein-meals", available: false, badges: ["Coming Soon"] },
]

const MOCK_TESTIMONIALS = [
  { displayName: "Rosie N.", text: "The white matcha is soooo good! Highly recommend", source: "Google review" },
  { displayName: "Revathi M.", text: "Very tasty churros and refreshing drinks thank you so much 👌 We will back again 😍", source: "Google review" },
  { displayName: "Georgiana J.", text: "New favourite boba shop in northampton. The staff are very friends and the service is speedy.", source: "Google review" },
  { displayName: "Anjali J.", text: "Great drinks and wonderful customer service. The milk tea (taro) was amazing", source: "Google review" },
  { displayName: "F.H.", text: "Best churros and great staff friendly. Will definitely back again! Yummy I ate all of it!", source: "Google review" },
  { displayName: "Safewan", text: "First time trying matcha and the gentleman didn't disappoint customer service was on point 10/10 experience", source: "Google review" },
]

const MOCK_TRENDING = {
  title: "Trending at D'Lish",
  items: MOCK_PRODUCTS.filter(p => ["201", "202", "203", "204", "205"].includes(p._id))
}

const MOCK_ANNOUNCEMENT = {
  isActive: true,
  text: "Coming back 8 October. Open 9 AM to 7 PM."
}

// MOCK_SITE_SETTINGS
const MOCK_SITE_SETTINGS = {
  justEatUrl: 'https://www.just-eat.co.uk/restaurants-dlish-desserts-northampton/menu',
  uberEatsUrl: 'https://www.ubereats.com/store/dlish-desserts/4wwIh-i5TGOjMY7bZCnSSw',
  showCallInChooser: false,
  phone: '07850 536587',
  whatsappNumber: '+447850536587',
  email: 'uk.dlish@gmail.com',
  address: "D'lish Northampton",
  mapsLink: 'https://maps.app.goo.gl/QFv9h1fsUjyiEuVM8',
  openingHours: '9:00 AM to 7:00 PM. Days: not confirmed.',
  googleProfileUrl: 'https://g.page/placeholder',
  googleReviewUrl: '',
  instagramUrl: 'https://www.instagram.com/uk.dlish?stkn=ZTlycWY3NGZoczdw&utm_source=qr',
  facebookUrl: '',
  tiktokUrl: '',
  collectionInfo: 'Collection is available during all opening hours. Please wait for your confirmation message before arriving.',
  deliveryInfo: 'Delivery available within a 3-mile radius via Deliveroo and UberEats.',
  mapEmbedUrl: 'https://maps.google.com/maps?q=17%20Saint%20Peters%20Walk,%20Northampton&t=&z=15&ie=UTF8&iwloc=&output=embed'
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
  try {
    const result = await client.fetch<QueryResponse>(query, params, {
      next: {
        tags,
        revalidate: 60 // Cache for 1 minute
      },
    })

    // If Sanity has data, return it
    if (result && (!Array.isArray(result) || result.length > 0)) {
      // Small check for objects that might be "empty" in Sanity but exist
      if (typeof result === 'object' && Object.keys(result as any).length > 0 && !(result as any)._type) {
         // It's a valid object
      }
      // If it's an array with items, or a valid object, return it. We do a loose check here.
      // But actually, let's just do a specific fallback for our known queries if empty
    }

    // FALLBACK TO MOCK DATA IF SANITY IS EMPTY
    if (!result || (Array.isArray(result) && result.length === 0) || Object.keys(result as any).length === 0) {
      if (query === getCategoriesQuery) return MOCK_CATEGORIES as any
      if (query === getTrendingSectionQuery) return MOCK_TRENDING as any
      if (query === getProductsQuery) return MOCK_PRODUCTS as any
      if (query === getSiteSettingsQuery) return MOCK_SITE_SETTINGS as any
      if (query === getCateringPageQuery) return MOCK_CATERING as any
      if (query === getTestimonialsQuery) return MOCK_TESTIMONIALS as any
      if (query === getAnnouncementQuery) return MOCK_ANNOUNCEMENT as any
    }

    return result

  } catch (error) {
    console.error("Sanity fetch error, falling back to mock data:", error)
    if (query === getCategoriesQuery) return MOCK_CATEGORIES as any
    if (query === getTrendingSectionQuery) return MOCK_TRENDING as any
    if (query === getProductsQuery) return MOCK_PRODUCTS as any
    if (query === getSiteSettingsQuery) return MOCK_SITE_SETTINGS as any
    if (query === getCateringPageQuery) return MOCK_CATERING as any
    if (query === getTestimonialsQuery) return MOCK_TESTIMONIALS as any
    if (query === getAnnouncementQuery) return MOCK_ANNOUNCEMENT as any
    return null as any
  }
}
