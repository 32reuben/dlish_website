"use client"

import { useState, useActionState, useEffect } from "react"
import { submitCateringEnquiry } from "@/app/actions/catering"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function CateringForm() {
  const [state, formAction, isPending] = useActionState(submitCateringEnquiry, null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (state?.success) {
      setIsSuccess(true)
    }
  }, [state])

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-4">Request Sent!</h3>
        <p className="text-stone-600 mb-8 max-w-md">
          {state?.message || "Thanks for your enquiry! Our team will get back to you within 24 hours to discuss your event."}
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another Enquiry</Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm flex flex-col gap-6">
      
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      {/* Honeypot field (hidden from users, stops bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this empty if you are human</label>
        <input type="text" name="honeypot" id="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold text-sm text-brand-dark">Full Name *</label>
          <input type="text" id="name" name="name" required className={`px-4 py-3 rounded-xl border ${state?.fieldErrors?.name ? 'border-red-500' : 'border-stone-200'} bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea`} />
          {state?.fieldErrors?.name && <p className="text-red-500 text-xs font-bold">{state.fieldErrors.name[0]}</p>}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-sm text-brand-dark">Email Address *</label>
          <input type="email" id="email" name="email" required className={`px-4 py-3 rounded-xl border ${state?.fieldErrors?.email ? 'border-red-500' : 'border-stone-200'} bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea`} />
          {state?.fieldErrors?.email && <p className="text-red-500 text-xs font-bold">{state.fieldErrors.email[0]}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold text-sm text-brand-dark">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required className={`px-4 py-3 rounded-xl border ${state?.fieldErrors?.phone ? 'border-red-500' : 'border-stone-200'} bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea`} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="eventDate" className="font-bold text-sm text-brand-dark">Event Date *</label>
          <input type="date" id="eventDate" name="eventDate" required className="px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="guestCount" className="font-bold text-sm text-brand-dark">Guest Count *</label>
          <input type="number" id="guestCount" name="guestCount" required min="10" className="px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea" />
        </div>
        
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="eventLocation" className="font-bold text-sm text-brand-dark">Event Location / Postcode *</label>
          <input type="text" id="eventLocation" name="eventLocation" required className="px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="eventType" className="font-bold text-sm text-brand-dark">Event Type *</label>
        <select id="eventType" name="eventType" required className="px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea appearance-none">
          <option value="">Select event type...</option>
          <option value="Birthday Party">Birthday Party</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Wedding">Wedding</option>
          <option value="Festival/Public Event">Festival / Public Event</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-bold text-sm text-brand-dark">Additional Details</label>
        <textarea id="message" name="message" rows={4} className="px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-bubbletea resize-none"></textarea>
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="mt-4 w-full sm:w-auto self-end shadow-md">
        {isPending ? "Submitting..." : "Submit Enquiry"}
      </Button>

    </form>
  )
}
