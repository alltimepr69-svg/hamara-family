import { useMemo } from 'react';
import { DailyData, UserProfile } from '@/lib/utils';
import { GlassCard } from './UI';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, subDays } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
  ComposedChart
} from 'recharts';

interface StatsProps {
  history: DailyData[];
  profile: UserProfile;
}

export const Stats = ({ history, profile }: StatsProps) => {
  const { t } = useLanguage();
  // Process data for charts
  const chartData = useMemo(() => {
    // Get last 30 days or all history if less
    const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // If no history, return empty
    if (sortedHistory.length === 0) return [];

    // Fill in missing days for the last 14 days for a continuous graph
    const endDate = new Date();
    const startDate = subDays(endDate, 13); // Last 14 days
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayData = sortedHistory.find(h => h.date === dateStr);
      
      // Calculate daily macros
      let protein = 0;
      let carbs = 0;
      let fat = 0;

      if (dayData && dayData.logs) {
        dayData.logs.forEach(log => {
          if (log.macros) {
            protein += log.macros.protein;
            carbs += log.macros.carbs;
            fat += log.macros.fat;
          }
        });
      }

      return {
        date: format(day, 'MMM d'),
        fullDate: dateStr,
        weight: dayData?.weight || null, // Use null to break line if no weight
        calories: dayData?.caloriesConsumed || 0,
        goal: profile.dailyCalorieGoal,
        protein,
        carbs,
        fat,
        steps: dayData?.steps || 0,
        stepGoal: profile.dailyStepGoal
      };
    });
  }, [history, profile]);

  // Filter out days with no weight for the weight chart to avoid gaps if we want connected lines, 
  // but Recharts handles nulls by breaking the line which is often better. 
  // However, for weight, we might want to connect points. Let's stick to raw data first.
  // Actually, let's filter for weight chart specifically to connect dots if desired, 
  // or just pass the data and let Recharts handle it. 
  // Recharts `connectNulls` prop on Line can connect them.

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900/90 border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md">
          <p className="text-neutral-300 text-xs mb-2 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs mb-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-neutral-400 capitalize">{entry.name}:</span>
              <span className="font-bold text-neutral-200">
                {entry.value} {entry.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center pt-4 px-2">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
          {t('yourStats')}
        </h2>
      </div>

      {/* Weight Chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">{t('weightTrend')}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="weight" 
                name={t('weight')} 
                unit="kg"
                stroke="#fbbf24" 
                strokeWidth={3} 
                dot={{ fill: '#fbbf24', r: 4, strokeWidth: 0 }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Calories Chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">{t('caloriesVsGoal')}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="calories" 
                name={t('calories')} 
                unit="kcal"
                stroke="#f59e0b" 
                fillOpacity={1} 
                fill="url(#colorCalories)" 
              />
              <Line 
                type="step" 
                dataKey="goal" 
                name={t('goal')} 
                unit="kcal"
                stroke="#525252" 
                strokeDasharray="5 5" 
                dot={false}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Macros Chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">{t('macronutrients')}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                stroke="#525252" 
                tick={{ fill: '#525252', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#a3a3a3' }}
              />
              <Bar dataKey="protein" name={t('protein')} unit="g" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
              <Bar dataKey="carbs" name={t('carbs')} unit="g" stackId="a" fill="#fbbf24" />
              <Bar dataKey="fat" name={t('fats')} unit="g" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Steps Chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">{t('stepsActivity')}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#525252"
                tick={{ fill: '#525252', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis
                stroke="#525252"
                tick={{ fill: '#525252', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="steps"
                name={t('steps')}
                unit=""
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="stepGoal"
                name={t('goal')}
                unit=""
                stroke="#525252"
                strokeDasharray="3 3"
                dot={false}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
