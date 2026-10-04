'use client'

import { useState, useRef } from "react"
import { Button, ButtonProps } from "./ui/Button"
import { OrderModal } from "./OrderModal"

interface OrderButtonProps extends ButtonProps {
  settings: any;
  label?: string;
}

export function OrderButton({ settings, label = "ORDER NOW", className, onClick, ...props }: OrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button 
        ref={buttonRef} 
        {...props}
        className={className}
        onClick={(e) => {
          setIsOpen(true)
          if (onClick) onClick(e)
        }} 
      >
        {label}
      </Button>
      
      <OrderModal 
        settings={settings} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        triggerRef={buttonRef} 
      />
    </>
  )
}
