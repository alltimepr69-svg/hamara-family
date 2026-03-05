import { UserProfile, vibrate } from '@/lib/utils';
import { GlassCard, containerVariants, itemVariants } from './UI';
import { User, Plus, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileSelectorProps {
  profiles: UserProfile[];
  onSelect: (profile: UserProfile) => void;
  onNewProfile: () => void;
  streaks: Record<string, number>;
}

export const ProfileSelector = ({ profiles, onSelect, onNewProfile, streaks }: ProfileSelectorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-500 text-lg">Who is tracking today?</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {profiles.map((profile) => (
          <GlassCard
            key={profile.id}
            hoverEffect
            variants={itemVariants}
            onClick={() => {
              vibrate(10);
              onSelect(profile);
            }}
            className="cursor-pointer flex flex-col items-center justify-center py-10 gap-4 group hover:border-amber-500/30 transition-colors relative overflow-hidden"
          >
            {streaks[profile.id] > 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                <Flame size={12} fill="currentColor" />
                {streaks[profile.id]}
              </div>
            )}
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-amber-500/20">
              <User size={40} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">{profile.name}</h3>
              <p className="text-neutral-500 text-sm">
                Goal: {profile.dailyCalorieGoal} kcal
              </p>
            </div>
          </GlassCard>
        ))}

        <GlassCard
          hoverEffect
          variants={itemVariants}
          onClick={() => {
            vibrate(10);
            onNewProfile();
          }}
          className="cursor-pointer flex flex-col items-center justify-center py-10 gap-4 border-dashed border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 shadow-inner group-hover:text-neutral-300 transition-colors">
            <Plus size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-400 group-hover:text-neutral-300 transition-colors">Add Profile</h3>
            <p className="text-neutral-600 text-sm">New user?</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
