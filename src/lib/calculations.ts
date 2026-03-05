import { UserProfile } from '@/lib/utils';

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: string
): number {
  // Mifflin-St Jeor Equation
  // Men: 10W + 6.25H - 5A + 5
  // Women: 10W + 6.25H - 5A - 161
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return Math.round(bmr);
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.2));
}

export function getCalorieGoal(tdee: number, weight: number, goalWeight: number, weeklyChangeKg: number = 0.5): number {
  if (weight === goalWeight) return tdee;
  
  // Weight Loss Logic: TDEE - 500 for approx 0.5kg/week
  // If user selected a different rate, we can adjust, but the request specifically mentioned TDEE - 500 for safe loss.
  // However, to respect the "weeklyChangeKg" input which allows 0.25, 0.5, 0.75, 1.0:
  // 0.5kg loss = ~3500 kcal deficit / week = 500 / day.
  // So we can stick to the formula: (weeklyChangeKg * 7700) / 7
  
  const dailyCalorieDiff = (weeklyChangeKg * 7700) / 7;
  
  if (goalWeight < weight) {
     // Weight loss
     let goal = tdee - dailyCalorieDiff;
     // Safety check: Don't go below BMR or 1200 (simple check)
     if (goal < 1200) goal = 1200; 
     return Math.round(goal);
  } else {
     // Weight gain
     return Math.round(tdee + dailyCalorieDiff);
  }
}

export function calculateProteinGoal(weight: number): number {
    // 1.8g per kg of body weight
    return Math.round(weight * 1.8);
}

export function calculateStepCalories(steps: number): number {
    // 1 step = ~0.04 calories
    return Math.round(steps * 0.04);
}

export function calculateTargetDate(weight: number, goalWeight: number, weeklyChangeKg: number): Date {
  if (weeklyChangeKg === 0) return new Date();
  const diff = Math.abs(weight - goalWeight);
  const weeks = diff / weeklyChangeKg;
  const days = weeks * 7;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  return targetDate;
}
