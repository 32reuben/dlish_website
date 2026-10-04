import Script from 'next/script'

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function generateLocalBusinessData(settings: any) {
  const sameAs = [
    settings?.googleProfileUrl,
    settings?.instagramUrl,
    settings?.facebookUrl,
    settings?.tiktokUrl,
    settings?.justEatUrl,
    settings?.uberEatsUrl,
  ].filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "D'Lish",
    "image": "https://dlish.example.com/logo-main.png",
    "@id": "https://dlish.example.com",
    "url": "https://dlish.example.com",
    "telephone": settings?.whatsappNumber || settings?.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.address,
      "addressLocality": "Northampton",
      "addressCountry": "UK"
    },
    "sameAs": sameAs,
    "servesCuisine": ["Bubble Tea", "Indian Street Food", "Desserts"],
    "priceRange": "£",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  }
}
