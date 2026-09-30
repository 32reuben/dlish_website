"use client"

import { useState } from "react"
import Image from "next/image"
import { calculateBubbleTeaPrice } from "@/lib/priceCalculator"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, Check, ShoppingBag } from "lucide-react"

type Flavour = { name: string; extraPrice: number }
type Topping = { name: string; extraPrice: number }
type Settings = { multipleToppingsAllowed: boolean; maxToppings: number; regularSizeExtra: number; largeSizeExtra: number }

interface CustomiserProps {
  drink: any;
  flavours: Flavour[];
  toppings: Topping[];
  settings: Settings;
  siteSettings: any;
  sweetnessOptions: string[];
  iceOptions: string[];
}

export function CustomiserClient({ drink, flavours, toppings, settings, siteSettings, sweetnessOptions, iceOptions }: CustomiserProps) {
  const [step, setStep] = useState(1)
  
  // Selections
  const [flavour, setFlavour] = useState<Flavour>(flavours[0])
  const [size, setSize] = useState<'Regular' | 'Large'>('Regular')
  const [sweetness, setSweetness] = useState<string>(sweetnessOptions[2]) // Default 50%
  const [ice, setIce] = useState<string>(iceOptions[2]) // Default Regular
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])

  const totalSteps = 6

  // Price Calculation using the pure function
  const sizeExtraPrice = size === 'Large' ? settings.largeSizeExtra : settings.regularSizeExtra
  const toppingExtraPrices = selectedToppings.map(t => t.extraPrice)
  
  const totalPrice = calculateBubbleTeaPrice({
    basePrice: drink.price,
    flavourExtraPrice: flavour?.extraPrice || 0,
    sizeExtraPrice,
    toppingExtraPrices
  })

  const toggleTopping = (t: Topping) => {
    const exists = selectedToppings.find(x => x.name === t.name)
    if (exists) {
      setSelectedToppings(selectedToppings.filter(x => x.name !== t.name))
    } else {
      if (!settings.multipleToppingsAllowed) {
        setSelectedToppings([t])
      } else if (selectedToppings.length < settings.maxToppings) {
        setSelectedToppings([...selectedToppings, t])
      } else {
        alert(`Maximum ${settings.maxToppings} toppings allowed.`)
      }
    }
  }

  const handleOrder = () => {
    const orderDetails = `Hi D'Lish, I'd like:\n${drink.name}\nSize: ${size}\nFlavour: ${flavour.name}\nSweetness: ${sweetness}\nIce: ${ice}\nToppings: ${selectedToppings.length > 0 ? selectedToppings.map(t=>t.name).join(', ') : 'None'}\n\nTotal: ${formatPrice(totalPrice)}`
    
    if (siteSettings?.orderLinkType === 'WhatsApp') {
      const number = siteSettings.whatsappNumber?.replace(/[^0-9]/g, '') || '447000000000'
      const url = `https://wa.me/${number}?text=${encodeURIComponent(orderDetails)}`
      window.open(url, '_blank')
    } else if (siteSettings?.orderLinkType === 'Phone') {
      const number = siteSettings.orderLinkTarget || siteSettings.phone
      window.location.href = `tel:${number}`
    } else if (siteSettings?.orderLinkType === 'URL') {
      const url = siteSettings.orderLinkTarget
      window.open(url, '_blank')
    } else {
      // Fallback
      alert("Ordering is not configured yet.")
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden relative pb-24">
      
      {/* Header */}
      <div className="bg-brand-bubbletea/10 p-6 md:p-8 text-center relative border-b border-brand-bubbletea/20">
        <h1 className="font-display text-3xl font-bold text-brand-dark">D'LISH BUBBLE TEA</h1>
        <p className="text-brand-bubbletea font-bold tracking-widest text-xs uppercase mt-2">Shake it. Sip it. Love it.</p>
        
        {/* Progress Bar */}
        <div className="mt-6 flex items-center justify-between gap-1 max-w-sm mx-auto">
          {Array.from({length: totalSteps}).map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i + 1 <= step ? 'bg-brand-bubbletea' : 'bg-stone-200'}`} />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Confirm Drink</h2>
            <div className="bg-stone-50 rounded-3xl p-6 flex flex-col items-center text-center border-2 border-brand-bubbletea shadow-md shadow-brand-bubbletea/20">
              {drink.image && (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
                  <Image src={drink.image} alt={drink.name} fill className="object-cover" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-brand-dark mb-2">{drink.name}</h3>
              <p className="text-stone-500 mb-4">{drink.desc}</p>
              <div className="bg-white px-4 py-2 rounded-full font-bold shadow-sm border border-stone-200">Base Price: {formatPrice(drink.price)}</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Choose Flavour</h2>
            <div className="grid grid-cols-2 gap-4">
              {flavours.map(f => (
                <button
                  key={f.name}
                  onClick={() => setFlavour(f)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${flavour?.name === f.name ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${flavour?.name === f.name ? 'bg-brand-bubbletea border-brand-bubbletea text-white' : 'border-stone-300'}`}>
                    {flavour?.name === f.name && <Check className="w-4 h-4" />}
                  </div>
                  <span className="font-bold text-lg">{f.name}</span>
                  {f.extraPrice > 0 && <span className="text-sm text-stone-500">+{formatPrice(f.extraPrice)}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Choose Size</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => setSize('Regular')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${size === 'Regular' ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
              >
                <div className="w-16 h-20 bg-stone-200 rounded-b-xl rounded-t flex items-end justify-center pb-2">R</div>
                <div className="text-center">
                  <span className="font-bold text-lg block">Regular</span>
                  {settings.regularSizeExtra > 0 && <span className="text-sm text-stone-500">+{formatPrice(settings.regularSizeExtra)}</span>}
                </div>
              </button>
              <button
                onClick={() => setSize('Large')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${size === 'Large' ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
              >
                <div className="w-20 h-24 bg-stone-200 rounded-b-xl rounded-t flex items-end justify-center pb-2">L</div>
                <div className="text-center">
                  <span className="font-bold text-lg block">Large</span>
                  {settings.largeSizeExtra > 0 && <span className="text-sm text-stone-500">+{formatPrice(settings.largeSizeExtra)}</span>}
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Sweetness Level</h2>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              {sweetnessOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSweetness(opt)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${sweetness === opt ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
                >
                  <span className="font-bold text-lg">{opt}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${sweetness === opt ? 'bg-brand-bubbletea border-brand-bubbletea text-white' : 'border-stone-300'}`}>
                    {sweetness === opt && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Ice Level</h2>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              {iceOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setIce(opt)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${ice === opt ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
                >
                  <span className="font-bold text-lg">{opt}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${ice === opt ? 'bg-brand-bubbletea border-brand-bubbletea text-white' : 'border-stone-300'}`}>
                    {ice === opt && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6">Toppings</h2>
            {settings.multipleToppingsAllowed && <p className="text-center text-sm text-stone-500 mb-6">Select up to {settings.maxToppings} toppings</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {toppings.map(t => {
                const isSelected = selectedToppings.some(x => x.name === t.name)
                return (
                  <button
                    key={t.name}
                    onClick={() => toggleTopping(t)}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${isSelected ? 'border-brand-bubbletea bg-brand-bubbletea/5 shadow-md shadow-brand-bubbletea/20' : 'border-stone-200 hover:border-brand-bubbletea/50 hover:bg-stone-50'}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-lg">{t.name}</span>
                      <span className="text-sm text-stone-500">+{formatPrice(t.extraPrice)}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${isSelected ? 'bg-brand-bubbletea border-brand-bubbletea text-white' : 'border-stone-300'}`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Summary</h2>
            
            <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 mb-8 space-y-4">
              <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-bold text-xl">{drink.name}</h3>
                  <p className="text-sm text-stone-500">{size}</p>
                </div>
                <span className="font-bold">{formatPrice(drink.price + sizeExtraPrice)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Flavour: {flavour.name}</span>
                {flavour.extraPrice > 0 && <span className="font-medium">+{formatPrice(flavour.extraPrice)}</span>}
              </div>
              
              <div className="flex justify-between text-sm text-stone-600">
                <span>Sweetness: {sweetness}</span>
              </div>
              
              <div className="flex justify-between text-sm text-stone-600">
                <span>Ice: {ice}</span>
              </div>
              
              {selectedToppings.length > 0 && (
                <div className="pt-2">
                  <span className="text-sm text-stone-500 font-bold uppercase tracking-wider block mb-2">Toppings</span>
                  {selectedToppings.map(t => (
                    <div key={t.name} className="flex justify-between text-sm mb-1">
                      <span className="text-stone-600">{t.name}</span>
                      <span className="font-medium">+{formatPrice(t.extraPrice)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button size="lg" className="w-full shadow-xl shadow-brand-bubbletea/20 text-lg flex items-center justify-center gap-2" onClick={handleOrder}>
              <ShoppingBag className="w-5 h-5" />
              ORDER NOW via WhatsApp
            </Button>
          </div>
        )}
      </div>

      {/* Persistent Live Price Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex items-center justify-between z-20">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total</span>
          <span className="font-display text-2xl font-bold text-brand-dark">{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {step > 1 && (
            <Button variant="outline" size="icon" onClick={() => setStep(s => s - 1)}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          {step <= totalSteps ? (
            <Button onClick={() => setStep(s => s + 1)} className="px-8 shadow-md">
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
