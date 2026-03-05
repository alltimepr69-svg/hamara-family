import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FoodItem {
  name: string;
  nameKn?: string;
  brand?: string;
  calories: number;
  unit: string;
  category: string;
  tags: string[];
  color?: string;
  macros?: {
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
}

export const FOOD_DATABASE: FoodItem[] = [
  // --- SUPER FOODS (The Gold Standard) ---
  { name: "Whole Eggs (2 nos)", nameKn: "ಮೊಟ್ಟೆ (2)", brand: "Fresh", category: "Super Food", calories: 176, unit: "serving", tags: ["High Protein", "Super Food", "Good Fats"], color: "emerald", macros: { protein: 13, carbs: 1, fat: 11 } },
  { name: "Chicken Breast (Grilled)", nameKn: "ಚಿಕನ್ ಬ್ರೆಸ್ಟ್ (ಗ್ರಿಲ್ಡ್)", brand: "Home", category: "Super Food", calories: 182, unit: "100g", tags: ["High Protein", "Super Food", "Lean Meat"], color: "emerald", macros: { protein: 31, carbs: 0, fat: 4 } },
  { name: "Mixed Vegetables (Steamed)", nameKn: "ಮಿಶ್ರ ತರಕಾರಿಗಳು", brand: "Home", category: "Super Food", calories: 65, unit: "cup", tags: ["Super Food", "Vitamins", "Fiber"], color: "emerald", macros: { protein: 3, carbs: 12, fat: 0.5 } },
  { name: "Paneer (Raw/Low Fat)", nameKn: "ಪನೀರ್", brand: "Fresh", category: "Super Food", calories: 290, unit: "100g", tags: ["High Protein", "Super Food"], color: "emerald", macros: { protein: 19, carbs: 3, fat: 22 } },
  { name: "Dal (Boiled/Home)", nameKn: "ಬೇಳೆ ಸಾರು", brand: "Home", category: "Super Food", calories: 155, unit: "cup", tags: ["High Protein", "Super Food"], color: "emerald", macros: { protein: 9, carbs: 22, fat: 3 } },

  // --- INDIAN BREAKFAST ---
  { name: "Idli (2 nos)", nameKn: "ಇಡ್ಲಿ (2)", brand: "Home", category: "Breakfast", calories: 145, unit: "serving", tags: ["Healthy", "Fermented"], color: "emerald", macros: { protein: 4, carbs: 30, fat: 0.5 } },
  { name: "Masala Dosa", nameKn: "ಮಸಾಲ ದೋಸೆ", brand: "Restaurant", category: "Breakfast", calories: 415, unit: "piece", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 6, carbs: 60, fat: 16 } },
  { name: "Poha", nameKn: "ಅವಲಕ್ಕಿ", brand: "Home", category: "Breakfast", calories: 275, unit: "bowl", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 4, carbs: 45, fat: 8 } },
  { name: "Aloo Paratha", nameKn: "ಆಲೂ ಪರಾಠ", brand: "Home", category: "Breakfast", calories: 320, unit: "piece", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 5, carbs: 48, fat: 14 } },
  { name: "Upma", nameKn: "ಉಪ್ಪಿಟ್ಟು", brand: "Home", category: "Breakfast", calories: 210, unit: "bowl", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 4, carbs: 35, fat: 6 } },

  // --- NORTH KARNATAKA SPECIALS ---
  { name: "Jowar Roti (Jolada Rotti)", nameKn: "ಜೋಳದ ರೊಟ್ಟಿ", brand: "Home", category: "Breakfast/Meals", calories: 125, unit: "piece", tags: ["Super Food", "Fiber Rich", "Carbs Rich"], color: "emerald", macros: { protein: 4, carbs: 26, fat: 1.5 } },
  { name: "Enne Gai (Brinjal Curry)", nameKn: "ಎಣ್ಣೆಗಾಯಿ", brand: "Home", category: "Main Course", calories: 210, unit: "cup", tags: ["Avoid", "High Fat", "Bad Fats"], color: "red", macros: { protein: 3, carbs: 12, fat: 18 } },
  { name: "Shenga Chatni (Peanut)", nameKn: "ಶೇಂಗಾ ಚಟ್ನಿ", brand: "Home", category: "Sides", calories: 95, unit: "tbsp", tags: ["High Protein", "Good Fats"], color: "yellow", macros: { protein: 4, carbs: 3, fat: 8 } },

  // --- KARNATAKA & SOUTH STAPLES ---
  { name: "Bisi Bele Bath", nameKn: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್", brand: "Home", category: "Meals", calories: 340, unit: "bowl", tags: ["Carbs Rich", "High Protein"], color: "yellow", macros: { protein: 8, carbs: 55, fat: 12 } },
  { name: "Ragi Mudde", nameKn: "ರಾಗಿ ಮುದ್ದೆ", brand: "Home", category: "Super Food", calories: 220, unit: "ball", tags: ["Super Food", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 5, carbs: 45, fat: 1 } },
  { name: "Vada (Medu Vada)", nameKn: "ಉದ್ದಿನ ವಡೆ", brand: "Street/Home", category: "Breakfast", calories: 115, unit: "piece", tags: ["Avoid", "Bad Fats"], color: "red", macros: { protein: 3, carbs: 9, fat: 8 } },
  { name: "Sambar", nameKn: "ಸಾಂಬಾರ್", brand: "Home", category: "Sides", calories: 145, unit: "cup", tags: ["Healthy", "High Protein"], color: "emerald", macros: { protein: 7, carbs: 22, fat: 4 } },
  { name: "Set Dosa (3 pcs)", nameKn: "ಸೆಟ್ ದೋಸೆ", brand: "Restaurant", category: "Breakfast", calories: 490, unit: "plate", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 10, carbs: 85, fat: 14 } },
  { name: "Chow Chow Bath", nameKn: "ಚೌ ಚೌ ಬಾತ್", brand: "Restaurant", category: "Breakfast", calories: 520, unit: "plate", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 9, carbs: 75, fat: 22 } },
  { name: "Neer Dosa", nameKn: "ನೀರ್ ದೋಸೆ", brand: "Home", category: "Breakfast", calories: 85, unit: "piece", tags: ["Light Snack", "Healthy"], color: "emerald", macros: { protein: 1.5, carbs: 18, fat: 1 } },

  // --- NORTH INDIAN BREAKFAST & BREADS ---
  { name: "Chole Bhature (2 pcs)", brand: "Street/Restaurant", category: "Breakfast", calories: 580, unit: "plate", tags: ["Avoid", "High Fat", "Bad Fats"], color: "red", macros: { protein: 14, carbs: 75, fat: 34 } },
  { name: "Kulcha (Amritsari)", brand: "Restaurant", category: "Breakfast", calories: 310, unit: "piece", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 7, carbs: 52, fat: 12 } },
  { name: "Stuffed Paratha (Gobi/Paneer)", brand: "Home", category: "Breakfast", calories: 330, unit: "piece", tags: ["Carbs Rich", "High Protein"], color: "yellow", macros: { protein: 9, carbs: 45, fat: 15 } },
  { name: "Missi Roti", brand: "Home", category: "Breads", calories: 165, unit: "piece", tags: ["Super Food", "High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 8, carbs: 28, fat: 4 } },

  // --- NORTH INDIAN GRAVIES ---
  { name: "Dal Makhani", brand: "Restaurant", category: "Main Course", calories: 385, unit: "bowl", tags: ["Avoid", "High Fat", "Bad Fats"], color: "red", macros: { protein: 12, carbs: 35, fat: 26 } },
  { name: "Palak Paneer", brand: "Home", category: "Main Course", calories: 245, unit: "bowl", tags: ["Super Food", "High Protein", "Iron Rich"], color: "emerald", macros: { protein: 14, carbs: 9, fat: 18 } },
  { name: "Rajma Chawal", brand: "Home", category: "Main Course", calories: 460, unit: "plate", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 18, carbs: 78, fat: 12 } },
  { name: "Kadai Paneer", brand: "Restaurant", category: "Main Course", calories: 390, unit: "bowl", tags: ["Avoid", "High Fat"], color: "red", macros: { protein: 16, carbs: 14, fat: 32 } },

  // --- NON-VEG (NO BEEF) ---
  { name: "Butter Chicken", brand: "Restaurant", category: "Non-Veg", calories: 490, unit: "bowl", tags: ["High Protein", "Avoid", "High Fat"], color: "red", macros: { protein: 28, carbs: 12, fat: 38 } },
  { name: "Chicken Biryani", brand: "Restaurant", category: "Non-Veg", calories: 540, unit: "plate", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 24, carbs: 65, fat: 22 } },
  { name: "Mutton Keema", brand: "Home", category: "Non-Veg", calories: 345, unit: "cup", tags: ["High Protein"], color: "yellow", macros: { protein: 26, carbs: 4, fat: 24 } },
  { name: "Egg Bhurji (2 Eggs)", brand: "Home", category: "Non-Veg", calories: 235, unit: "plate", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 14, carbs: 4, fat: 18 } },
  { name: "Tandoori Chicken", brand: "Restaurant", category: "Non-Veg", calories: 210, unit: "leg piece", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 28, carbs: 2, fat: 9 } },
  { name: "Fish Fry", brand: "Restaurant", category: "Non-Veg", calories: 260, unit: "piece", tags: ["Avoid", "High Fat"], color: "red", macros: { protein: 18, carbs: 10, fat: 18 } },
  { name: "Chicken Sukka (Mangalorean)", brand: "Restaurant", category: "Non-Veg", calories: 310, unit: "bowl", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 26, carbs: 6, fat: 20 } },
  { name: "Fish Curry (Coconut based)", brand: "Home", category: "Non-Veg", calories: 225, unit: "bowl", tags: ["Good Fats", "Protein Rich"], color: "emerald", macros: { protein: 20, carbs: 8, fat: 14 } },
  { name: "Andhra Chilli Chicken", brand: "Restaurant", category: "Non-Veg", calories: 380, unit: "plate", tags: ["Avoid", "High Fat", "High Protein"], color: "red", macros: { protein: 30, carbs: 12, fat: 24 } },
  { name: "Mutton Rogan Josh", brand: "Restaurant", category: "Non-Veg", calories: 430, unit: "bowl", tags: ["Avoid", "High Fat", "High Protein"], color: "red", macros: { protein: 32, carbs: 8, fat: 34 } },
  { name: "Chicken Tikka (6 pcs)", brand: "Restaurant", category: "Non-Veg", calories: 320, unit: "plate", tags: ["Super Food", "High Protein", "Lean Meat"], color: "emerald", macros: { protein: 42, carbs: 4, fat: 14 } },

  // --- BAKERY & BISCUITS ---
  { name: "Parle-G", brand: "Parle", category: "Bakery Items", calories: 30, unit: "biscuit", tags: ["Heavily Processed"], color: "yellow", macros: { protein: 0.5, carbs: 5, fat: 1 } },
  { name: "Good Day Cashew", brand: "Britannia", category: "Bakery Items", calories: 48, unit: "biscuit", tags: ["Heavily Processed", "Avoid"], color: "red", macros: { protein: 0.6, carbs: 6, fat: 2.5 } },
  { name: "Marie Gold", brand: "Britannia", category: "Bakery Items", calories: 25, unit: "biscuit", tags: ["Light Snack"], color: "green", macros: { protein: 0.5, carbs: 5, fat: 0.5 } },
  { name: "Veg Puff", brand: "Local", category: "Bakery Items", calories: 242, unit: "piece", tags: ["Avoid", "Bad Fats", "Heavily Processed"], color: "red", macros: { protein: 4, carbs: 28, fat: 14 } },
  { name: "Cream Roll", brand: "Local", category: "Bakery Items", calories: 210, unit: "piece", tags: ["Avoid", "Synthetic food"], color: "red", macros: { protein: 2, carbs: 25, fat: 12 } },
  { name: "Khari Biscuit", brand: "Local", category: "Bakery Items", calories: 60, unit: "piece", tags: ["Bad Fats", "Avoid"], color: "red", macros: { protein: 1, carbs: 6, fat: 4 } },

  // --- CHOCOLATES ---
  { name: "Dairy Milk (Small)", brand: "Cadbury", category: "Chocolates", calories: 75, unit: "bar", tags: ["Chocolates", "High Sugar"], color: "red", macros: { protein: 1, carbs: 9, fat: 4 } },
  { name: "5 Star (Small)", brand: "Cadbury", category: "Chocolates", calories: 105, unit: "bar", tags: ["Chocolates", "Avoid"], color: "red", macros: { protein: 1, carbs: 15, fat: 5 } },
  { name: "Munch", brand: "Nestle", category: "Chocolates", calories: 53, unit: "bar", tags: ["Chocolates", "Processed"], color: "yellow", macros: { protein: 0.5, carbs: 7, fat: 2.5 } },
  { name: "KitKat (2 Finger)", brand: "Nestle", category: "Chocolates", calories: 112, unit: "pack", tags: ["Chocolates", "High Sugar"], color: "red", macros: { protein: 1.5, carbs: 14, fat: 6 } },

  // --- INDIAN CHATS & STREET FOOD ---
  { name: "Samosa", brand: "Street", category: "Indian Chats", calories: 285, unit: "piece", tags: ["Indian Chats", "Avoid", "Bad Fats"], color: "red", macros: { protein: 5, carbs: 32, fat: 16 } },
  { name: "Pani Puri (6 pcs)", brand: "Street", category: "Indian Chats", calories: 215, unit: "plate", tags: ["Indian Chats", "Carbs Rich"], color: "yellow", macros: { protein: 3, carbs: 40, fat: 4 } },
  { name: "Bhel Puri", brand: "Street", category: "Indian Chats", calories: 195, unit: "plate", tags: ["Indian Chats"], color: "yellow", macros: { protein: 4, carbs: 35, fat: 5 } },
  { name: "Pav Bhaji", brand: "Street", category: "Indian Chats", calories: 440, unit: "plate", tags: ["Indian Chats", "High Fat"], color: "red", macros: { protein: 8, carbs: 65, fat: 18 } },
  { name: "Aloo Tikki (2 pcs)", brand: "Street", category: "Indian Chats", calories: 340, unit: "plate", tags: ["Avoid", "Bad Fats"], color: "red", macros: { protein: 4, carbs: 42, fat: 18 } },
  { name: "Dahi Bhalla", brand: "Street", category: "Indian Chats", calories: 280, unit: "plate", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 9, carbs: 35, fat: 12 } },
  { name: "Papdi Chat", brand: "Street", category: "Indian Chats", calories: 315, unit: "plate", tags: ["Avoid", "Heavily Processed"], color: "red", macros: { protein: 5, carbs: 45, fat: 15 } },

  // --- FAST FOOD ---
  { name: "McAloo Tikki Burger", brand: "McDonald's", category: "Fast Food", calories: 380, unit: "piece", tags: ["Heavily Processed", "Carbs Rich"], color: "yellow", macros: { protein: 9, carbs: 52, fat: 16 } },
  { name: "McSpicy Chicken Burger", brand: "McDonald's", category: "Fast Food", calories: 495, unit: "piece", tags: ["Avoid", "High Fat", "Heavily Processed"], color: "red", macros: { protein: 22, carbs: 45, fat: 28 } },
  { name: "French Fries (Medium)", brand: "McDonald's", category: "Fast Food", calories: 375, unit: "serving", tags: ["Avoid", "Bad Fats", "Synthetic food"], color: "red", macros: { protein: 4, carbs: 48, fat: 18 } },
  { name: "Hot & Spicy Chicken (1 pc)", brand: "KFC", category: "Fast Food", calories: 260, unit: "piece", tags: ["High Protein", "Bad Fats"], color: "yellow", macros: { protein: 18, carbs: 12, fat: 16 } },
  { name: "Zinger Burger", brand: "KFC", category: "Fast Food", calories: 510, unit: "piece", tags: ["Avoid", "Heavily Processed", "High Fat"], color: "red", macros: { protein: 25, carbs: 48, fat: 26 } },
  { name: "Popcorn Chicken (Medium)", brand: "KFC", category: "Fast Food", calories: 420, unit: "serving", tags: ["Avoid", "Bad Fats"], color: "red", macros: { protein: 24, carbs: 28, fat: 26 } },
  { name: "Margherita Pizza (1 slice)", brand: "Pizza Hut", category: "Fast Food", calories: 245, unit: "slice", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 9, carbs: 28, fat: 12 } },
  { name: "Chicken Supreme Pizza (1 slice)", brand: "Pizza Hut", category: "Fast Food", calories: 310, unit: "slice", tags: ["Avoid", "High Fat", "Heavily Processed"], color: "red", macros: { protein: 14, carbs: 30, fat: 16 } },
  { name: "Garlic Breadsticks (2 pcs)", brand: "Domino's", category: "Fast Food", calories: 320, unit: "serving", tags: ["Avoid", "Bad Fats"], color: "red", macros: { protein: 8, carbs: 42, fat: 14 } },
  { name: "Whopper JR", brand: "Burger King", category: "Fast Food", calories: 360, unit: "piece", tags: ["Avoid", "Heavily Processed"], color: "red", macros: { protein: 15, carbs: 30, fat: 20 } },
  { name: "Paneer Tikka Sub (6 inch)", brand: "Subway", category: "Fast Food", calories: 410, unit: "sub", tags: ["Healthy Fats", "Carbs Rich"], color: "yellow", macros: { protein: 18, carbs: 52, fat: 14 } },
  { name: "Roasted Chicken Sub (6 inch)", brand: "Subway", category: "Fast Food", calories: 320, unit: "sub", tags: ["Super Food", "High Protein", "Lean Meat"], color: "emerald", macros: { protein: 24, carbs: 44, fat: 6 } },

  // --- FATS & OILS (AUTOMATIC AVOID FOR >30g FAT) ---
  { name: "Refined Cooking Oil", brand: "Generic", category: "Fats", calories: 132, unit: "tbsp", tags: ["Avoid", "Heavily Processed", "Synthetic food"], color: "red", macros: { protein: 0, carbs: 0, fat: 15 } },
  { name: "Vanaspati/Dalda", brand: "Generic", category: "Fats", calories: 135, unit: "tbsp", tags: ["Avoid", "Synthetic food", "Bad Fats"], color: "red", macros: { protein: 0, carbs: 0, fat: 15 } },
  { name: "Ghee", brand: "Home", category: "Fats", calories: 130, unit: "tbsp", tags: ["Good Fats", "High Calorie"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 14.5 } },
  { name: "Cashews (50 units)", brand: "Fresh", category: "Nuts", calories: 852, unit: "serving", tags: ["Good Fats", "High Protein"], color: "yellow", macros: { protein: 25, carbs: 40, fat: 65 } },

  // --- SWEETS (MITHAI) ---
  { name: "Gulab Jamun", brand: "Mithai", category: "Sweets", calories: 175, unit: "piece", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 2, carbs: 30, fat: 6 } },
  { name: "Gajar Halwa", brand: "Home", category: "Sweets", calories: 410, unit: "cup", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 6, carbs: 50, fat: 22 } },
  { name: "Rasgulla", brand: "Mithai", category: "Sweets", calories: 110, unit: "piece", tags: ["High Sugar"], color: "yellow", macros: { protein: 3, carbs: 22, fat: 1 } },

  // --- DRINKS ---
  { name: "Tender Coconut Water", brand: "Natural", category: "Drinks", calories: 50, unit: "1 coconut", tags: ["Super Food", "Healthy", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 12, fat: 0 } },
  { name: "Masala Buttermilk (Chaas)", brand: "Home", category: "Drinks", calories: 45, unit: "glass", tags: ["Super Food", "Healthy", "Probiotic"], color: "emerald", macros: { protein: 2, carbs: 4, fat: 2 } },
  { name: "Sweet Lassi", brand: "Home/Shop", category: "Drinks", calories: 280, unit: "glass", tags: ["High Sugar", "Avoid"], color: "red", macros: { protein: 6, carbs: 40, fat: 12 } },
  { name: "Sugarcane Juice", brand: "Street", category: "Drinks", calories: 210, unit: "glass", tags: ["High Sugar", "Carbs Rich"], color: "yellow", macros: { protein: 0, carbs: 52, fat: 0 } },
  { name: "Fresh Lime Soda (With Sugar)", brand: "Restaurant", category: "Drinks", calories: 110, unit: "glass", tags: ["High Sugar"], color: "yellow", macros: { protein: 0, carbs: 28, fat: 0 } },
  { name: "Pepsi / Coca-Cola", brand: "PepsiCo/Coke", category: "Drinks", calories: 155, unit: "can", tags: ["Avoid", "Synthetic food", "High Sugar"], color: "red", macros: { protein: 0, carbs: 42, fat: 0 } },
  { name: "Thums Up", brand: "Coke", category: "Drinks", calories: 165, unit: "can", tags: ["Avoid", "High Sugar", "Synthetic food"], color: "red", macros: { protein: 0, carbs: 44, fat: 0 } },
  { name: "Sprite / 7Up", brand: "Coke/PepsiCo", category: "Drinks", calories: 150, unit: "can", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 0, carbs: 40, fat: 0 } },
  { name: "Diet Coke / Pepsi Black", brand: "Generic", category: "Drinks", calories: 2, unit: "can", tags: ["Synthetic food", "Zero Calorie"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 0 } },
  { name: "Mango Frooti / Maaza", brand: "Parle/Coke", category: "Drinks", calories: 180, unit: "small pack", tags: ["Avoid", "High Sugar", "Heavily Processed"], color: "red", macros: { protein: 0.5, carbs: 45, fat: 0 } },
  { name: "Orange Juice (Fresh)", brand: "Natural", category: "Drinks", calories: 120, unit: "glass", tags: ["Vitamins", "Carbs Rich"], color: "yellow", macros: { protein: 2, carbs: 26, fat: 0 } },
  { name: "Apple Juice (Packaged)", brand: "Real/B Natural", category: "Drinks", calories: 145, unit: "glass", tags: ["Heavily Processed", "High Sugar"], color: "red", macros: { protein: 0, carbs: 36, fat: 0 } },
  { name: "Red Bull", brand: "Red Bull", category: "Drinks", calories: 125, unit: "can", tags: ["Avoid", "Synthetic food", "High Caffeine"], color: "red", macros: { protein: 1, carbs: 30, fat: 0 } },
  { name: "Monster Energy", brand: "Monster", category: "Drinks", calories: 230, unit: "can", tags: ["Avoid", "High Sugar", "Synthetic food"], color: "red", macros: { protein: 0, carbs: 58, fat: 0 } },
  { name: "Gatorade", brand: "PepsiCo", category: "Drinks", calories: 90, unit: "bottle", tags: ["Synthetic food", "Electrolytes"], color: "yellow", macros: { protein: 0, carbs: 24, fat: 0 } },
  { name: "Masala Chai (With Milk & Sugar)", brand: "Home", category: "Drinks", calories: 135, unit: "cup", tags: ["Indian Style"], color: "yellow", macros: { protein: 3, carbs: 22, fat: 4 } },
  { name: "Filter Coffee", brand: "Home/Restaurant", category: "Drinks", calories: 150, unit: "cup", tags: ["Indian Style"], color: "yellow", macros: { protein: 4, carbs: 24, fat: 5 } },
  { name: "Black Coffee/Green Tea", brand: "Generic", category: "Drinks", calories: 5, unit: "cup", tags: ["Healthy", "Zero Calorie"], color: "emerald", macros: { protein: 0, carbs: 0, fat: 0 } }
];

export interface UserProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number; // cm
  weight: number; // kg
  goalWeight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieGoal: number;
  dailyStepGoal: number;
  dailyProteinGoal: number;
  startDate: string; // YYYY-MM-DD
}

export interface FoodLog {
  id: string;
  name: string;
  calories: number;
  timestamp: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface DailyData {
  userId?: string;
  date: string; // YYYY-MM-DD
  caloriesConsumed: number;
  steps: number;
  logs: FoodLog[];
  goalMet: boolean;
  weight?: number;
}

export const vibrate = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
