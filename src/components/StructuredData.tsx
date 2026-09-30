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
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "D'Lish",
    "image": "https://dlish.example.com/logo.png",
    "@id": "https://dlish.example.com",
    "url": "https://dlish.example.com",
    "telephone": settings?.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.address,
      "addressLocality": "Northampton",
      "addressCountry": "UK"
    },
    "servesCuisine": ["Bubble Tea", "Indian Street Food", "Desserts"],
    "priceRange": "£",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ]
  }
}
