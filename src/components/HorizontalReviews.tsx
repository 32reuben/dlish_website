"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Testimonial {
  displayName: string;
  text: string;
  source: string;
}

interface Props {
  testimonials: Testimonial[];
}

export function HorizontalReviews({ testimonials }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // We duplicated the content inside the track so it can loop seamlessly.
    // The track width is 2x the actual content. We animate it left by 50%.
    gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 30, // Adjust this value to change the speed
      repeat: -1
    });

  }, { scope: containerRef });

  if (!testimonials || testimonials.length === 0) return null;

  // Duplicate testimonials for the seamless loop effect
  const loopingTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden py-16 md:py-24">
      
      <div className="container mx-auto px-6 mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">What they say</h2>
        <div className="flex justify-center md:justify-start text-yellow-400 text-lg mb-2 gap-1">★★★★★</div>
        <p className="text-stone-500 font-medium text-lg">Real Google Reviews</p>
      </div>

      <div className="w-full overflow-hidden">
        <div 
          ref={trackRef} 
          className="flex w-max"
        >
          {loopingTestimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-stone-50 border border-stone-100 rounded-[2rem] p-8 md:p-10 w-[85vw] max-w-[320px] md:w-[400px] flex-shrink-0 mx-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="flex text-yellow-400 text-sm md:text-base mb-6 gap-1">★★★★★</div>
              <p className="text-stone-700 text-lg font-medium leading-relaxed mb-8 flex-grow">"{t.text}"</p>
              <div className="mt-auto pt-4 border-t border-stone-200">
                <p className="font-bold text-brand-dark text-lg">{t.displayName}</p>
                <p className="text-stone-400 text-sm flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 22.42c-5.75 0-10.42-4.67-10.42-10.42S6.24 1.58 11.99 1.58s10.42 4.67 10.42 10.42-4.67 10.42-10.42 10.42zm0-19.26C7.12 3.16 3.16 7.12 3.16 12s3.96 8.84 8.83 8.84 8.84-3.96 8.84-8.84-3.96-8.84-8.84-8.84z"/><path d="M16.5 12h-4.5V7.5h1.5v3h3z"/></svg>
                  {t.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
