import React from 'react';
import { motion } from 'motion/react';
import { cn, vibrate } from '@/lib/utils';

// ─── Shared Animation Variants ───────────────────────────────────────────────
// Page: snappy spring — feels instant on mobile
export const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.975 },
  animate: { opacity: 1, y: 0,  scale: 1      },
  exit:    { opacity: 0, y: -8, scale: 0.975  }
};

export const pageTransition = {
  type: 'spring',
  stiffness: 420,
  damping:   36,
  mass:      0.7,
};

// Container: ultra-fast stagger so cards cascade in rapidly
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,   // was 0.1 — 60% faster cascade
      delayChildren:   0.02,
    }
  }
};

// Item: tight spring, smaller y travel
export const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show:   {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
};

export const Page = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
    className={cn("w-full h-full", className)}
  >
    {children}
  </motion.div>
);

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  [key: string]: any;
}

export const GlassCard = ({ children, className, hoverEffect = false, ...props }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      whileHover={hoverEffect ? { scale: 1.025, y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className={cn(
        "glass-panel rounded-3xl p-6",
        "text-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Button = ({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(245, 158, 11, 0.45)" }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      onClick={(e) => {
        vibrate(15);
        onClick?.(e);
      }}
      className={cn(
        "bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-amber-500/20",
        "hover:from-amber-400 hover:to-yellow-400 transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        "active:scale-95 touch-manipulation",
        className
      )}
      {...props}
    />
  );
};

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "w-full glass-input rounded-xl px-4 py-3.5 transition-all duration-150 focus:ring-2 focus:ring-amber-500/50 outline-none",
        "text-base",
        className
      )}
      {...props}
    />
  );
};

export const Select = ({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full glass-input rounded-xl px-4 py-3.5 appearance-none transition-all duration-150 focus:ring-2 focus:ring-amber-500/50 outline-none",
          "text-neutral-100 text-base",
          className
        )}
        {...props}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};
