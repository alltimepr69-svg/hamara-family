import { useState, useEffect, useRef } from 'react';
import { UserProfile, DailyData, FoodLog, vibrate } from '@/lib/utils';
import { calculateBMR, calculateTDEE, getCalorieGoal, calculateProteinGoal } from '@/lib/calculations';
import { GlassCard, Button, Input, containerVariants, itemVariants } from './UI';
import { ProgressRing } from './ProgressRing';
import { FoodLogger } from './FoodLogger';
import { Stats } from './Stats';
import { BottomNav } from './BottomNav';
import { Plus, Flame, Footprints, LogOut, Trash2, X, Share2, Download, Scale, Edit2, Check } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isBefore, isAfter, startOfYear, eachMonthOfInterval, startOfWeek, differenceInDays } from 'date-fns';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardProps {
  profile: UserProfile;
  dailyData: DailyData;
  allHistory: DailyData[];
  onUpdateData: (data: DailyData) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onLogout: () => void;
  streak: number;
}

export const Dashboard = ({ profile, dailyData, allHistory, onUpdateData, onUpdateProfile, onLogout, streak }: DashboardProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home' | 'food' | 'calendar' | 'profile' | 'stats'>('home');
  const [stepsInput, setStepsInput] = useState('');

  // Calculate calories burned from steps (1 step = ~0.04 kcal)
  const stepCalories = Math.round(dailyData.steps * 0.04);
  
  // Net Calories = Consumed - Burned
  const netCalories = dailyData.caloriesConsumed - stepCalories;
  
  // Remaining based on Net Calories
  const caloriesRemaining = profile.dailyCalorieGoal - netCalories;
  
  // Progress based on Net Calories (capped at 100 for visual ring if needed, but we usually show raw %)
  const calorieProgress = (netCalories / profile.dailyCalorieGoal) * 100;
  const stepProgress = (dailyData.steps / profile.dailyStepGoal) * 100;

  // Calculate today's macros
  const dailyMacros = dailyData.logs.reduce((acc, log) => {
    if (log.macros) {
      acc.protein += log.macros.protein;
      acc.carbs += log.macros.carbs;
      acc.fat += log.macros.fat;
    }
    return acc;
  }, { protein: 0, carbs: 0, fat: 0 });

  // Protein Progress
  const proteinProgress = profile.dailyProteinGoal ? (dailyMacros.protein / profile.dailyProteinGoal) * 100 : 0;

  // ─── Count-up spring for the center calorie number ──────────────────────────
  const netCalSpring  = useSpring(0, { stiffness: 65, damping: 18 });
  useEffect(() => { netCalSpring.set(netCalories); }, [netCalories]);
  const displayNetCal = useTransform(netCalSpring, v => `${Math.round(v)}`);
  
  // Muscle Shield Logic: Hit protein goal before calorie limit
  const isMuscleShieldActive = dailyMacros.protein >= (profile.dailyProteinGoal || 100) && netCalories <= profile.dailyCalorieGoal;

  // Weekly Average Calculation (excluding today)
  const pastHistory = allHistory.filter(h => h.date !== dailyData.date);
  const last7Days = pastHistory
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);
  
  const weeklyAvgCalories = last7Days.length > 0 
    ? Math.round(last7Days.reduce((sum, day) => sum + day.caloriesConsumed, 0) / last7Days.length) 
    : 0;

  // Check for rewards
  useEffect(() => {
    const calorieGoalMet = Math.abs(netCalories - profile.dailyCalorieGoal) / profile.dailyCalorieGoal <= 0.05;
    const stepGoalMet = dailyData.steps >= profile.dailyStepGoal;

    if ((calorieGoalMet || stepGoalMet) && !dailyData.goalMet) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706'] // Golden colors
      });
      onUpdateData({ ...dailyData, goalMet: true });
    }
  }, [dailyData, profile, onUpdateData, netCalories]);

  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);

  const handleAddFood = (food: FoodLog) => {
    const newData = {
      ...dailyData,
      caloriesConsumed: dailyData.caloriesConsumed + food.calories,
      logs: [food, ...dailyData.logs]
    };
    onUpdateData(newData);
    vibrate(20);
  };

  const removeFood = (id: string, calories: number) => {
    const newData = {
      ...dailyData,
      caloriesConsumed: dailyData.caloriesConsumed - calories,
      logs: dailyData.logs.filter(l => l.id !== id)
    };
    onUpdateData(newData);
    setLogToDelete(null);
  };

  const removeSelectedFoods = () => {
    const logsToRemove = dailyData.logs.filter(l => selectedLogs.includes(l.id));
    const totalCaloriesToRemove = logsToRemove.reduce((sum, log) => sum + log.calories, 0);
    
    const newData = {
      ...dailyData,
      caloriesConsumed: dailyData.caloriesConsumed - totalCaloriesToRemove,
      logs: dailyData.logs.filter(l => !selectedLogs.includes(l.id))
    };
    onUpdateData(newData);
    setSelectedLogs([]);
    setIsSelectionMode(false);
  };

  const toggleSelection = (id: string) => {
    vibrate(5);
    if (selectedLogs.includes(id)) {
      setSelectedLogs(selectedLogs.filter(l => l !== id));
    } else {
      setSelectedLogs([...selectedLogs, id]);
    }
  };

  const updateSteps = () => {
    const steps = Number(stepsInput);
    if (!isNaN(steps)) {
      onUpdateData({ ...dailyData, steps: dailyData.steps + steps });
      setStepsInput('');
    }
  };

  const [showWeightLogger, setShowWeightLogger] = useState(false);
  const [weightLogDate, setWeightLogDate] = useState<string | null>(null);

  // Check for 10-day weight log gap
  useEffect(() => {
    const lastWeightLog = allHistory
      .filter(h => h.weight)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    let lastDate = profile.startDate ? parseISO(profile.startDate) : new Date();
    if (lastWeightLog) {
        lastDate = parseISO(lastWeightLog.date);
    }

    const daysSince = differenceInDays(new Date(), lastDate);
    if (daysSince >= 10 && !showWeightLogger) {
        setWeightLogDate(format(new Date(), 'yyyy-MM-dd'));
        setShowWeightLogger(true);
    }
  }, [allHistory, profile.startDate]);

  const handleWeightSave = (newWeight: number, newGoalWeight?: number) => {
    if (!weightLogDate) return;

    // Update DailyData for that date
    const targetDateData = allHistory.find(h => h.date === weightLogDate) || {
        userId: profile.id,
        date: weightLogDate,
        caloriesConsumed: 0,
        steps: 0,
        logs: [],
        goalMet: false
    };

    onUpdateData({ ...targetDateData, weight: newWeight });

    // Update Profile
    const updatedProfile = { ...profile, weight: newWeight };
    
    // Recalculate BMR/TDEE with new weight
    const bmr = calculateBMR(newWeight, profile.height, profile.age, profile.gender);
    const tdee = calculateTDEE(bmr, profile.activityLevel);

    if (newGoalWeight) {
        updatedProfile.goalWeight = newGoalWeight;
        updatedProfile.dailyCalorieGoal = getCalorieGoal(tdee, newWeight, newGoalWeight);
    } else {
        updatedProfile.dailyCalorieGoal = getCalorieGoal(tdee, newWeight, profile.goalWeight);
    }
    
    // Recalculate Protein Goal (1.8g/kg)
    updatedProfile.dailyProteinGoal = calculateProteinGoal(newWeight);
    
    onUpdateProfile(updatedProfile);
    setShowWeightLogger(false);
    setWeightLogDate(null);
  };

  return (
    <div className={cn("min-h-screen pb-24 max-w-md mx-auto relative", activeTab !== 'food' && "p-4")}>
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pt-4">
              <div className="flex items-center gap-3">
                <div>
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500"
                  >
                    {t('hello')}, {profile.name}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 text-neutral-400 text-sm"
                  >
                    <span>{format(new Date(), 'EEEE, MMMM do')}</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Main Rings */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
              className="flex flex-col items-center mb-8 relative gap-3"
            >
              <div className="relative">
                {/* Ambient glow — subtle warm halo behind the ring cluster */}
                <div className="absolute inset-0 rounded-full bg-amber-500/8 blur-3xl scale-125 pointer-events-none" />

                {/* ── Calorie ring (outermost) ── */}
                <ProgressRing
                  radius={120}
                  stroke={11}
                  progress={calorieProgress}
                  color="stroke-amber-500"
                  hexColor="#f59e0b"
                  delay={0}
                  className="relative z-10"
                />

                {/* ── Center content ── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
                  <Flame
                    className={cn("transition-colors mb-0.5", calorieProgress > 100 ? "text-red-400" : "text-amber-500")}
                    size={20}
                  />
                  <motion.span className="text-[42px] font-bold text-neutral-100 tracking-tight leading-none tabular-nums">
                    {displayNetCal}
                  </motion.span>
                  <span className="text-[10px] text-neutral-500 font-medium leading-none mt-1">kcal left</span>
                  <span className="text-[9px] text-neutral-700 mt-0.5">of {profile.dailyCalorieGoal}</span>
                </div>

                {/* ── Steps ring (middle) — staggered 0.1s ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ProgressRing
                    radius={90}
                    stroke={8}
                    progress={stepProgress}
                    color="stroke-blue-400"
                    hexColor="#60a5fa"
                    delay={0.1}
                  />
                </div>

                {/* ── Protein ring (inner) — staggered 0.2s ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ProgressRing
                    radius={62}
                    stroke={6}
                    progress={proteinProgress}
                    color="stroke-emerald-400"
                    hexColor="#34d399"
                    delay={0.2}
                  />
                </div>
              </div>

              {/* Muscle Shield badge — in flow, not absolute */}
              <AnimatePresence>
                {isMuscleShieldActive && (
                  <motion.div
                    key="muscle-shield"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 leading-tight shadow-lg backdrop-blur-md"
                  >
                    {t('muscleShield')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Ring legend ── */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">{t('calories')}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">{t('steps')}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">{dailyMacros.protein}g protein</span>
                </div>
              </div>

              {streak > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 text-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                >
                  <Flame size={14} fill="currentColor" /> {streak} {t('streak')}
                </motion.div>
              )}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Steps */}
              <GlassCard className="p-4 flex flex-col gap-3 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                    <Footprints size={14} className="text-blue-400" />
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">{t('steps')}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-100 tabular-nums">{dailyData.steps.toLocaleString()}</div>
                  <div className="text-[11px] text-neutral-600 mt-0.5">−{stepCalories} kcal burned</div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Input
                    type="number"
                    placeholder={t('add')}
                    className="py-1.5 px-2 text-sm bg-white/5 border-white/10"
                    value={stepsInput}
                    onChange={(e) => setStepsInput(e.target.value)}
                  />
                  <button
                    onClick={() => { vibrate(10); updateSteps(); }}
                    className="bg-blue-500/15 text-blue-400 border border-blue-500/40 rounded-lg px-3 hover:bg-blue-500 hover:text-white transition-all shrink-0"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </GlassCard>

              {/* Calories Remaining */}
              <GlassCard className="p-4 flex flex-col gap-3 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                    <Flame size={14} className="text-amber-400" />
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">{t('remaining')}</span>
                </div>
                <div>
                  <div className={cn("text-2xl font-bold tabular-nums", caloriesRemaining < 0 ? "text-red-400" : "text-neutral-100")}>
                    {caloriesRemaining}
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-0.5">kcal remaining</div>
                </div>
                <div className="mt-auto pt-2.5 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500">{t('weeklyAvg')}</span>
                  <span className="text-[11px] font-bold text-neutral-300 tabular-nums">{weeklyAvgCalories} kcal</span>
                </div>
              </GlassCard>
            </div>

            {/* Daily Macros Summary */}
            <GlassCard className="p-4 mb-6">
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mb-3">Macros Today</div>
              <div className="grid grid-cols-3 gap-4">
                {/* Protein */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t('protein')}</span>
                  <div className="text-xl font-bold text-emerald-300 tabular-nums">{dailyMacros.protein}g</div>
                  <div className="h-1 rounded-full bg-emerald-500/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyMacros.protein / (profile.dailyProteinGoal || 100)) * 100, 100)}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.3 }}
                    />
                  </div>
                  <div className="text-[9px] text-neutral-600">/ {profile.dailyProteinGoal || 100}g goal</div>
                </div>
                {/* Carbs */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">{t('carbs')}</span>
                  <div className="text-xl font-bold text-amber-300 tabular-nums">{dailyMacros.carbs}g</div>
                  <div className="h-1 rounded-full bg-amber-500/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyMacros.carbs / 300) * 100, 100)}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.4 }}
                    />
                  </div>
                  <div className="text-[9px] text-neutral-600">carbs</div>
                </div>
                {/* Fats */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">{t('fats')}</span>
                  <div className="text-xl font-bold text-rose-300 tabular-nums">{dailyMacros.fat}g</div>
                  <div className="h-1 rounded-full bg-rose-500/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-rose-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyMacros.fat / 80) * 100, 100)}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-[9px] text-neutral-600">dietary fats</div>
                </div>
              </div>
            </GlassCard>

            {/* Today's Log */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-neutral-300">{t('todaysLog')}</h3>
                <div className="flex gap-2">
                  {dailyData.logs.length > 0 && (
                    <Button 
                      onClick={() => {
                        vibrate(10);
                        setIsSelectionMode(!isSelectionMode);
                        setSelectedLogs([]);
                      }} 
                      className={cn(
                        "py-2 px-3 text-sm flex items-center gap-2 transition-colors",
                        isSelectionMode ? "bg-neutral-800 text-white" : "bg-white/5 text-neutral-400"
                      )}
                    >
                      {isSelectionMode ? t('cancel') : t('select')}
                    </Button>
                  )}
                  {!isSelectionMode && (
                    <Button onClick={() => setActiveTab('food')} className="py-2 px-4 text-sm flex items-center gap-2">
                      <Plus size={16} /> {t('add')}
                    </Button>
                  )}
                </div>
              </div>

              {isSelectionMode && selectedLogs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-24 left-4 right-4 z-40"
                >
                  <Button 
                    onClick={() => {
                      vibrate(10);
                      removeSelectedFoods();
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 shadow-lg shadow-red-600/20"
                  >
                    {t('delete')} {selectedLogs.length} Items
                  </Button>
                </motion.div>
              )}

              <motion.div 
                className="space-y-3 pb-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence mode="popLayout">
                  {dailyData.logs.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center py-8 text-neutral-600 italic border border-dashed border-neutral-800 rounded-2xl"
                    >
                      {t('noFoodLogged')}
                    </motion.div>
                  ) : (
                    dailyData.logs.map((log) => (
                      <GlassCard 
                        key={log.id} 
                        layout
                        variants={itemVariants}
                        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                        className={cn(
                          "p-4 flex justify-between items-center group transition-all",
                          isSelectionMode && "cursor-pointer active:scale-[0.98]",
                          selectedLogs.includes(log.id) ? "bg-amber-500/10 border-amber-500/30" : "hover:bg-white/5"
                        )}
                        onClick={() => isSelectionMode && toggleSelection(log.id)}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {isSelectionMode && (
                            <div className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
                              selectedLogs.includes(log.id) 
                                ? "bg-amber-500 border-amber-500" 
                                : "border-neutral-600 bg-white/5"
                            )}>
                              {selectedLogs.includes(log.id) && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-neutral-200 truncate pr-2">{log.name}</div>
                            <div className="text-xs text-neutral-500">{format(log.timestamp, 'h:mm a')}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span className="font-bold text-amber-400 whitespace-nowrap">{log.calories} kcal</span>
                          {!isSelectionMode && (
                            <div className="relative">
                              {logToDelete === log.id ? (
                                <div className="flex items-center gap-1 absolute right-0 -top-1 bg-neutral-900 rounded-full border border-neutral-800 shadow-xl p-1 z-10">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      vibrate(10);
                                      removeFood(log.id, log.calories);
                                    }}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      vibrate(5);
                                      setLogToDelete(null);
                                    }}
                                    className="p-2 bg-neutral-800 text-neutral-300 rounded-full hover:bg-neutral-700 transition-colors"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    vibrate(10);
                                    setLogToDelete(log.id);
                                  }}
                                  className="text-neutral-600 hover:text-red-400 transition-colors p-2 hover:bg-red-400/10 rounded-full active:scale-90"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </GlassCard>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'food' && (
          <motion.div
            key="food"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <FoodLogger onAddFood={handleAddFood} isEmbedded />
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CalendarView 
              history={allHistory} 
              startDate={profile.startDate}
              profileName={profile.name}
              onDateClick={(date) => {
                setWeightLogDate(format(date, 'yyyy-MM-dd'));
                setShowWeightLogger(true);
              }}
            />
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Stats history={allHistory} profile={profile} />
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileView profile={profile} onLogout={onLogout} onUpdateProfile={onUpdateProfile} />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <AnimatePresence>
        {showWeightLogger && weightLogDate && (
          <WeightLoggerModal
            currentWeight={
              allHistory.find(h => h.date === weightLogDate)?.weight || profile.weight
            }
            goalWeight={profile.goalWeight}
            profile={profile}
            onSave={handleWeightSave}
            onClose={() => {
              const lastWeightLog = allHistory.filter(h => h.weight).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              let lastDate = profile.startDate ? parseISO(profile.startDate) : new Date();
              if (lastWeightLog) lastDate = parseISO(lastWeightLog.date);
              const daysSince = differenceInDays(new Date(), lastDate);
              
              if (daysSince < 10) {
                setShowWeightLogger(false);
                setWeightLogDate(null);
              }
            }}
            date={weightLogDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted Profile View
const ProfileView = ({ profile, onLogout, onUpdateProfile }: { profile: UserProfile, onLogout: () => void, onUpdateProfile: (profile: UserProfile) => void }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editGoals, setEditGoals] = useState({
    dailyCalorieGoal: profile.dailyCalorieGoal,
    dailyStepGoal: profile.dailyStepGoal,
    dailyProteinGoal: profile.dailyProteinGoal || 0
  });

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      dailyCalorieGoal: Number(editGoals.dailyCalorieGoal),
      dailyStepGoal: Number(editGoals.dailyStepGoal),
      dailyProteinGoal: Number(editGoals.dailyProteinGoal)
    });
    setIsEditing(false);
    vibrate(20);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-amber-500/20">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-100">{profile.name}</h2>
            <div className="text-neutral-400 text-sm">{t('memberSince')} {format(parseISO(profile.startDate), 'MMMM yyyy')}</div>
          </div>
        </div>
        <button 
          onClick={() => {
            vibrate(10);
            onLogout();
          }}
          className="text-neutral-400 hover:text-red-400 p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Language Settings */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-neutral-200 font-medium">
             <span className="text-xl">🌐</span> {t('language')}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setLanguage('kn');
              vibrate(10);
            }}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-colors border",
              language === 'kn' 
                ? "bg-amber-500 text-black border-amber-500" 
                : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10"
            )}
          >
            ಕನ್ನಡ
          </button>
          <button
            onClick={() => {
              setLanguage('en');
              vibrate(10);
            }}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-colors border",
              language === 'en' 
                ? "bg-amber-500 text-black border-amber-500" 
                : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10"
            )}
          >
            English
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-4 flex flex-col items-center gap-1">
          <div className="text-neutral-400 text-xs uppercase tracking-wider">{t('weight')}</div>
          <div className="text-xl font-bold text-white">{profile.weight} kg</div>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center gap-1">
          <div className="text-neutral-400 text-xs uppercase tracking-wider">{t('height')}</div>
          <div className="text-xl font-bold text-white">{profile.height} cm</div>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center gap-1">
          <div className="text-neutral-400 text-xs uppercase tracking-wider">{t('age')}</div>
          <div className="text-xl font-bold text-white">{profile.age}</div>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center gap-1">
          <div className="text-neutral-400 text-xs uppercase tracking-wider">{t('goalWeight')}</div>
          <div className="text-xl font-bold text-amber-400">{profile.goalWeight} kg</div>
        </GlassCard>
      </div>

      <div className="mb-6">
        {isEditing ? (
            <div className="flex gap-3">
                <Button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                >
                    {t('cancel')}
                </Button>
                <Button 
                    onClick={handleSave}
                    className="flex-1 bg-amber-500 text-white hover:bg-amber-600"
                >
                    <Check size={18} className="mr-2" /> {t('save')}
                </Button>
            </div>
        ) : (
            <Button 
                onClick={() => {
                    setEditGoals({
                        dailyCalorieGoal: profile.dailyCalorieGoal,
                        dailyStepGoal: profile.dailyStepGoal,
                        dailyProteinGoal: profile.dailyProteinGoal || 0
                    });
                    setIsEditing(true);
                    vibrate(10);
                }}
                className="w-full bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
            >
                <Edit2 size={18} className="mr-2" /> {t('editGoals')}
            </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
             <h3 className="text-lg font-bold text-neutral-300">{t('dailyGoals')}</h3>
             {isEditing && <span className="text-xs text-amber-400 animate-pulse">{t('edit')}...</span>}
        </div>
        
        <GlassCard className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Flame size={20} />
            </div>
            <div>
              <div className="font-bold text-neutral-200">{t('dailyCalorieGoal')}</div>
              <div className="text-xs text-neutral-500">{t('dailyTarget')}</div>
            </div>
          </div>
          {isEditing ? (
            <Input 
                type="number" 
                value={editGoals.dailyCalorieGoal} 
                onChange={(e) => setEditGoals({...editGoals, dailyCalorieGoal: Number(e.target.value)})}
                className="w-24 text-right font-bold text-xl text-white bg-white/5 border-white/10"
            />
          ) : (
            <div className="font-bold text-xl text-white">{profile.dailyCalorieGoal}</div>
          )}
        </GlassCard>

        <GlassCard className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Footprints size={20} />
            </div>
            <div>
              <div className="font-bold text-neutral-200">{t('dailyStepGoal')}</div>
              <div className="text-xs text-neutral-500">{t('dailyTarget')}</div>
            </div>
          </div>
          {isEditing ? (
             <Input 
                type="number" 
                value={editGoals.dailyStepGoal} 
                onChange={(e) => setEditGoals({...editGoals, dailyStepGoal: Number(e.target.value)})}
                className="w-24 text-right font-bold text-xl text-white bg-white/5 border-white/10"
            />
          ) : (
            <div className="font-bold text-xl text-white">{profile.dailyStepGoal}</div>
          )}
        </GlassCard>

        <GlassCard className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold">P</div>
            </div>
            <div>
              <div className="font-bold text-neutral-200">{t('protein')}</div>
              <div className="text-xs text-neutral-500">{t('dailyTarget')}</div>
            </div>
          </div>
          {isEditing ? (
             <Input 
                type="number" 
                value={editGoals.dailyProteinGoal} 
                onChange={(e) => setEditGoals({...editGoals, dailyProteinGoal: Number(e.target.value)})}
                className="w-24 text-right font-bold text-xl text-white bg-white/5 border-white/10"
            />
          ) : (
            <div className="font-bold text-xl text-white">{profile.dailyProteinGoal}</div>
          )}
        </GlassCard>
      </div>


    </div>
  );
};

// Renamed CalendarModal to CalendarView and adapted
const CalendarView = ({ history, startDate, profileName, onDateClick }: { history: DailyData[], startDate: string, profileName: string, onDateClick: (date: Date) => void }) => {
  const { t, language } = useLanguage();
  const today = new Date();
  const start = startDate ? parseISO(startDate) : startOfYear(today);
  const shareRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  
  const months = eachMonthOfInterval({
    start: startOfYear(today),
    end: endOfMonth(today)
  });

  const getDataForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return history.find(h => h.date === dateStr);
  };

  const handleShare = async () => {
    if (!shareRef.current) return;
    setIsSharing(true);

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#000000',
        scale: 2,
      });

      const image = canvas.toDataURL('image/png');
      
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], 'vibefit-progress.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: t('shareTitle'),
            text: t('shareText'),
            files: [file],
          });
        } else {
          const link = document.createElement('a');
          link.href = image;
          link.download = 'fithona-progress.png';
          link.click();
        }
      } else {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'fithona-progress.png';
        link.click();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: today });
  
  const weekStats = weekDays.map(day => {
    const data = getDataForDay(day);
    return {
      day: format(day, 'EEE'),
      met: data?.goalMet || false,
      calories: data?.caloriesConsumed || 0
    };
  });

  const weekGoalMetCount = weekStats.filter(s => s.met).length;

  return (
    <div className="flex flex-col h-full pt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-neutral-100">{t('yourJourney')}</h3>
        <button 
          onClick={() => {
            vibrate(10);
            handleShare();
          }}
          disabled={isSharing}
          className="text-amber-400 hover:text-amber-300 p-2 bg-amber-500/10 rounded-full transition-colors disabled:opacity-50"
        >
          {isSharing ? <Download size={20} className="animate-bounce" /> : <Share2 size={20} />}
        </button>
      </div>
      
      <div className="space-y-6 pb-4">
        {/* Shareable Card */}
        <div ref={shareRef} className="bg-black p-4 rounded-2xl border border-neutral-800 shadow-xl">
            <div className="flex justify-between items-end mb-4 border-b border-neutral-800 pb-4">
              <div>
                <h4 className="text-amber-400 font-bold text-lg">{t('appName')} Report</h4>
                <p className="text-neutral-400 text-xs">@{profileName} • {format(currentWeekStart, 'MMM d')} - {format(today, 'MMM d')}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{weekGoalMetCount}/{weekDays.length}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">{t('goalsMet')}</div>
              </div>
            </div>

            <div className="flex justify-between items-end gap-2 h-32 mb-2">
              {weekStats.map((stat, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                  <div className="relative w-full flex justify-center h-full items-end">
                      <div 
                      className={cn(
                        "w-full max-w-[20px] rounded-t-md transition-all",
                        stat.met ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" : "bg-neutral-800"
                      )}
                      style={{ height: `${Math.min((stat.calories / 3000) * 100, 100)}%`, minHeight: '4px' }}
                      />
                  </div>
                  <span className={cn("text-[10px] font-medium", stat.met ? "text-amber-400" : "text-neutral-500")}>
                    {stat.day}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-[10px] text-neutral-600 font-mono">
              {t('generatedBy')} {t('appName')}
            </div>
        </div>

        {months.reverse().map((month, mIdx) => {
          const days = eachDayOfInterval({
            start: startOfMonth(month),
            end: endOfMonth(month)
          });

          return (
            <div key={mIdx} className="space-y-2">
              <h4 className="text-sm font-bold text-neutral-400 sticky top-0 bg-black/95 py-2 z-10">{format(month, 'MMMM yyyy')}</h4>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S','M','T','W','T','F','S'].map(d => (
                  <div key={d} className="text-[10px] font-bold text-neutral-600 mb-1">{d}</div>
                ))}
                
                {Array.from({ length: days[0].getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {days.map((day, dIdx) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const data = getDataForDay(day);
                  const isToday = isSameDay(day, today);
                  const isStart = startDate ? isSameDay(day, parseISO(startDate)) : false;
                  const isBeforeStart = startDate ? isBefore(day, parseISO(startDate)) : false;
                  const isFuture = isAfter(day, today);
                  
                  let bgClass = "bg-white/5 text-neutral-500";
                  let borderClass = "border-transparent";
                  let content = format(day, 'd');
                  let showX = false;

                  if (isBeforeStart || isFuture) {
                    bgClass = "opacity-30 cursor-not-allowed";
                  } else {
                    if (isStart) {
                      borderClass = "border-blue-500 ring-1 ring-blue-500/50";
                      bgClass = "bg-blue-500/20 text-blue-200";
                    }
                    
                    if (data) {
                      if (data.goalMet) {
                        bgClass = "bg-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]";
                      } else {
                        bgClass = "bg-red-500/20 text-red-300 border border-red-500/30";
                      }
                    } else if (!isToday && !isFuture && !isBeforeStart) {
                      showX = true;
                      bgClass = "bg-neutral-800 text-neutral-600";
                    }
                  }

                  if (isToday) {
                    borderClass = "border-white ring-1 ring-white/50";
                  }

                  return (
                    <div key={dIdx} className="aspect-square flex flex-col items-center justify-center relative">
                      <div 
                        onClick={() => {
                          if (!isFuture && !isBeforeStart) {
                            vibrate(10);
                            onDateClick(day);
                          }
                        }}
                        className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all border cursor-pointer active:scale-90",
                        bgClass,
                        borderClass
                      )}>
                        {content}
                      </div>
                      {showX && (
                        <div className="absolute -bottom-1 text-[10px] text-red-500 font-bold">x</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-white/10 bg-white/5 text-xs text-neutral-400 flex justify-around rounded-xl">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> {t('goalsMet')}</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div> {t('missed')}</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500"></div> {t('start')}</div>
      </div>
    </div>
  );
};

const WeightLoggerModal = ({ 
  currentWeight, 
  goalWeight, 
  profile, 
  onSave, 
  onClose,
  date
}: { 
  currentWeight: number, 
  goalWeight: number, 
  profile: UserProfile, 
  onSave: (weight: number, newGoalWeight?: number) => void, 
  onClose: () => void,
  date: string
}) => {
  const { t } = useLanguage();
  const [weight, setWeight] = useState(currentWeight);
  const [newGoal, setNewGoal] = useState(goalWeight);
  const [showNewGoal, setShowNewGoal] = useState(false);

  // Calculate TDEE based on input weight
  const bmr = calculateBMR(weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  useEffect(() => {
    // Check if goal reached
    const isWeightLoss = profile.goalWeight < profile.weight;
    if (isWeightLoss) {
       if (weight <= profile.goalWeight) setShowNewGoal(true);
       else setShowNewGoal(false);
    } else { // Weight gain
       if (weight >= profile.goalWeight) setShowNewGoal(true);
       else setShowNewGoal(false);
    }
  }, [weight, profile]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <GlassCard className="w-full max-w-sm p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
            <Scale className="text-amber-400" /> {t('logWeight')}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="text-center text-sm text-neutral-400">
          {t('forDate')} {format(parseISO(date), 'MMMM do, yyyy')}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-400 mb-1 block">{t('currentWeight')} (kg)</label>
            <Input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="text-center text-2xl font-bold"
              autoFocus
            />
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
            <div className="text-neutral-400 text-xs uppercase tracking-wider mb-1">{t('maintenanceCalories')}</div>
            <div className="text-2xl font-bold text-amber-400">{tdee} kcal</div>
            <div className="text-xs text-neutral-500 mt-1">{t('basedOn')} {weight}kg</div>
          </div>

          {showNewGoal && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 pt-2 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold justify-center">
                <Flame size={16} /> {t('goalReached')}
              </div>
              <label className="text-sm font-medium text-neutral-400 mb-1 block">{t('setNewGoalWeight')} (kg)</label>
              <Input 
                type="number" 
                value={newGoal} 
                onChange={(e) => setNewGoal(Number(e.target.value))}
                className="text-center text-xl font-bold border-amber-500/50 focus:border-amber-500"
              />
            </motion.div>
          )}

          <Button 
            onClick={() => {
              vibrate(10);
              onSave(weight, showNewGoal ? newGoal : undefined);
            }}
            className="w-full mt-4"
          >
            {t('saveProgress')}
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};
