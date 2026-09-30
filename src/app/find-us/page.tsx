import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getSiteSettingsQuery } from "@/sanity/lib/queries"
import { Button } from "@/components/ui/Button"
import { MapPin, Clock, Phone, Mail, MessageCircle, Navigation, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Find Us | D'Lish Northampton",
  description: "Find D'Lish in Northampton. Get directions, view opening hours, and contact us for collection and delivery.",
}

export const revalidate = 3600

export default async function FindUsPage() {
  const settings = await sanityFetch<any>({ query: getSiteSettingsQuery, tags: ['siteSettings'] })

  return (
    <div className="container mx-auto px-4 max-w-5xl py-10 min-h-[calc(100vh-160px)]">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold text-brand-dark mb-4">Find D'Lish</h1>
        <p className="text-stone-500 font-medium text-lg">We can't wait to see you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Info Column */}
        <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm flex flex-col gap-8">
          
          <div className="flex items-start gap-4">
            <div className="bg-brand-karak/10 p-3 rounded-full text-brand-karak">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 text-brand-dark">Address</h3>
              <p className="text-stone-600 whitespace-pre-line">{settings?.address}</p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(settings?.address || 'Northampton')}`} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4 mr-2" /> Get Directions
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-brand-protein/10 p-3 rounded-full text-brand-protein">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 text-brand-dark">Opening Hours</h3>
              <p className="text-stone-600 whitespace-pre-line">{settings?.openingHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-brand-bubbletea/10 p-3 rounded-full text-brand-bubbletea">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 text-brand-dark">Contact</h3>
              <div className="flex flex-col gap-1 text-stone-600 mb-3">
                <a href={`tel:${settings?.phone}`} className="hover:text-brand-bubbletea transition-colors flex items-center gap-2"><Phone className="w-4 h-4"/> {settings?.phone}</a>
                <a href={`mailto:${settings?.email}`} className="hover:text-brand-bubbletea transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> {settings?.email}</a>
              </div>
              <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-md" asChild>
                <a href={`https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-8 flex flex-col gap-6">
            <div className="bg-stone-50 rounded-2xl p-4 flex items-start gap-3 border border-stone-200">
              <Info className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-brand-dark mb-1">Collection</h4>
                <p className="text-sm text-stone-500">{settings?.collectionInfo}</p>
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-4 flex items-start gap-3 border border-stone-200">
              <Info className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-brand-dark mb-1">Delivery</h4>
                <p className="text-sm text-stone-500">{settings?.deliveryInfo}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Map Column */}
        <div className="bg-stone-200 rounded-3xl h-full min-h-[400px] overflow-hidden relative shadow-inner">
          {settings?.mapEmbedUrl ? (
            <iframe 
              src={settings.mapEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-bold">
              Map View Unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
