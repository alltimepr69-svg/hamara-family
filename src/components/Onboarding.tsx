import React, { useState } from 'react';
import { UserProfile, cn, vibrate } from '@/lib/utils';
import { calculateBMR, calculateTDEE, getCalorieGoal, calculateTargetDate, calculateProteinGoal } from '@/lib/calculations';
import { GlassCard, Button, Input, Select } from './UI';
import { motion } from 'motion/react';
import { ArrowRight, Activity, User, Ruler, Weight, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile> & { weeklyChangeKg?: number }>({
    gender: 'male',
    activityLevel: 'moderate',
    dailyStepGoal: 10000,
    weeklyChangeKg: 0.5,
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.weight || !formData.height || !formData.goalWeight || !formData.gender || !formData.activityLevel) return;

    const bmr = calculateBMR(Number(formData.weight), Number(formData.height), Number(formData.age), formData.gender);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    const calorieGoal = getCalorieGoal(tdee, Number(formData.weight), Number(formData.goalWeight), formData.weeklyChangeKg);
    const proteinGoal = calculateProteinGoal(Number(formData.weight));

    const newProfile: UserProfile = {
      id: crypto.randomUUID(),
      name: formData.name,
      gender: formData.gender,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      goalWeight: Number(formData.goalWeight),
      activityLevel: formData.activityLevel,
      dailyCalorieGoal: calorieGoal,
      dailyStepGoal: Number(formData.dailyStepGoal) || 10000,
      dailyProteinGoal: proteinGoal,
      startDate: format(new Date(), 'yyyy-MM-dd'),
    };

    onComplete(newProfile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRateChange = (rate: number) => {
    setFormData(prev => ({ ...prev, weeklyChangeKg: rate }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
            {t('appName')}
          </h1>
          <p className="text-neutral-400">{t('letsGetToKnow')}</p>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <User size={16} /> {t('name')}
                </label>
                <Input name="name" placeholder={t('name')} value={formData.name || ''} onChange={handleChange} autoFocus />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <User size={16} /> {t('gender')}
                </label>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="other">{t('other')}</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Activity size={16} /> {t('age')}
                </label>
                <Input name="age" type="number" placeholder={t('age')} value={formData.age || ''} onChange={handleChange} />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Ruler size={16} /> {t('height')}
                </label>
                <Input name="height" type="number" placeholder="cm" value={formData.height || ''} onChange={handleChange} autoFocus />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Weight size={16} /> {t('currentWeight')}
                </label>
                <Input name="weight" type="number" placeholder="kg" value={formData.weight || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Weight size={16} /> {t('goalWeight')}
                </label>
                <Input name="goalWeight" type="number" placeholder="kg" value={formData.goalWeight || ''} onChange={handleChange} />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Activity size={16} /> {t('activityLevel')}
                </label>
                <Select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                  <option value="sedentary">{t('sedentary')}</option>
                  <option value="light">{t('light')}</option>
                  <option value="moderate">{t('moderate')}</option>
                  <option value="active">{t('active')}</option>
                  <option value="very_active">{t('veryActive')}</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                  <Activity size={16} /> {t('dailyStepGoal')}
                </label>
                <Input name="dailyStepGoal" type="number" placeholder="10000" value={formData.dailyStepGoal || ''} onChange={handleChange} />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-200">{t('setPace')}</h3>
                <p className="text-sm text-neutral-400">{t('paceSubtitle')}</p>
              </div>

              {Number(formData.weight) === Number(formData.goalWeight) ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                  <p className="text-emerald-400 font-medium">{t('maintenance')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[0.25, 0.5, 0.75, 1.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleRateChange(rate)}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group",
                        formData.weeklyChangeKg === rate
                          ? "bg-amber-500/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      )}
                    >
                      <div>
                        <div className={cn("font-medium", formData.weeklyChangeKg === rate ? "text-amber-400" : "text-neutral-300")}>
                          {rate} kg / week
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {rate === 0.25 && t('slowSteady')}
                          {rate === 0.5 && t('recommended')}
                          {rate === 0.75 && t('aggressive')}
                          {rate === 1.0 && t('veryAggressive')}
                        </div>
                      </div>
                      {formData.weeklyChangeKg === rate && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 5 && (
             <motion.div
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: -20, opacity: 0 }}
             className="space-y-6 text-center"
           >
             <h3 className="text-xl font-semibold text-neutral-200">{t('personalPlan')}</h3>
             
             {(() => {
                const bmr = calculateBMR(Number(formData.weight), Number(formData.height), Number(formData.age), formData.gender as string);
                const tdee = calculateTDEE(bmr, formData.activityLevel as string);
                const calorieGoal = getCalorieGoal(tdee, Number(formData.weight), Number(formData.goalWeight), formData.weeklyChangeKg);
                const targetDate = calculateTargetDate(Number(formData.weight), Number(formData.goalWeight), formData.weeklyChangeKg || 0.5);

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                        <div className="text-xs text-neutral-400 mb-1">BMR</div>
                        <div className="text-xl font-bold text-neutral-200">{bmr}</div>
                        <div className="text-[10px] text-neutral-500 mt-1 leading-tight">
                          {t('caloriesBurnedRest')}
                        </div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                        <div className="text-xs text-neutral-400 mb-1">TDEE</div>
                        <div className="text-xl font-bold text-neutral-200">{tdee}</div>
                        <div className="text-[10px] text-neutral-500 mt-1 leading-tight">
                          {t('totalEnergy')}
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={64} className="text-amber-500" />
                      </div>
                      <div className="text-sm font-medium text-amber-500 mb-2">{t('dailyCalorieGoal')}</div>
                      <div className="text-5xl font-bold text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        {calorieGoal} <span className="text-lg text-neutral-500 font-normal">kcal</span>
                      </div>
                    </div>

                    {Number(formData.weight) !== Number(formData.goalWeight) && (
                      <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 flex items-center gap-4 text-left">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400">{t('estimatedDate')}</div>
                          <div className="text-lg font-bold text-emerald-400">
                            {format(targetDate, 'MMMM d, yyyy')}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {t('reaching')} {formData.goalWeight}kg
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
             })()}
             
           </motion.div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                onClick={() => {
                  vibrate(10);
                  setStep(step - 1);
                }}
                className="text-neutral-500 hover:text-neutral-300 px-4 py-2 transition-colors"
              >
                {t('back')}
              </button>
            )}
            <Button onClick={handleNext} className={cn("ml-auto flex items-center gap-2", step === 1 && "w-full justify-center")}>
              {step === 5 ? t('startTracking') : t('next')} <ArrowRight size={18} />
            </Button>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === step ? "w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "w-2 bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
