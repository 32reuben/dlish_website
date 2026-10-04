"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CinematicLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    // Force scroll to top on page refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const hasSeenLoader = sessionStorage.getItem('dlish_has_seen_loader_v2');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // We proceed if they haven't seen it. If they have reduced motion on, we still run it 
    // but GSAP will automatically be smoother. However, to ensure they see it during testing:
    if (!hasSeenLoader) {
      setShouldRun(true);
      sessionStorage.setItem('dlish_has_seen_loader_v2', 'true');
    } else {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
    }
  }, []);

  useEffect(() => {
    if (!shouldRun) return;

    // Lock body scroll and force to top while loading
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    
    const forceTop = setInterval(() => window.scrollTo(0, 0), 50);

    // Failsafe timeout to prevent getting stuck
    const failsafe = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
        document.body.style.overflow = '';
      }
      clearInterval(forceTop);
    }, 4000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
            containerRef.current.style.display = 'none';
          }
          document.body.style.overflow = '';
          clearInterval(forceTop);
          clearTimeout(failsafe);
        }
      });

      // 0. Loading Progress Logic
      const progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const p = Math.round(progressObj.value);
          if (progressTextRef.current) progressTextRef.current.innerText = `${p}%`;
          if (progressBarRef.current) progressBarRef.current.style.width = `${p}%`;

          if (textRef.current) {
            if (p <= 33) {
              textRef.current.innerText = "Something delicious is coming...";
            } else if (p <= 66) {
              textRef.current.innerText = "Blending. Brewing. Chilling.";
            } else {
              textRef.current.innerText = "Welcome to Dlish. 🍓🍫";
            }
          }
        }
      }, 0);

      // 1. Initial State (0-0.8s)
      tl.to(containerRef.current, { opacity: 1, duration: 0.1 }, 0);
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0);

      // Elements setup
      const allElements = gsap.utils.toArray('.food-element') as HTMLElement[];
      
      // 2. Ingredients appear and gather towards center (0.8 - 2.4s)
      tl.fromTo(allElements, 
        { 
          opacity: 0,
          scale: (i, el) => parseFloat(el.getAttribute('data-scale') || '1'),
          x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
          y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
          rotation: () => (Math.random() - 0.5) * 360,
        },
        { 
          opacity: 1,
          x: () => (Math.random() - 0.5) * 100,
          y: () => (Math.random() - 0.5) * 100,
          rotation: "+=90",
          duration: 1.6,
          stagger: { amount: 0.4, from: "random" },
          ease: "power1.inOut" 
        }, 
        0.8
      );

      // They accelerate and get sucked tightly into the center (1.6 - 2.4s)
      tl.to(allElements, {
        x: 0,
        y: 0,
        scale: 0.5,
        rotation: "+=180",
        duration: 0.8,
        ease: "power3.in"
      }, 1.6);
      
      tl.to(logoRef.current, { scale: 0.8, duration: 0.8, ease: "power3.in" }, 1.6);

      // 3. MAIN EXPLOSION (2.4 - 2.6s)
      tl.to(allElements, {
        x: (i, el) => {
          const depth = parseFloat(el.getAttribute('data-depth') || '1');
          return (Math.random() - 0.5) * window.innerWidth * 2 * depth;
        },
        y: (i, el) => {
          const depth = parseFloat(el.getAttribute('data-depth') || '1');
          return (Math.random() - 0.5) * window.innerHeight * 2 * depth;
        },
        scale: (i, el) => {
          const depth = parseFloat(el.getAttribute('data-depth') || '1');
          return parseFloat(el.getAttribute('data-scale') || '1') * depth * 2;
        },
        rotation: "+=720",
        opacity: 0,
        duration: 0.6, // slight overlap
        ease: "expo.out"
      }, 2.4);

      tl.to(logoRef.current, { scale: 1.5, opacity: 0, duration: 0.4, ease: "expo.out" }, 2.4);
      
      // Hide loading texts instantly on explosion
      tl.to([textRef.current, progressTextRef.current, progressBarRef.current?.parentElement], { opacity: 0, duration: 0.1 }, 2.4);

      // 4. Cinematic Impact Flash (2.4 - 2.5s)
      tl.fromTo(flashRef.current, { opacity: 0 }, { opacity: 0.15, duration: 0.1, ease: "power1.in" }, 2.4);
      tl.to(flashRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, 2.5);

      // 5. Homepage Reveal (2.6 - 3.0s)
      // Using a simple opacity fade instead of expensive clip-path circle for maximum mobile performance
      tl.to(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 2.5);

    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(failsafe);
    };
  }, [shouldRun]);

  const [particleCount, setParticleCount] = useState(10);

  useEffect(() => {
    // Ensuring consistent 10 elements for optimal cross-device performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setParticleCount(10);
    }
  }, []);

  if (!shouldRun) return null;

  const generateElements = (type: 'strawberry' | 'chocolate', count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const isForeground = Math.random() > 0.7;
      const isBackground = !isForeground && Math.random() > 0.5;
      
      let depth = 1;
      let scale = 1;
      let zIndex = 40;
      // We removed CSS blur because it causes severe lag on low-end mobile devices during rapid movement.

      if (isForeground) {
        depth = 2.5;
        scale = 1.5;
        zIndex = 60;
      } else if (isBackground) {
        depth = 0.5;
        scale = 0.5;
        zIndex = 20;
      }

      // Varing sizes for fragments
      if (Math.random() > 0.7) scale *= 0.3; // Tiny crumbs/seeds

      const content = type === 'strawberry' 
        ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M16.46 2.37c-.72-1.39-2.73-1.63-4.14-.5l-1.07.86c-1.33-1.42-3.8-1-4.22.95-.59 2.7 1.51 5.92 4.49 10.36 2.58 3.86 6.8 5.76 10.19 6.27-.45-2.22-1.87-5.97-5.25-17.94z"/></svg>
        : <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>;

      // Removed 'drop-shadow-lg' to drastically improve mobile FPS
      return (
        <div 
          key={`${type}-${i}`} 
          className={`food-element absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 pointer-events-none flex items-center justify-center ${type === 'strawberry' ? 'text-brand-accent' : 'text-amber-900'}`}
          data-depth={depth}
          data-scale={scale}
          style={{ zIndex }}
        >
          {content}
        </div>
      );
    });
  };

// Moved hooks above

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-light overflow-hidden pointer-events-auto"
      style={{ opacity: 0 }} 
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.08) 100%)' }} />
      
      {/* Subtle Flash Overlay */}
      <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 z-[999] pointer-events-none" />

      {/* Central Logo */}
      <img 
        ref={logoRef}
        src="/logo-main.png" 
        alt="D'Lish" 
        className="w-48 md:w-64 relative z-50 mb-12"
      />

      {/* Loading Progress & Text */}
      <div className="absolute bottom-20 flex flex-col items-center w-full max-w-xs px-6 z-50">
        <div ref={textRef} className="text-stone-500 font-medium text-sm md:text-base mb-4 tracking-wide h-6 text-center">
          Something delicious is coming...
        </div>
        
        <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden mb-2 relative">
          <div ref={progressBarRef} className="h-full bg-brand-accent w-0 rounded-full transform-gpu" />
        </div>
        
        <div ref={progressTextRef} className="text-brand-dark font-display font-bold text-lg">
          0%
        </div>
      </div>

      {/* Food Elements */}
      <div ref={elementsRef} className="absolute inset-0 pointer-events-none">
        {generateElements('strawberry', particleCount)}
        {generateElements('chocolate', particleCount)}
      </div>
    </div>
  );
}
