import { useState, useEffect, useRef } from 'react';
import { Home, Utensils, Calendar, User, BarChart2 } from 'lucide-react';
import { cn, vibrate } from '@/lib/utils';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

interface BottomNavProps {
  activeTab: 'home' | 'food' | 'calendar' | 'profile' | 'stats';
  onTabChange: (tab: 'home' | 'food' | 'calendar' | 'profile' | 'stats') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisibleState] = useState(true);
  const isVisibleRef = useRef(true);
  const lastScrollY = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const setIsVisible = (visible: boolean) => {
    setIsVisibleState(visible);
    isVisibleRef.current = visible;
  };

  const startTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIsVisible(false);
      timer.current = null;
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling Up -> Show
        setIsVisible(true);
        startTimer();
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling Down -> Hide
        setIsVisible(false);
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isAtBottom = e.clientY > window.innerHeight - 100;
      if (isAtBottom) {
        setIsVisible(true);
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
      } else {
        // If we leave bottom area and are visible, start timer to auto-hide
        if (isVisibleRef.current && timer.current === null) {
            startTimer();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial timer
    startTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Keep visible when changing tabs
  useEffect(() => {
      setIsVisible(true);
      startTimer();
  }, [activeTab]);

  const tabs = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'food', label: t('food'), icon: Utensils },
    { id: 'calendar', label: t('calendar'), icon: Calendar },
    { id: 'stats', label: t('stats'), icon: BarChart2 },
    { id: 'profile', label: t('profile'), icon: User },
  ] as const;

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/5 px-6 py-2 pb-6 z-50 flex justify-between items-center max-w-md mx-auto"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              vibrate(10);
              onTabChange(tab.id as any);
            }}
            className="flex flex-col items-center gap-1 relative p-2"
          >
            <div
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-amber-500/20 text-amber-400" : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-bold tracking-wider transition-colors uppercase",
              isActive ? "text-amber-400" : "text-neutral-500"
            )}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-2 w-1 h-1 bg-amber-400 rounded-full"
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
};
