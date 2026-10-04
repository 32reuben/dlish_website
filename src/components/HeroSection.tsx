"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring, useTransform, useScroll, useMotionValue } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Zap, ArrowRight, ChevronDown } from 'lucide-react';
import { OrderButton } from '@/components/OrderButton';
import { staggerContainer, fadeUpVariant, wordMaskVariant, blobVariant, easeCustom } from '@/lib/motion';

interface HeroProps {
  settings: any;
}

// --- MAGNETIC BUTTON ---
const MagneticButton = ({ children, className = "", reduceMotion }: { children: React.ReactNode, className?: string, reduceMotion: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block ${className}`}
      whileHover={!reduceMotion ? { scale: 1.03 } : {}}
      whileTap={!reduceMotion ? { scale: 0.97 } : {}}
    >
      {children}
    </motion.div>
  );
};

// --- BOBA PEARLS ---
const BobaPearls = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const [pearls, setPearls] = useState<Array<{ id: number, size: number, left: number, delay: number, duration: number }>>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5 : 12;
    setPearls(Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    })));
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pearls.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-dark opacity-10 backdrop-blur-sm"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: '-50px' }}
          animate={{
            y: ['0vh', '-120vh'],
            x: ['0px', `${Math.sin(p.id) * 30}px`, '0px'],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: p.delay }
          }}
        />
      ))}
    </div>
  );
};

// --- MARQUEE STRIP ---
const MarqueeStrip = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const items = [
    "Brown Sugar Boba", "Classic Karak Chai", "Spicy Pani Puri", 
    "Lean Chicken Box", "Loaded Desserts", "Protein Meals", "Fresh Street Food"
  ];
  
  if (reduceMotion) return null;

  return (
    <div className="w-full bg-brand-dark text-white py-3 overflow-hidden whitespace-nowrap relative border-t-4 border-brand-accent group">
      <motion.div 
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ '--marquee-hover-state': 'running' } as any}
      >
        <div className="flex gap-8 group-hover:[animation-play-state:paused]" style={{ animationPlayState: 'var(--marquee-hover-state)' }}>
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="font-display font-bold uppercase tracking-widest text-sm text-brand-light/90">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-bubbletea" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export function HeroSection({ settings }: HeroProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [videoFinished, setVideoFinished] = useState(false);

  return (
    <section ref={containerRef} className="relative bg-[#fdf9f1] overflow-hidden min-h-screen flex flex-col justify-start pt-16 md:pt-28 pb-0">
      
      {/* Cinematic Video Intro (Plays once then fades out) */}
      <motion.div 
        initial={{ opacity: 0.9 }}
        animate={{ opacity: videoFinished ? 0 : 0.9 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-[75vh] z-0 overflow-hidden mix-blend-multiply pointer-events-none"
      >
        {/* Mobile Video (9:16) */}
        <video 
          autoPlay 
          muted 
          playsInline 
          onEnded={() => setVideoFinished(true)}
          className="w-full h-full object-cover object-center block md:hidden"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Desktop Video (16:9) */}
        <video 
          autoPlay 
          muted 
          playsInline 
          onEnded={() => setVideoFinished(true)}
          className="w-full h-full object-cover object-center hidden md:block"
        >
          <source src="/hero-video-desktop.mp4" type="video/mp4" />
        </video>

        {/* Gradient mask so the video fades out smoothly at the bottom before hitting the milkshakes */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fdf9f1] to-transparent" />
      </motion.div>

      {/* Decorative Vectors from screenshot */}
      <div className="absolute right-[5%] md:right-[15%] top-[25%] hidden lg:block opacity-80 pointer-events-none z-10">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 30L20 35M40 10L30 20M50 25L35 32" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="absolute left-[10%] top-[40%] hidden lg:block opacity-80 pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 flex flex-col items-center pb-12 md:pb-20"
        style={!shouldReduceMotion ? { opacity: opacityHero, scale: scaleHero } : {}}
      >
        {/* Text Elements (Hidden while video is playing) */}
        <motion.div 
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ 
            opacity: videoFinished ? 1 : 0,
            y: videoFinished ? 0 : 20,
            filter: videoFinished ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative inline-block group">
            <Badge className="mb-4 md:mb-6 bg-pink-100 hover:bg-pink-100 text-pink-600 border-none px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              Northampton's Newest Vibe
            </Badge>
          </div>

          {/* Split word headline */}
          <h1 aria-label="Fresh flavours. Serious cravings." className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-[#321212] mb-4 md:mb-6 leading-[1.0] mx-auto flex flex-col items-center gap-0">
            <div className="flex flex-wrap justify-center gap-x-3 overflow-hidden py-1">
              {["Fresh", "flavours."].map((word, i) => (
                <span key={i} className="inline-block">{word}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 overflow-hidden py-1 relative">
              {["Serious", "cravings."].map((word, i) => (
                <span key={i} className="inline-block relative">
                  <span className="relative z-10">{word}</span>
                  {/* Hand-drawn underline from screenshot */}
                  {i === 0 && !shouldReduceMotion && videoFinished && (
                    <motion.svg 
                      className="absolute -bottom-1 left-0 w-full h-4 z-0" 
                      viewBox="0 0 100 10" 
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                      <path d="M0,5 Q50,9 100,2" stroke="#f43f5e" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </span>
              ))}
            </div>
          </h1>

          {/* Categories Text */}
          <p className="text-sm md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto font-bold tracking-wide">
            <span className="text-[#321212] mr-2">D'LISH:</span>
            <span className="text-orange-500">Street Food</span> 
            <span className="text-[#321212] opacity-40 mx-2">•</span> 
            <span className="text-pink-600">Bubble Tea</span> 
            <span className="text-[#321212] opacity-40 mx-2">•</span> 
            <span className="text-[#7b5c46]">Karak</span> 
            <span className="text-[#321212] opacity-40 mx-2">•</span> 
            <span className="text-pink-600">Desserts</span> 
            <span className="text-[#321212] opacity-40 mx-2">•</span> 
            <span className="text-[#7b5c46]">Protein Meals</span>
          </p>
        </motion.div>
        
        {/* Buttons (Always Visible) */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto z-20 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MagneticButton reduceMotion={shouldReduceMotion}>
            <OrderButton 
              settings={settings} 
              size="lg" 
              className="w-full sm:w-[300px] bg-[#820d27] hover:bg-[#680a1f] text-white font-bold px-10 py-5 md:py-7 text-lg rounded-full shadow-lg transition-transform group-hover:scale-[1.02] flex items-center justify-center gap-2" 
            />
          </MagneticButton>
          
          <MagneticButton reduceMotion={shouldReduceMotion}>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-[300px] bg-transparent border-2 border-[#820d27] text-[#820d27] hover:bg-[#820d27] hover:text-white font-bold px-10 py-5 md:py-7 text-lg rounded-full shadow-sm transition-all" 
              asChild
            >
              <Link href="/menu" className="flex items-center justify-center gap-2">
                EXPLORE MENU
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Marquee Milkshakes */}
      <div className="w-full relative z-0 overflow-hidden flex items-end mt-4">
        <motion.div 
          className="flex whitespace-nowrap gap-8 pb-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <img src="/products/mango passion.png" alt="Mango Passion" className="w-[180px] md:w-[300px] h-auto object-contain drop-shadow-xl" />
              <img src="/products/vanila milkshake.png" alt="Vanilla Milkshake" className="w-[180px] md:w-[300px] h-auto object-contain drop-shadow-xl" />
              <img src="/products/choclate milkshake.png" alt="Chocolate Milkshake" className="w-[180px] md:w-[300px] h-auto object-contain drop-shadow-xl" />
              <img src="/products/strawberry milkshake.png" alt="Strawberry Milkshake" className="w-[180px] md:w-[300px] h-auto object-contain drop-shadow-xl" />
              <img src="/products/watermelon breeze.png" alt="Watermelon Breeze" className="w-[180px] md:w-[300px] h-auto object-contain drop-shadow-xl" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
