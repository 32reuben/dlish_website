'use client'

import { useEffect, useRef, useState } from "react"
import { OrderChooser } from "./OrderChooser"
import { X } from "lucide-react"

interface OrderModalProps {
  settings: any;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

import { createPortal } from "react-dom"

export function OrderModal({ settings, isOpen, onClose, triggerRef }: OrderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      wasOpenRef.current = true
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      // Focus first focusable element
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement
        if (firstFocusable) {
          firstFocusable.focus()
        }
      }, 50)
    } else {
      document.body.style.overflow = "unset"
      // Return focus ONLY if it was previously open (prevents stealing focus on page load)
      if (wasOpenRef.current && triggerRef?.current) {
        triggerRef.current.focus()
      }
      wasOpenRef.current = false
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm transition-opacity" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
      <div 
        ref={modalRef}
        className="w-full max-w-lg md:max-w-2xl bg-brand-light rounded-[32px] p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 motion-reduce:transition-none motion-reduce:animate-none max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 id="order-modal-title" className="text-3xl font-display font-bold text-brand-dark">Order Online</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <OrderChooser settings={settings} onClose={onClose} />
      </div>
    </div>,
    document.body
  )
}
