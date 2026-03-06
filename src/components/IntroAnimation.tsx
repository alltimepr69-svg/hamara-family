import { FC } from 'react';
import { motion } from 'motion/react';
import logoSvg from '@/assets/logo.svg';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: FC<IntroAnimationProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30 scale-150"
          />
          <img
            src={logoSvg}
            alt="FitHona"
            className="w-24 h-24 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          />
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500"
        >
          FitHona
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-neutral-400 font-medium tracking-widest uppercase"
        >
          Fitness Together
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
