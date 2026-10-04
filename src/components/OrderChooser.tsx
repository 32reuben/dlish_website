import { Phone } from "lucide-react"

interface OrderChooserProps {
  settings: any;
  onClose?: () => void;
}

export function OrderChooser({ settings }: OrderChooserProps) {
  const hasJustEat = !!settings?.justEatUrl
  const hasUberEats = !!settings?.uberEatsUrl
  
  if (!hasJustEat && !hasUberEats && !settings?.showCallInChooser) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-500 font-medium">Online ordering is currently unavailable.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {hasJustEat && (
          <a 
            href={settings.justEatUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center bg-[#F36D00] hover:brightness-110 transition-all rounded-[20px] p-6 h-[150px] md:h-[170px] no-underline group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-dark"
            aria-label="Order on Just Eat (opens in a new tab)"
          >
            <span className="text-white font-black text-2xl tracking-tight mb-4">Just Eat</span>
            <span className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-white text-white font-bold rounded-full text-sm group-hover:bg-white group-hover:text-[#F36D00] transition-colors">
              ORDER NOW
            </span>
          </a>
        )}
        
        {hasUberEats && (
          <a 
            href={settings.uberEatsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center bg-[#142328] hover:brightness-125 transition-all rounded-[20px] p-6 h-[150px] md:h-[170px] no-underline group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-dark"
            aria-label="Order on Uber Eats (opens in a new tab)"
          >
            <div className="flex items-center mb-4">
              <span className="text-white font-medium text-2xl tracking-tight">Uber</span>
              <span className="text-[#06C167] font-bold text-2xl tracking-tight ml-1">Eats</span>
            </div>
            <span className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-white text-white font-bold rounded-full text-sm group-hover:bg-white group-hover:text-[#142328] transition-colors">
              ORDER NOW
            </span>
          </a>
        )}
      </div>

      <div className="text-center border-t border-stone-200 pt-6">
        <p className="text-brand-dark font-medium mb-1">You'll finish your order on the app.</p>
        {settings?.openingHours && (
          <p className="text-stone-500 text-sm mb-4">{settings.openingHours}</p>
        )}
        
        {settings?.showCallInChooser && settings?.phone && (
          <a 
            href={`tel:${settings.phone.replace(/\s+/g, '')}`} 
            className="inline-flex items-center justify-center text-brand-dark hover:text-brand-accent font-bold transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call us: {settings.phone}
          </a>
        )}
      </div>
    </div>
  )
}
