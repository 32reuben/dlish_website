import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bubbletea disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            'bg-brand-dark text-white hover:bg-black': variant === 'primary',
            'bg-brand-bubbletea text-white hover:bg-fuchsia-600': variant === 'secondary',
            'border-2 border-brand-dark bg-transparent hover:bg-brand-dark hover:text-white': variant === 'outline',
            'hover:bg-stone-200 text-brand-dark': variant === 'ghost',
            'h-10 px-4 py-2 text-sm': size === 'sm',
            'h-12 px-6 py-3 text-base': size === 'md',
            'h-14 px-8 py-4 text-lg': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
