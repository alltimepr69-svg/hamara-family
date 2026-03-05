import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProfile, DailyData, vibrate } from '@/lib/utils';
import { Onboarding } from '@/components/Onboarding';
import { ProfileSelector } from '@/components/ProfileSelector';
import { Dashboard } from '@/components/Dashboard';
import { InstallPrompt } from '@/components/InstallPrompt';
import { IntroAnimation } from '@/components/IntroAnimation';
import { format, subDays, parseISO, isBefore } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from '@/context/LanguageContext';

function AppContent() {
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>('vibefit_profiles', []);
  const [history, setHistory] = useLocalStorage<DailyData[]>('vibefit_history', []);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Get today's date string
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // Migration for existing profiles
  useEffect(() => {
    const migratedProfiles = profiles.map(p => ({
      ...p,
      startDate: p.startDate || todayStr
    }));
    
    if (JSON.stringify(migratedProfiles) !== JSON.stringify(profiles)) {
      setProfiles(migratedProfiles);
    }
  }, [profiles, setProfiles, todayStr]);

  // Find active profile
  const activeProfile = profiles.find(p => p.id === activeProfileId);

  // Get or create today's data for active profile
  const userHistory = history.filter((h) => h.userId === activeProfileId);
  const todayData = userHistory.find(h => h.date === todayStr) || {
    userId: activeProfileId,
    date: todayStr,
    caloriesConsumed: 0,
    steps: 0,
    logs: [],
    goalMet: false
  };

  const handleProfileComplete = (newProfile: UserProfile) => {
    // Ensure startDate is set
    const profileWithDate = { ...newProfile, startDate: todayStr };
    setProfiles([...profiles, profileWithDate]);
    setActiveProfileId(newProfile.id);
    setIsCreatingProfile(false);
  };

  const handleUpdateData = (newData: DailyData) => {
    if (!activeProfileId) return;
    // Add userId to the data before saving
    const dataWithUser = { ...newData, userId: activeProfileId };
    
    // Update history: remove old entry for this date (if exists) and add new one
    const otherHistory = history.filter((h) => !(h.date === newData.date && h.userId === activeProfileId));
    setHistory([...otherHistory, dataWithUser]);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
  };

  // Calculate streak for a given user
  const calculateStreak = (userId: string, userStartDate?: string) => {
    const userLogs = history.filter(h => h.userId === userId);
    let streak = 0;
    
    // Check today
    const todayLog = userLogs.find(h => h.date === todayStr);
    if (todayLog?.goalMet) {
      streak++;
    }

    // Check previous days
    let dayOffset = 1;
    while (true) {
      const dateToCheck = format(subDays(new Date(), dayOffset), 'yyyy-MM-dd');
      
      // Stop if we go before start date (if provided)
      if (userStartDate && isBefore(parseISO(dateToCheck), parseISO(userStartDate))) {
        break;
      }

      const log = userLogs.find(h => h.date === dateToCheck);
      if (log?.goalMet) {
        streak++;
        dayOffset++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Calculate streaks for all profiles for the selector
  const profileStreaks = profiles.reduce((acc, profile) => {
    acc[profile.id] = calculateStreak(profile.id, profile.startDate);
    return acc;
  }, {} as Record<string, number>);

  const activeStreak = activeProfileId ? calculateStreak(activeProfileId, activeProfile?.startDate) : 0;

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-100/10 via-black to-black font-sans text-neutral-100 selection:bg-amber-500/30 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation 
            key="intro"
            onComplete={() => {
              setShowIntro(false);
            }} 
          />
        )}

        {!showIntro && (isCreatingProfile || profiles.length === 0) && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            {profiles.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  vibrate(10);
                  setIsCreatingProfile(false);
                }}
                className="absolute top-6 left-6 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors z-50"
              >
                <ChevronLeft size={24} />
              </motion.button>
            )}
            <Onboarding onComplete={handleProfileComplete} />
          </motion.div>
        )}

        {!showIntro && !activeProfileId && !isCreatingProfile && profiles.length > 0 && (
          <motion.div
            key="profile-selector"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            <ProfileSelector 
              profiles={profiles} 
              onSelect={(p) => setActiveProfileId(p.id)} 
              onNewProfile={() => setIsCreatingProfile(true)}
              streaks={profileStreaks}
            />
          </motion.div>
        )}

        {!showIntro && activeProfileId && !isCreatingProfile && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            <Dashboard 
              profile={activeProfile!} 
              dailyData={todayData} 
              allHistory={userHistory}
              onUpdateData={handleUpdateData}
              onUpdateProfile={handleUpdateProfile}
              onLogout={() => setActiveProfileId(null)}
              streak={activeStreak}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <InstallPrompt />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
