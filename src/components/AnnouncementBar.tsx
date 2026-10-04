'use client'

import { useState } from "react"
import { X } from "lucide-react"

interface AnnouncementBarProps {
  announcement: {
    isActive: boolean;
    text: string;
    linkUrl?: string;
    hideAfter?: string;
  };
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!announcement || !announcement.isActive || !isVisible) {
    return null
  }

  // Check if we should hide it based on date
  if (announcement.hideAfter) {
    const hideDate = new Date(announcement.hideAfter)
    if (new Date() > hideDate) {
      return null
    }
  }

  const content = (
    <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
      <p className="text-sm font-bold text-center pr-8">
        {announcement.text}
      </p>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )

  if (announcement.linkUrl) {
    return (
      <a href={announcement.linkUrl} className="block bg-brand-highlight text-brand-dark hover:brightness-105 transition-all">
        {content}
      </a>
    )
  }

  return (
    <div className="bg-brand-highlight text-brand-dark">
      {content}
    </div>
  )
}
