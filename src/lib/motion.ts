import { Variants } from "framer-motion";

// Easing curves
export const easeCustom = [0.22, 1, 0.36, 1] as const; // Smooth, snappy cubic-bezier

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: easeCustom, duration: 0.5 },
  },
};

export const wordMaskVariant: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { ease: easeCustom, duration: 0.5 },
  },
};

export const blobVariant: Variants = {
  animate: {
    scale: [1, 1.15, 0.9, 1],
    x: ["0%", "25%", "-15%", "0%"],
    y: ["0%", "-20%", "15%", "0%"],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
