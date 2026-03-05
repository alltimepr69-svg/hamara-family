import { useState, useEffect } from 'react';
import { Button } from './UI';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { vibrate } from '@/lib/utils';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 flex justify-center"
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm w-full">
            <div className="flex-1">
              <h3 className="font-bold text-neutral-100 text-sm">Install App</h3>
              <p className="text-xs text-neutral-400">Add to home screen for quick access</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  vibrate(10);
                  setShowPrompt(false);
                }}
                className="px-3 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200"
              >
                Later
              </button>
              <Button 
                onClick={handleInstall}
                className="py-2 px-3 text-xs flex items-center gap-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/20 shadow-none"
              >
                <Download size={14} /> Install
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
