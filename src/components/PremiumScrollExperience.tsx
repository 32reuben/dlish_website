"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { formatPrice } from '@/lib/utils';
import { OrderButton } from './OrderButton';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");
}

// These interfaces match the existing product data structure
interface Product {
  name: string;
  desc: string;
  price: number;
  image?: string;
}

interface Props {
  milkshake: Product;
  bubbleTea: Product;
  frappe: Product;
  settings: any;
}

export function PremiumScrollExperience({ milkshake, bubbleTea, frappe, settings }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // --- MILKSHAKE SECTION ---
    const msTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ms-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // Entrance
    gsap.fromTo(".ms-image", 
      { opacity: 0, y: 100, scale: 0.85, rotation: -6 },
      { 
        opacity: 1, y: 0, scale: 1, rotation: 0, 
        duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".ms-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        }
      }
    );

    // Parallax during scroll
    msTl.to(".ms-image", { y: -50, rotation: 3, scale: 1.05 }, 0);
    msTl.to(".ms-bg-decor", { y: -150 }, 0);

    // Text reveal staggered
    gsap.fromTo(".ms-text > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ms-section",
          start: "top 60%",
        }
      }
    );

    // --- BUBBLE TEA SECTION ---
    const btTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".bt-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    gsap.fromTo(".bt-image", 
      { opacity: 0, x: 100, rotation: 5, scale: 0.9 },
      { 
        opacity: 1, x: 0, rotation: 0, scale: 1, 
        duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".bt-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        }
      }
    );

    btTl.to(".bt-image", { y: -60, x: -20, rotation: -2 }, 0);
    btTl.to(".bt-bg-decor", { y: -120, rotation: -10 }, 0);
    // Floating bubbles
    btTl.to(".bt-bubble", { y: -200, stagger: 0.1 }, 0);

    gsap.fromTo(".bt-text > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bt-section",
          start: "top 60%",
        }
      }
    );

    // --- FRAPPE SECTION ---
    const fpTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fp-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    gsap.fromTo(".fp-image", 
      { opacity: 0, y: 100, scale: 0.88, rotation: -4 },
      { 
        opacity: 1, y: 0, scale: 1, rotation: 0, 
        duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".fp-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        }
      }
    );

    fpTl.to(".fp-image", { y: -40, rotation: 2, scale: 1.02 }, 0);
    fpTl.to(".fp-bg-decor", { y: -100, scale: 1.1 }, 0);

    gsap.fromTo(".fp-text > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fp-section",
          start: "top 60%",
        }
      }
    );

    // Refresh on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, { scope: container });

  return (
    <div ref={container} className="w-full overflow-hidden flex flex-col">
      
      {/* 1. MILK SHAKE SECTION */}
      <section className="ms-section relative min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-stone-50 overflow-hidden">
        {/* Layer 1: Background Decoration */}
        <div className="ms-bg-decor absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-brand-bubbletea/10 rounded-full blur-3xl pointer-events-none" />
        <div className="ms-bg-decor absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-brand-dark/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Layer 3: Product */}
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[40vh]">
            <div className="ms-image relative w-full max-w-[400px] aspect-[4/5]">
              {milkshake.image ? (
                <Image src={milkshake.image} alt={milkshake.name} fill className="object-contain drop-shadow-2xl" priority />
              ) : (
                <div className="w-full h-full bg-stone-200 rounded-3xl flex items-center justify-center text-stone-400 font-display font-bold text-2xl shadow-2xl">
                  [Milk Shake Image]
                </div>
              )}
            </div>
          </div>
          
          {/* Layer 4: Text */}
          <div className="ms-text w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-brand-bubbletea font-bold tracking-widest uppercase text-sm mb-4">Signature Shake</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark mb-6 leading-tight">{milkshake.name}</h2>
            <p className="text-lg text-stone-600 mb-8 max-w-md">{milkshake.desc || "A rich and creamy classic, blended to perfection for serious cravings."}</p>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-display font-bold text-brand-dark">{formatPrice(milkshake.price)}</span>
              <OrderButton settings={settings} variant="primary" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-brand-dark/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUBBLE TEA SECTION */}
      <section className="bt-section relative min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-brand-dark overflow-hidden text-white">
        {/* Layer 1 & 2: Background Decoration & Bubbles */}
        <div className="bt-bg-decor absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-brand-bubbletea) 0%, transparent 50%)' }} />
        
        {/* Decorative bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bt-bubble absolute rounded-full bg-brand-bubbletea/30 backdrop-blur-sm"
              style={{
                width: Math.random() * 60 + 20 + 'px',
                height: Math.random() * 60 + 20 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + 50 + '%',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          {/* Layer 3: Product */}
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[40vh]">
            <div className="bt-image relative w-full max-w-[400px] aspect-[4/5]">
              {bubbleTea.image ? (
                <Image src={bubbleTea.image} alt={bubbleTea.name} fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
              ) : (
                <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white/50 font-display font-bold text-2xl shadow-2xl border border-white/10">
                  [Bubble Tea Image]
                </div>
              )}
            </div>
          </div>
          
          {/* Layer 4: Text */}
          <div className="bt-text w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-brand-bubbletea font-bold tracking-widest uppercase text-sm mb-4">Premium Boba</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">{bubbleTea.name}</h2>
            <p className="text-lg text-stone-300 mb-8 max-w-md">{bubbleTea.desc || "Refreshing and bold. Chewy tapioca pearls in our signature brewed tea."}</p>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-display font-bold text-white">{formatPrice(bubbleTea.price)}</span>
              <OrderButton settings={settings} className="rounded-full px-8 py-6 text-lg bg-brand-bubbletea text-brand-dark hover:bg-white shadow-lg shadow-brand-bubbletea/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ICED FRAPPE SECTION */}
      <section className="fp-section relative min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-[#D1EAF0] overflow-hidden">
        {/* Layer 1: Background Decoration */}
        <div className="fp-bg-decor absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 70%, white 0%, transparent 60%)' }} />
        
        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Layer 3: Product */}
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[40vh]">
            <div className="fp-image relative w-full max-w-[400px] aspect-[4/5]">
              {frappe.image ? (
                <Image src={frappe.image} alt={frappe.name} fill className="object-contain drop-shadow-2xl" />
              ) : (
                <div className="w-full h-full bg-white/50 backdrop-blur-md rounded-3xl flex items-center justify-center text-brand-dark/50 font-display font-bold text-2xl shadow-xl border border-white">
                  [Iced Frappe Image]
                </div>
              )}
            </div>
          </div>
          
          {/* Layer 4: Text */}
          <div className="fp-text w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-brand-dark font-bold tracking-widest uppercase text-sm mb-4">Ice Cold</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark mb-6 leading-tight">{frappe.name}</h2>
            <p className="text-lg text-stone-700 mb-8 max-w-md">{frappe.desc || "The ultimate indulgence. Ice blended to frosty perfection."}</p>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-display font-bold text-brand-dark">{formatPrice(frappe.price)}</span>
              <OrderButton settings={settings} variant="primary" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-brand-dark/10" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
