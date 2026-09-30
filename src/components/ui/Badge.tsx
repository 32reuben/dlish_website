import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'trending' | 'new' | 'bestseller' | 'limited';
}

function Badge({ className, variant = 'new', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm",
        {
          'bg-brand-bubbletea text-white': variant === 'trending',
          'bg-brand-protein text-white': variant === 'new',
          'bg-brand-karak text-white': variant === 'bestseller',
          'bg-brand-dark text-brand-light': variant === 'limited',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
