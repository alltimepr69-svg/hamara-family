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
  { name: "Black Coffee/Green Tea", brand: "Generic", category: "Drinks", calories: 5, unit: "cup", tags: ["Healthy", "Zero Calorie"], color: "emerald", macros: { protein: 0, carbs: 0, fat: 0 } },

  // --- HOUSEHOLD & DAILY USE ---
  { name: "Milk (Full Fat)", nameKn: "ಹಾಲು", brand: "Fresh", category: "Daily Use", calories: 134, unit: "1 glass (200ml)", tags: ["Super Food", "Calcium", "Protein"], color: "emerald", macros: { protein: 6.8, carbs: 9.6, fat: 8 } },
  { name: "Curd / Dahi", nameKn: "ಮೊಸರು", brand: "Home", category: "Daily Use", calories: 61, unit: "1 bowl (100g)", tags: ["Probiotic", "Healthy", "Calcium"], color: "emerald", macros: { protein: 3.5, carbs: 4.7, fat: 3.3 } },
  { name: "Lemon", nameKn: "ನಿಂಬೆ", brand: "Fresh", category: "Daily Use", calories: 17, unit: "1 medium (58g)", tags: ["Vitamins", "Super Food", "Zero Fat"], color: "emerald", macros: { protein: 0.6, carbs: 5.4, fat: 0.2 } },
  { name: "Coriander (Fresh)", nameKn: "ಕೊತ್ತಂಬರಿ", brand: "Fresh", category: "Daily Use", calories: 1, unit: "1 tbsp (4g)", tags: ["Vitamins", "Healthy"], color: "emerald", macros: { protein: 0.1, carbs: 0.1, fat: 0 } },
  { name: "Onion", nameKn: "ಈರುಳ್ಳಿ", brand: "Fresh", category: "Daily Use", calories: 44, unit: "1 medium (110g)", tags: ["Fiber Rich", "Vitamins"], color: "green", macros: { protein: 1.2, carbs: 10.3, fat: 0.1 } },
  { name: "Tomato", nameKn: "ಟೊಮ್ಯಾಟೊ", brand: "Fresh", category: "Daily Use", calories: 22, unit: "1 medium (123g)", tags: ["Super Food", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 1.1, carbs: 4.8, fat: 0.2 } },
  { name: "Potato (Boiled)", nameKn: "ಆಲೂ ಬೆಂದ", brand: "Home", category: "Daily Use", calories: 130, unit: "1 medium (150g)", tags: ["Carbs Rich", "Potassium"], color: "yellow", macros: { protein: 3, carbs: 30, fat: 0.1 } },
  { name: "Garlic", nameKn: "ಬೆಳ್ಳುಳ್ಳಿ", brand: "Fresh", category: "Daily Use", calories: 4, unit: "1 clove (3g)", tags: ["Super Food", "Immunity"], color: "emerald", macros: { protein: 0.2, carbs: 1, fat: 0 } },
  { name: "Ginger", nameKn: "ಶುಂಠಿ", brand: "Fresh", category: "Daily Use", calories: 8, unit: "1 inch (10g)", tags: ["Super Food", "Immunity", "Anti-inflammatory"], color: "emerald", macros: { protein: 0.2, carbs: 1.8, fat: 0.1 } },
  { name: "Butter", nameKn: "ಬೆಣ್ಣೆ", brand: "Amul", category: "Daily Use", calories: 36, unit: "1 tsp (5g)", tags: ["Good Fats", "High Calorie"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 4 } },
  { name: "Green Chilli", nameKn: "ಹಸಿ ಮೆಣಸಿನಕಾಯಿ", brand: "Fresh", category: "Daily Use", calories: 4, unit: "1 piece (10g)", tags: ["Vitamins", "Metabolism Boost"], color: "emerald", macros: { protein: 0.2, carbs: 0.8, fat: 0.1 } },

  // --- GRAINS & CEREALS ---
  { name: "Oats (Plain)", nameKn: "ಓಟ್ಸ್", brand: "Quaker", category: "Grains", calories: 148, unit: "1 bowl (40g dry)", tags: ["Super Food", "High Fiber", "Carbs Rich"], color: "emerald", macros: { protein: 5.2, carbs: 27, fat: 2.8 } },
  { name: "Multigrain Oats", brand: "Saffola", category: "Grains", calories: 152, unit: "1 bowl (40g dry)", tags: ["Super Food", "High Fiber", "Carbs Rich"], color: "emerald", macros: { protein: 5.5, carbs: 26, fat: 3 } },
  { name: "Channa / Chickpeas (Boiled)", nameKn: "ಕಡಲೆ", brand: "Home", category: "Grains", calories: 246, unit: "1 bowl (150g)", tags: ["High Protein", "Super Food", "Fiber Rich"], color: "emerald", macros: { protein: 13.1, carbs: 41, fat: 4 } },
  { name: "Brown Rice (Cooked)", brand: "Home", category: "Grains", calories: 216, unit: "1 bowl (150g)", tags: ["Super Food", "Fiber Rich", "Carbs Rich"], color: "emerald", macros: { protein: 4.5, carbs: 44, fat: 1.8 } },
  { name: "Quinoa (Cooked)", brand: "Organic India", category: "Grains", calories: 222, unit: "1 bowl (150g)", tags: ["Super Food", "High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 8.1, carbs: 39, fat: 3.5 } },
  { name: "Corn Flakes", brand: "Kellogg's", category: "Grains", calories: 152, unit: "1 bowl (40g)", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 2.8, carbs: 34, fat: 0.4 } },
  { name: "Muesli", brand: "Kellogg's", category: "Grains", calories: 190, unit: "1 bowl (50g)", tags: ["Fiber Rich", "Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 35, fat: 4 } },
  { name: "Plain White Rice (Cooked)", nameKn: "ಅನ್ನ", brand: "Home", category: "Grains", calories: 206, unit: "1 bowl (150g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 4.2, carbs: 44.5, fat: 0.4 } },
  { name: "Roti / Chapati (Wheat)", nameKn: "ಚಪಾತಿ", brand: "Home", category: "Grains", calories: 105, unit: "1 piece (35g)", tags: ["Carbs Rich", "Healthy"], color: "yellow", macros: { protein: 3, carbs: 20, fat: 2 } },

  // --- FRUITS ---
  { name: "Guava", nameKn: "ಸೀಬೆ", brand: "Fresh", category: "Fruits", calories: 68, unit: "1 medium (100g)", tags: ["Super Food", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 2.6, carbs: 14.3, fat: 1 } },
  { name: "Lychee", brand: "Fresh", category: "Fruits", calories: 66, unit: "10 pieces (100g)", tags: ["Vitamins", "Healthy"], color: "emerald", macros: { protein: 0.8, carbs: 16.5, fat: 0.4 } },
  { name: "Papaya", nameKn: "ಪಪ್ಪಾಯ", brand: "Fresh", category: "Fruits", calories: 59, unit: "1 slice (150g)", tags: ["Super Food", "Vitamins", "Digestive"], color: "emerald", macros: { protein: 0.7, carbs: 14.9, fat: 0.3 } },
  { name: "Mango", nameKn: "ಮಾವಿನಹಣ್ಣು", brand: "Fresh", category: "Fruits", calories: 135, unit: "1 medium (200g)", tags: ["Vitamins", "High Sugar", "Seasonal"], color: "yellow", macros: { protein: 1, carbs: 35.2, fat: 0.6 } },
  { name: "Banana", nameKn: "ಬಾಳೆಹಣ್ಣು", brand: "Fresh", category: "Fruits", calories: 105, unit: "1 medium (120g)", tags: ["Potassium", "Carbs Rich", "Energy"], color: "yellow", macros: { protein: 1.3, carbs: 27, fat: 0.4 } },
  { name: "Apple", nameKn: "ಸೇಬು", brand: "Fresh", category: "Fruits", calories: 95, unit: "1 medium (182g)", tags: ["Super Food", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 0.5, carbs: 25, fat: 0.3 } },
  { name: "Orange", nameKn: "ಕಿತ್ತಳೆ", brand: "Fresh", category: "Fruits", calories: 62, unit: "1 medium (130g)", tags: ["Vitamins", "Super Food", "Immunity"], color: "emerald", macros: { protein: 1.2, carbs: 15.4, fat: 0.2 } },
  { name: "Grapes", nameKn: "ದ್ರಾಕ್ಷಿ", brand: "Fresh", category: "Fruits", calories: 104, unit: "1 cup (150g)", tags: ["Vitamins", "Antioxidants"], color: "yellow", macros: { protein: 1.1, carbs: 27.3, fat: 0.2 } },
  { name: "Watermelon", nameKn: "ಕಲ್ಲಂಗಡಿ", brand: "Fresh", category: "Fruits", calories: 91, unit: "1 slice (300g)", tags: ["Hydrating", "Low Calorie", "Healthy"], color: "emerald", macros: { protein: 1.8, carbs: 22.9, fat: 0.5 } },
  { name: "Pomegranate", nameKn: "ದಾಳಿಂಬೆ", brand: "Fresh", category: "Fruits", calories: 144, unit: "1 medium (200g)", tags: ["Super Food", "Antioxidants", "Iron Rich"], color: "emerald", macros: { protein: 3.2, carbs: 32.6, fat: 2 } },
  { name: "Pineapple", nameKn: "ಅನಾನಸ್", brand: "Fresh", category: "Fruits", calories: 83, unit: "1 cup/slice (165g)", tags: ["Vitamins", "Digestive", "Healthy"], color: "emerald", macros: { protein: 0.9, carbs: 21.6, fat: 0.2 } },
  { name: "Strawberry", brand: "Fresh", category: "Fruits", calories: 32, unit: "10 pieces (100g)", tags: ["Super Food", "Low Calorie", "Antioxidants"], color: "emerald", macros: { protein: 0.7, carbs: 7.7, fat: 0.3 } },
  { name: "Pear", brand: "Fresh", category: "Fruits", calories: 102, unit: "1 medium (178g)", tags: ["Fiber Rich", "Vitamins", "Healthy"], color: "emerald", macros: { protein: 0.6, carbs: 27.5, fat: 0.2 } },
  { name: "Kiwi", brand: "Fresh", category: "Fruits", calories: 42, unit: "1 medium (69g)", tags: ["Super Food", "Vitamins", "Immunity"], color: "emerald", macros: { protein: 0.8, carbs: 10.1, fat: 0.4 } },
  { name: "Chikoo / Sapota", nameKn: "ಸಪೋಟ", brand: "Fresh", category: "Fruits", calories: 83, unit: "1 medium (100g)", tags: ["Vitamins", "Energy", "Carbs Rich"], color: "yellow", macros: { protein: 0.4, carbs: 19.9, fat: 1.1 } },
  { name: "Coconut (Fresh)", nameKn: "ತೆಂಗಿನಕಾಯಿ", brand: "Fresh", category: "Fruits", calories: 186, unit: "50g piece", tags: ["Good Fats", "Fiber Rich"], color: "yellow", macros: { protein: 1.7, carbs: 8, fat: 17 } },
  { name: "Plum", brand: "Fresh", category: "Fruits", calories: 30, unit: "1 medium (66g)", tags: ["Low Calorie", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 0.5, carbs: 7.5, fat: 0.2 } },
  { name: "Peach", brand: "Fresh", category: "Fruits", calories: 59, unit: "1 medium (150g)", tags: ["Vitamins", "Low Calorie", "Healthy"], color: "emerald", macros: { protein: 1.4, carbs: 14.3, fat: 0.4 } },
  { name: "Jamun / Java Plum", nameKn: "ನೇರಳೆ", brand: "Fresh", category: "Fruits", calories: 62, unit: "1 cup (100g)", tags: ["Super Food", "Diabetic Friendly", "Antioxidants"], color: "emerald", macros: { protein: 0.7, carbs: 14, fat: 0.2 } },
  { name: "Amla / Indian Gooseberry", nameKn: "ನೆಲ್ಲಿಕಾಯಿ", brand: "Fresh", category: "Fruits", calories: 44, unit: "2 medium (100g)", tags: ["Super Food", "Vitamins", "Immunity"], color: "emerald", macros: { protein: 0.9, carbs: 10.2, fat: 0.6 } },

  // --- DRY FRUITS ---
  { name: "Badam / Almonds", nameKn: "ಬಾದಾಮಿ", brand: "Fresh", category: "Dry Fruits", calories: 81, unit: "10 pieces (14g)", tags: ["Super Food", "Good Fats", "High Protein"], color: "emerald", macros: { protein: 3, carbs: 3.1, fat: 7 } },
  { name: "Kismis / Raisins", nameKn: "ಒಣ ದ್ರಾಕ್ಷಿ", brand: "Fresh", category: "Dry Fruits", calories: 30, unit: "10 pieces (10g)", tags: ["Energy", "Iron Rich"], color: "yellow", macros: { protein: 0.3, carbs: 7.9, fat: 0 } },
  { name: "Pista / Pistachio", nameKn: "ಪಿಸ್ತ", brand: "Fresh", category: "Dry Fruits", calories: 71, unit: "10 pieces (12g)", tags: ["Good Fats", "High Protein", "Super Food"], color: "emerald", macros: { protein: 2.6, carbs: 3.6, fat: 5.7 } },
  { name: "Akhrot / Walnuts", nameKn: "ಅಕ್ರೋಟ್", brand: "Fresh", category: "Dry Fruits", calories: 93, unit: "10 halves (14g)", tags: ["Super Food", "Good Fats", "Omega-3"], color: "emerald", macros: { protein: 2.2, carbs: 2, fat: 9.2 } },
  { name: "Anjeer / Dried Fig", nameKn: "ಅಂಜೂರ", brand: "Fresh", category: "Dry Fruits", calories: 64, unit: "2 pieces (25g)", tags: ["Iron Rich", "Fiber Rich", "Calcium"], color: "yellow", macros: { protein: 0.8, carbs: 16.5, fat: 0.3 } },
  { name: "Khajoor / Dates", nameKn: "ಖರ್ಜೂರ", brand: "Fresh", category: "Dry Fruits", calories: 66, unit: "2 pieces (24g)", tags: ["Energy", "Iron Rich", "Natural Sugar"], color: "yellow", macros: { protein: 0.4, carbs: 18, fat: 0.1 } },
  { name: "Munakka / Black Raisins", brand: "Fresh", category: "Dry Fruits", calories: 31, unit: "10 pieces (10g)", tags: ["Iron Rich", "Energy"], color: "yellow", macros: { protein: 0.3, carbs: 8.2, fat: 0.1 } },
  { name: "Jardalu / Dry Apricot", brand: "Fresh", category: "Dry Fruits", calories: 48, unit: "5 pieces (20g)", tags: ["Iron Rich", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 0.7, carbs: 12.4, fat: 0.1 } },
  { name: "Hazelnut", brand: "Fresh", category: "Dry Fruits", calories: 89, unit: "10 pieces (13g)", tags: ["Good Fats", "Vitamins"], color: "yellow", macros: { protein: 1.9, carbs: 2.4, fat: 8.7 } },
  { name: "Macadamia Nuts", brand: "Fresh", category: "Dry Fruits", calories: 137, unit: "10 pieces (20g)", tags: ["Good Fats", "High Calorie"], color: "yellow", macros: { protein: 1.5, carbs: 2.6, fat: 14.4 } },

  // --- SALADS ---
  { name: "Paneer Salad", nameKn: "ಪನೀರ್ ಸಲಾಡ್", brand: "Home", category: "Super Food", calories: 220, unit: "1 bowl (200g)", tags: ["Super Food", "High Protein", "Low Carb"], color: "emerald", macros: { protein: 14, carbs: 8, fat: 14 } },
  { name: "Sprouts Salad (Mixed)", nameKn: "ಮೊಳಕೆ ಸಲಾಡ್", brand: "Home", category: "Super Food", calories: 68, unit: "1 cup (100g)", tags: ["Super Food", "High Protein", "Vitamins"], color: "emerald", macros: { protein: 5.4, carbs: 10.8, fat: 0.5 } },
  { name: "Cucumber & Tomato Salad", nameKn: "ಸೌತೆ ಟೊಮ್ಯಾಟೊ ಸಲಾಡ್", brand: "Home", category: "Salads", calories: 30, unit: "1 bowl (150g)", tags: ["Super Food", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 1.4, carbs: 6, fat: 0.3 } },

  // --- CHOCOLATES (NEW) ---
  { name: "Milky Bar", brand: "Nestle", category: "Chocolates", calories: 122, unit: "1 bar (22.5g)", tags: ["Chocolates", "High Sugar", "Avoid"], color: "red", macros: { protein: 1.7, carbs: 15.9, fat: 6.3 } },
  { name: "Snickers", brand: "Mars", category: "Chocolates", calories: 250, unit: "1 bar (52.7g)", tags: ["Chocolates", "Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 33, fat: 12 } },
  { name: "Mars Bar", brand: "Mars", category: "Chocolates", calories: 230, unit: "1 bar (51g)", tags: ["Chocolates", "Avoid", "High Sugar"], color: "red", macros: { protein: 2.9, carbs: 35.4, fat: 8.6 } },
  { name: "Ferrero Rocher", brand: "Ferrero", category: "Chocolates", calories: 73, unit: "1 piece (12.5g)", tags: ["Chocolates", "High Sugar", "Good Fats"], color: "red", macros: { protein: 1.3, carbs: 6.1, fat: 4.7 } },
  { name: "Bounty", brand: "Mars", category: "Chocolates", calories: 136, unit: "1 bar (29g)", tags: ["Chocolates", "Avoid", "High Sugar"], color: "red", macros: { protein: 1.2, carbs: 18.3, fat: 6.5 } },

  // --- PROTEIN & SUPER FOODS ---
  { name: "Greek Yogurt (Plain)", brand: "Epigamia", category: "Super Food", calories: 99, unit: "1 cup (150g)", tags: ["Super Food", "High Protein", "Probiotic"], color: "emerald", macros: { protein: 10, carbs: 6, fat: 3.5 } },
  { name: "Soya Chunks (Cooked)", nameKn: "ಸೋಯಾ ಚಂಕ್ಸ್", brand: "Nutrela", category: "Super Food", calories: 148, unit: "1 bowl (100g)", tags: ["Super Food", "High Protein", "Plant Protein"], color: "emerald", macros: { protein: 17, carbs: 12, fat: 0.5 } },
  { name: "Tofu (Plain)", brand: "Fresh", category: "Super Food", calories: 76, unit: "100g", tags: ["High Protein", "Plant Protein", "Low Calorie"], color: "emerald", macros: { protein: 8, carbs: 1.9, fat: 4.8 } },
  { name: "Peanut Butter (Natural)", brand: "MyFitness", category: "Super Food", calories: 190, unit: "2 tbsp (32g)", tags: ["Super Food", "Good Fats", "High Protein"], color: "emerald", macros: { protein: 7.5, carbs: 6, fat: 16 } },
  { name: "Flaxseeds", nameKn: "ಅಗಸೆ ಬೀಜ", brand: "Organic", category: "Super Food", calories: 55, unit: "1 tbsp (10g)", tags: ["Super Food", "Omega-3", "Fiber Rich"], color: "emerald", macros: { protein: 1.9, carbs: 3, fat: 4.3 } },
  { name: "Chia Seeds", brand: "Organic India", category: "Super Food", calories: 49, unit: "1 tbsp (10g)", tags: ["Super Food", "Omega-3", "Fiber Rich"], color: "emerald", macros: { protein: 1.7, carbs: 4.3, fat: 3.1 } },
  { name: "Whey Protein Shake", brand: "Generic", category: "Super Food", calories: 120, unit: "1 scoop (30g)", tags: ["Super Food", "High Protein"], color: "emerald", macros: { protein: 24, carbs: 3, fat: 1.5 } },
  { name: "Boiled Moong Dal", nameKn: "ಬೇಳೆ (ಮೂಂಗ್)", brand: "Home", category: "Super Food", calories: 104, unit: "1 cup (100g)", tags: ["Super Food", "High Protein", "Digestive"], color: "emerald", macros: { protein: 7, carbs: 16, fat: 0.4 } },

  // --- VEGETABLES ---
  { name: "Broccoli (Steamed)", brand: "Fresh", category: "Vegetables", calories: 55, unit: "1 cup (91g)", tags: ["Super Food", "Vitamins", "Low Calorie"], color: "emerald", macros: { protein: 3.7, carbs: 11.2, fat: 0.6 } },
  { name: "Spinach (Palak)", nameKn: "ಪಾಲಕ್", brand: "Fresh", category: "Vegetables", calories: 7, unit: "1 cup (30g)", tags: ["Super Food", "Iron Rich", "Vitamins"], color: "emerald", macros: { protein: 0.9, carbs: 1.1, fat: 0.1 } },
  { name: "Carrot (Raw)", nameKn: "ಗಾಜರ್", brand: "Fresh", category: "Vegetables", calories: 25, unit: "1 medium (61g)", tags: ["Super Food", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 0.6, carbs: 5.8, fat: 0.1 } },
  { name: "Cucumber (Raw)", nameKn: "ಸೌತೆಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 16, unit: "1 medium (118g)", tags: ["Hydrating", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 0.7, carbs: 3.6, fat: 0.1 } },
  { name: "Sweet Potato (Boiled)", nameKn: "ಕೆಂಪು ಮಧುರ ಗೆಡ್ಡೆ", brand: "Home", category: "Vegetables", calories: 130, unit: "1 medium (150g)", tags: ["Super Food", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 2.4, carbs: 30, fat: 0.1 } },
  { name: "Beetroot (Boiled)", nameKn: "ಬೀಟ್‌ರೂಟ್", brand: "Fresh", category: "Vegetables", calories: 58, unit: "1 medium (100g)", tags: ["Super Food", "Iron Rich", "Stamina"], color: "emerald", macros: { protein: 2.2, carbs: 13, fat: 0.2 } },
  { name: "Mushroom (Sauteed)", brand: "Fresh", category: "Vegetables", calories: 22, unit: "1 cup (70g)", tags: ["Super Food", "High Protein", "Low Calorie"], color: "emerald", macros: { protein: 2.1, carbs: 3.1, fat: 0.3 } },
  { name: "Boiled Corn (Bhutta)", nameKn: "ಜೋಳ", brand: "Fresh", category: "Vegetables", calories: 123, unit: "1 cob (200g)", tags: ["Fiber Rich", "Carbs Rich"], color: "yellow", macros: { protein: 4.7, carbs: 27, fat: 1.8 } },
  { name: "Cauliflower (Gobi)", nameKn: "ಹೂಕೋಸು", brand: "Fresh", category: "Vegetables", calories: 25, unit: "1 cup (100g)", tags: ["Low Calorie", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 2, carbs: 5, fat: 0.3 } },
  { name: "Green Peas (Boiled)", nameKn: "ಬಟಾಣಿ", brand: "Fresh", category: "Vegetables", calories: 118, unit: "1 cup (160g)", tags: ["High Protein", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 7.9, carbs: 21, fat: 0.6 } },

  // --- MORE INDIAN BREAKFAST ---
  { name: "Rava Idli (2 nos)", nameKn: "ರವಾ ಇಡ್ಲಿ (2)", brand: "Home/Restaurant", category: "Breakfast", calories: 185, unit: "serving", tags: ["Healthy", "Light"], color: "emerald", macros: { protein: 5, carbs: 34, fat: 4 } },
  { name: "Akki Roti", nameKn: "ಅಕ್ಕಿ ರೊಟ್ಟಿ", brand: "Home", category: "Breakfast", calories: 145, unit: "piece", tags: ["Healthy", "Gluten Free", "Carbs Rich"], color: "emerald", macros: { protein: 2.5, carbs: 30, fat: 2 } },
  { name: "Moong Dal Chilla (2 nos)", brand: "Home", category: "Breakfast", calories: 175, unit: "serving", tags: ["High Protein", "Healthy", "Super Food"], color: "emerald", macros: { protein: 10, carbs: 24, fat: 4 } },
  { name: "Besan Chilla (2 nos)", nameKn: "ಬೇಸನ್ ಚಿಲ್ಲಾ", brand: "Home", category: "Breakfast", calories: 185, unit: "serving", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 9, carbs: 26, fat: 5 } },
  { name: "Sabudana Khichdi", nameKn: "ಸಾಬೂದಾನ ಖಿಚ್ಡಿ", brand: "Home", category: "Breakfast", calories: 330, unit: "bowl", tags: ["Carbs Rich", "Fasting Food"], color: "yellow", macros: { protein: 4, carbs: 60, fat: 8 } },
  { name: "Pesarattu (Green Moong Dosa)", brand: "Home", category: "Breakfast", calories: 115, unit: "piece", tags: ["High Protein", "Super Food", "Healthy"], color: "emerald", macros: { protein: 6, carbs: 18, fat: 2.5 } },
  { name: "Bread (Brown/Whole Wheat)", brand: "Britannia", category: "Breakfast", calories: 140, unit: "2 slices (50g)", tags: ["Fiber Rich", "Carbs Rich"], color: "yellow", macros: { protein: 5.5, carbs: 27, fat: 2 } },
  { name: "Bread (White)", brand: "Britannia", category: "Breakfast", calories: 160, unit: "2 slices (56g)", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 5, carbs: 30, fat: 2 } },
  { name: "Pancakes (2 nos)", brand: "Home", category: "Breakfast", calories: 260, unit: "serving", tags: ["Carbs Rich", "High Sugar"], color: "yellow", macros: { protein: 6, carbs: 40, fat: 8 } },

  // --- MORE INDIAN MAIN COURSE ---
  { name: "Dal Tadka", nameKn: "ದಾಲ್ ತಡ್ಕಾ", brand: "Home/Restaurant", category: "Main Course", calories: 210, unit: "bowl", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 10, carbs: 28, fat: 8 } },
  { name: "Matar Paneer", nameKn: "ಮಟರ್ ಪನೀರ್", brand: "Home", category: "Main Course", calories: 310, unit: "bowl", tags: ["High Protein"], color: "yellow", macros: { protein: 14, carbs: 18, fat: 22 } },
  { name: "Aloo Gobi (Dry)", nameKn: "ಆಲೂ ಗೋಬಿ", brand: "Home", category: "Main Course", calories: 195, unit: "bowl", tags: ["Fiber Rich", "Healthy"], color: "yellow", macros: { protein: 4.5, carbs: 28, fat: 8 } },
  { name: "Khichdi", nameKn: "ಖಿಚ್ಡಿ", brand: "Home", category: "Main Course", calories: 290, unit: "bowl", tags: ["High Protein", "Healthy", "Carbs Rich"], color: "emerald", macros: { protein: 10, carbs: 48, fat: 7 } },
  { name: "Lemon Rice", nameKn: "ಚಿತ್ರಾನ್ನ", brand: "Home", category: "Main Course", calories: 295, unit: "bowl", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 4, carbs: 52, fat: 8 } },
  { name: "Curd Rice", nameKn: "ಮೊಸರನ್ನ", brand: "Home", category: "Main Course", calories: 280, unit: "bowl", tags: ["Probiotic", "Healthy", "Carbs Rich"], color: "yellow", macros: { protein: 7, carbs: 48, fat: 6 } },
  { name: "Tamarind Rice / Puliyogare", nameKn: "ಪುಳಿಯೋಗರೆ", brand: "Home", category: "Main Course", calories: 320, unit: "bowl", tags: ["Carbs Rich", "Traditional"], color: "yellow", macros: { protein: 4, carbs: 56, fat: 10 } },
  { name: "Paneer Butter Masala", nameKn: "ಪನೀರ್ ಬಟರ್ ಮಸಾಲ", brand: "Restaurant", category: "Main Course", calories: 420, unit: "bowl", tags: ["Avoid", "High Fat", "High Protein"], color: "red", macros: { protein: 18, carbs: 14, fat: 34 } },
  { name: "Sambar Rice", nameKn: "ಸಾಂಬಾರ್ ಅನ್ನ", brand: "Home", category: "Main Course", calories: 310, unit: "bowl", tags: ["Healthy", "High Protein", "Carbs Rich"], color: "emerald", macros: { protein: 9, carbs: 52, fat: 6 } },
  { name: "Avial", nameKn: "ಅವಿಯಲ್", brand: "Home", category: "Main Course", calories: 155, unit: "cup", tags: ["Healthy", "Vitamins", "Traditional"], color: "emerald", macros: { protein: 3, carbs: 14, fat: 9 } },
  { name: "Jeera Rice", nameKn: "ಜೀರಾ ರೈಸ್", brand: "Home/Restaurant", category: "Main Course", calories: 290, unit: "bowl", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 4.5, carbs: 55, fat: 6 } },
  { name: "Veg Fried Rice", brand: "Restaurant", category: "Main Course", calories: 340, unit: "bowl", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 7, carbs: 58, fat: 10 } },

  // --- MORE NON-VEG ---
  { name: "Egg Curry (2 Eggs)", nameKn: "ಮೊಟ್ಟೆ ಸಾರು", brand: "Home", category: "Non-Veg", calories: 280, unit: "bowl", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 16, carbs: 8, fat: 20 } },
  { name: "Egg Omelette (Plain, 2 Eggs)", nameKn: "ಆಮ್ಲೆಟ್", brand: "Home", category: "Non-Veg", calories: 185, unit: "plate", tags: ["High Protein", "Good Fats", "Super Food"], color: "emerald", macros: { protein: 13, carbs: 1, fat: 14 } },
  { name: "Prawn Masala", brand: "Home/Restaurant", category: "Non-Veg", calories: 235, unit: "bowl", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 22, carbs: 8, fat: 14 } },
  { name: "Chicken Soup (Clear)", brand: "Home", category: "Non-Veg", calories: 110, unit: "bowl", tags: ["High Protein", "Low Calorie", "Healthy"], color: "emerald", macros: { protein: 12, carbs: 6, fat: 4 } },
  { name: "Mutton Biryani", brand: "Restaurant", category: "Non-Veg", calories: 620, unit: "plate", tags: ["Avoid", "High Fat", "High Protein", "Carbs Rich"], color: "red", macros: { protein: 28, carbs: 72, fat: 28 } },

  // --- SNACKS (INDIAN) ---
  { name: "Roasted Chana", nameKn: "ಹುರಿದ ಕಡಲೆ", brand: "Generic", category: "Snacks", calories: 120, unit: "1 small cup (30g)", tags: ["High Protein", "Healthy Snack", "Fiber Rich"], color: "emerald", macros: { protein: 7.5, carbs: 18, fat: 2 } },
  { name: "Murmura / Puffed Rice", nameKn: "ಮುರಮುರೆ", brand: "Generic", category: "Snacks", calories: 110, unit: "1 cup (30g)", tags: ["Light Snack", "Low Fat"], color: "yellow", macros: { protein: 2, carbs: 24, fat: 0.5 } },
  { name: "Chakli", nameKn: "ಚಕ್ಕುಲಿ", brand: "Home/Local", category: "Snacks", calories: 165, unit: "2 pieces (30g)", tags: ["Avoid", "Bad Fats", "High Calorie"], color: "red", macros: { protein: 2, carbs: 20, fat: 9 } },
  { name: "Khakra (Masala)", brand: "Haldirams", category: "Snacks", calories: 110, unit: "2 pieces (25g)", tags: ["Light Snack"], color: "yellow", macros: { protein: 3, carbs: 20, fat: 2 } },
  { name: "Masala Peanuts", nameKn: "ಮಸಾಲ ಶೇಂಗಾ", brand: "Haldirams", category: "Snacks", calories: 165, unit: "1 small cup (30g)", tags: ["Good Fats", "High Protein"], color: "yellow", macros: { protein: 7, carbs: 12, fat: 9 } },
  { name: "Popcorn (Butter)", brand: "Generic", category: "Snacks", calories: 135, unit: "1 cup (30g)", tags: ["Light Snack", "Carbs Rich"], color: "yellow", macros: { protein: 2, carbs: 18, fat: 7 } },
  { name: "Bhujia / Sev", nameKn: "ಭುಜಿಯ", brand: "Haldirams", category: "Snacks", calories: 155, unit: "1 small handful (30g)", tags: ["Avoid", "Bad Fats", "Heavily Processed"], color: "red", macros: { protein: 4, carbs: 18, fat: 8 } },
  { name: "Protein Bar", brand: "RiteBite", category: "Snacks", calories: 220, unit: "1 bar (60g)", tags: ["High Protein", "Healthy Snack"], color: "emerald", macros: { protein: 18, carbs: 22, fat: 7 } },

  // --- MORE SWEETS ---
  { name: "Kheer (Rice Pudding)", nameKn: "ಖೀರ್", brand: "Home", category: "Sweets", calories: 315, unit: "bowl", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 7, carbs: 48, fat: 12 } },
  { name: "Jalebi (2 pcs)", nameKn: "ಜಿಲೇಬಿ", brand: "Street/Mithai", category: "Sweets", calories: 150, unit: "2 pieces (40g)", tags: ["Avoid", "High Sugar", "Bad Fats"], color: "red", macros: { protein: 1, carbs: 30, fat: 5 } },
  { name: "Besan Ladoo", nameKn: "ಬೇಸನ್ ಲಡ್ಡು", brand: "Home/Mithai", category: "Sweets", calories: 185, unit: "1 piece (45g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 25, fat: 8 } },
  { name: "Kaju Barfi", nameKn: "ಕಾಜು ಬರ್ಫಿ", brand: "Mithai", category: "Sweets", calories: 160, unit: "1 piece (30g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3.5, carbs: 22, fat: 7 } },
  { name: "Shrikhand", nameKn: "ಶ್ರೀಖಂಡ", brand: "Home", category: "Sweets", calories: 185, unit: "1 bowl (100g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 5.5, carbs: 28, fat: 7 } },
  { name: "Mysore Pak", nameKn: "ಮೈಸೂರ್ ಪಾಕ್", brand: "Mithai", category: "Sweets", calories: 175, unit: "1 piece (35g)", tags: ["Avoid", "High Fat", "High Sugar"], color: "red", macros: { protein: 2, carbs: 20, fat: 10 } },
  { name: "Rasmalai (2 pcs)", nameKn: "ರಸಮಲಾಯ್", brand: "Mithai", category: "Sweets", calories: 185, unit: "2 pieces (80g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 7, carbs: 24, fat: 8 } },

  // --- MORE DRINKS ---
  { name: "Turmeric Milk (Haldi Doodh)", nameKn: "ಅರಿಶಿನ ಹಾಲು", brand: "Home", category: "Drinks", calories: 145, unit: "1 glass (200ml)", tags: ["Super Food", "Immunity", "Anti-inflammatory"], color: "emerald", macros: { protein: 6, carbs: 12, fat: 7 } },
  { name: "Badam Milk", nameKn: "ಬಾದಾಮಿ ಹಾಲು", brand: "Home", category: "Drinks", calories: 210, unit: "1 glass (200ml)", tags: ["Healthy", "Calcium", "Good Fats"], color: "yellow", macros: { protein: 7, carbs: 22, fat: 10 } },
  { name: "Banana Shake", nameKn: "ಬಾಳೆ ಶೇಕ್", brand: "Home", category: "Drinks", calories: 245, unit: "1 glass (300ml)", tags: ["Carbs Rich", "Potassium", "Energy"], color: "yellow", macros: { protein: 6, carbs: 46, fat: 5 } },
  { name: "Mango Lassi", nameKn: "ಮಾವಿನ ಲಸ್ಸಿ", brand: "Home/Restaurant", category: "Drinks", calories: 260, unit: "1 glass (300ml)", tags: ["High Sugar", "Avoid"], color: "red", macros: { protein: 5, carbs: 42, fat: 8 } },
  { name: "Lemon Water (Plain)", nameKn: "ನಿಂಬೆ ನೀರು", brand: "Home", category: "Drinks", calories: 8, unit: "1 glass (250ml)", tags: ["Super Food", "Zero Calorie", "Detox"], color: "emerald", macros: { protein: 0.1, carbs: 2, fat: 0 } },
  { name: "Almond Milk", brand: "So Good", category: "Drinks", calories: 60, unit: "1 glass (200ml)", tags: ["Healthy", "Low Calorie", "Dairy Free"], color: "emerald", macros: { protein: 1.4, carbs: 8, fat: 2.5 } },
  { name: "Amla Juice", nameKn: "ನೆಲ್ಲಿ ಜ್ಯೂಸ್", brand: "Patanjali", category: "Drinks", calories: 60, unit: "1 glass (200ml)", tags: ["Super Food", "Vitamins", "Immunity"], color: "emerald", macros: { protein: 0.5, carbs: 14, fat: 0 } },
  { name: "Fresh Lime Soda (No Sugar)", brand: "Restaurant", category: "Drinks", calories: 15, unit: "glass", tags: ["Healthy", "Low Calorie", "Hydrating"], color: "emerald", macros: { protein: 0, carbs: 4, fat: 0 } },

  // --- INTERNATIONAL FOODS ---
  { name: "Pasta (Cooked, Plain)", brand: "Generic", category: "International", calories: 220, unit: "1 bowl (150g)", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 7.5, carbs: 43, fat: 1.8 } },
  { name: "Noodles (Boiled, Plain)", brand: "Generic", category: "International", calories: 200, unit: "1 bowl (150g)", tags: ["Carbs Rich", "Heavily Processed"], color: "yellow", macros: { protein: 5.5, carbs: 40, fat: 2 } },
  { name: "Egg Sandwich", brand: "Home", category: "International", calories: 290, unit: "1 sandwich", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 15, carbs: 28, fat: 13 } },
  { name: "Peanut Butter Sandwich", brand: "Home", category: "International", calories: 355, unit: "1 sandwich", tags: ["Good Fats", "Carbs Rich", "High Protein"], color: "yellow", macros: { protein: 13, carbs: 38, fat: 16 } },
  { name: "Scrambled Eggs (2 Eggs)", brand: "Home", category: "International", calories: 195, unit: "plate", tags: ["High Protein", "Super Food", "Good Fats"], color: "emerald", macros: { protein: 14, carbs: 2, fat: 14 } },
  { name: "Chicken Wrap / Frankie", brand: "Restaurant", category: "International", calories: 385, unit: "1 wrap", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 22, carbs: 42, fat: 14 } },
  { name: "Veg Wrap / Frankie", nameKn: "ವೆಜ್ ಫ್ರಾಂಕಿ", brand: "Street/Restaurant", category: "International", calories: 310, unit: "1 wrap", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 8, carbs: 48, fat: 10 } },
  { name: "Maggi Noodles (1 pack)", brand: "Nestle", category: "Fast Food", calories: 360, unit: "1 pack (70g)", tags: ["Avoid", "Heavily Processed", "Synthetic food"], color: "red", macros: { protein: 8, carbs: 52, fat: 14 } },

  // --- SOUTH INDIAN SPECIALS ---
  { name: "Uttapam (Onion)", nameKn: "ಉತ್ತಪ್ಪ", brand: "Home/Restaurant", category: "Breakfast", calories: 150, unit: "1 piece (100g)", tags: ["Healthy", "Light"], color: "emerald", macros: { protein: 4, carbs: 28, fat: 3 } },
  { name: "Rava Dosa", nameKn: "ರವಾ ದೋಸೆ", brand: "Home/Restaurant", category: "Breakfast", calories: 130, unit: "1 dosa (80g)", tags: ["Light", "Carbs Rich"], color: "yellow", macros: { protein: 3, carbs: 22, fat: 4 } },
  { name: "Onion Rava Dosa", nameKn: "ಈರುಳ್ಳಿ ರವಾ ದೋಸೆ", brand: "Restaurant", category: "Breakfast", calories: 160, unit: "1 dosa (100g)", tags: ["Light", "Carbs Rich"], color: "yellow", macros: { protein: 4, carbs: 25, fat: 5 } },
  { name: "Egg Dosa", nameKn: "ಮೊಟ್ಟೆ ದೋಸೆ", brand: "Restaurant", category: "Breakfast", calories: 210, unit: "1 dosa (130g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 11, carbs: 26, fat: 7 } },
  { name: "Paneer Dosa", nameKn: "ಪನೀರ್ ದೋಸೆ", brand: "Restaurant", category: "Breakfast", calories: 240, unit: "1 dosa (130g)", tags: ["High Protein"], color: "yellow", macros: { protein: 10, carbs: 30, fat: 9 } },
  { name: "Ven Pongal", nameKn: "ವೆನ್ ಪೊಂಗಲ್", brand: "Home/Restaurant", category: "Breakfast", calories: 280, unit: "1 bowl (200g)", tags: ["Healthy", "Carbs Rich"], color: "yellow", macros: { protein: 7, carbs: 44, fat: 9 } },
  { name: "Khara Bath", nameKn: "ಖಾರಾ ಬಾತ್", brand: "Home/Restaurant", category: "Breakfast", calories: 260, unit: "1 bowl (200g)", tags: ["Carbs Rich", "Spicy"], color: "yellow", macros: { protein: 5, carbs: 40, fat: 8 } },
  { name: "Kesari Bath", nameKn: "ಕೇಸರಿ ಬಾತ್", brand: "Home/Restaurant", category: "Sweets", calories: 310, unit: "1 bowl (150g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3, carbs: 55, fat: 9 } },
  { name: "Coconut Chutney", nameKn: "ತೆಂಗಿನ ಚಟ್ನಿ", brand: "Home", category: "Sides", calories: 55, unit: "2 tbsp (30g)", tags: ["Healthy", "Good Fats"], color: "emerald", macros: { protein: 1, carbs: 3, fat: 4 } },
  { name: "Tomato Chutney", nameKn: "ಟೊಮ್ಯಾಟೋ ಚಟ್ನಿ", brand: "Home", category: "Sides", calories: 30, unit: "2 tbsp (30g)", tags: ["Healthy", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 5, fat: 1 } },
  { name: "Rasam", nameKn: "ರಸಂ", brand: "Home", category: "Sides", calories: 50, unit: "1 bowl (200ml)", tags: ["Healthy", "Digestive", "Low Calorie"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 1 } },
  { name: "Kootu (Mixed Veg)", nameKn: "ಕೂಟು", brand: "Home", category: "Main Course", calories: 130, unit: "1 bowl (150g)", tags: ["Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 5, carbs: 18, fat: 4 } },
  { name: "Mor Kuzhambu", nameKn: "ಮೋರ್ ಕುಳಂಬು", brand: "Home", category: "Main Course", calories: 90, unit: "1 bowl (150ml)", tags: ["Probiotic", "Light", "Healthy"], color: "emerald", macros: { protein: 4, carbs: 8, fat: 4 } },
  { name: "Appam (2 nos)", nameKn: "ಅಪ್ಪ", brand: "Home", category: "Breakfast", calories: 160, unit: "2 pieces (100g)", tags: ["Healthy", "Light", "Gluten Free"], color: "emerald", macros: { protein: 4, carbs: 30, fat: 3 } },
  { name: "Vegetable Stew", nameKn: "ತರಕಾರಿ ಸ್ಟ್ಯೂ", brand: "Home", category: "Main Course", calories: 120, unit: "1 bowl (200ml)", tags: ["Healthy", "Light"], color: "emerald", macros: { protein: 4, carbs: 16, fat: 4 } },
  { name: "Puttu", nameKn: "ಪುಟ್ಟು", brand: "Home", category: "Breakfast", calories: 240, unit: "1 serving (150g)", tags: ["Healthy", "Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 46, fat: 3 } },
  { name: "Kadala Curry", nameKn: "ಕಡಲೆ ಕರಿ", brand: "Home", category: "Main Course", calories: 160, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 8, carbs: 22, fat: 4 } },

  // --- NORTH INDIAN BREADS ---
  { name: "Naan (Plain)", nameKn: "ನಾನ್", brand: "Restaurant", category: "Breads", calories: 260, unit: "1 piece (90g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 8, carbs: 45, fat: 5 } },
  { name: "Garlic Naan", nameKn: "ಗಾರ್ಲಿಕ್ ನಾನ್", brand: "Restaurant", category: "Breads", calories: 290, unit: "1 piece (100g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 8, carbs: 48, fat: 7 } },
  { name: "Butter Naan", nameKn: "ಬಟರ್ ನಾನ್", brand: "Restaurant", category: "Breads", calories: 310, unit: "1 piece (100g)", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 8, carbs: 46, fat: 10 } },
  { name: "Tandoori Roti", nameKn: "ತಂದೂರಿ ರೊಟ್ಟಿ", brand: "Restaurant", category: "Breads", calories: 200, unit: "1 piece (80g)", tags: ["Healthy", "Carbs Rich"], color: "emerald", macros: { protein: 6, carbs: 38, fat: 3 } },
  { name: "Bhatura", nameKn: "ಭಟೂರ", brand: "Restaurant", category: "Breads", calories: 310, unit: "1 piece (100g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 7, carbs: 48, fat: 10 } },
  { name: "Poori (2 pcs)", nameKn: "ಪೂರಿ", brand: "Home/Restaurant", category: "Breads", calories: 280, unit: "2 pieces (80g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 5, carbs: 38, fat: 12 } },
  { name: "Makki Ki Roti", nameKn: "ಮಕ್ಕಿ ರೊಟ್ಟಿ", brand: "Home", category: "Breads", calories: 175, unit: "1 piece (80g)", tags: ["Healthy", "Gluten Free", "Fiber Rich"], color: "emerald", macros: { protein: 4, carbs: 36, fat: 2 } },
  { name: "Bajra Roti", nameKn: "ಬಾಜ್ರಾ ರೊಟ್ಟಿ", brand: "Home", category: "Breads", calories: 170, unit: "1 piece (80g)", tags: ["Healthy", "Fiber Rich", "Gluten Free"], color: "emerald", macros: { protein: 5, carbs: 34, fat: 2 } },
  { name: "Thepla", nameKn: "ತೇಪ್ಲಾ", brand: "Home", category: "Breads", calories: 130, unit: "1 piece (60g)", tags: ["Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 4, carbs: 20, fat: 4 } },
  { name: "Methi Thepla", nameKn: "ಮೆಂತ್ಯ ತೇಪ್ಲಾ", brand: "Home", category: "Breads", calories: 125, unit: "1 piece (60g)", tags: ["Healthy", "Fiber Rich", "Iron Rich"], color: "emerald", macros: { protein: 4, carbs: 19, fat: 4 } },
  { name: "Dal Paratha", nameKn: "ದಾಲ್ ಪರಾಠ", brand: "Home", category: "Breads", calories: 230, unit: "1 piece (90g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 9, carbs: 33, fat: 7 } },
  { name: "Lachha Paratha", nameKn: "ಲಚ್ಚಾ ಪರಾಠ", brand: "Restaurant", category: "Breads", calories: 250, unit: "1 piece (90g)", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 6, carbs: 36, fat: 9 } },
  { name: "Rumali Roti", nameKn: "ರೂಮಾಲಿ ರೊಟ್ಟಿ", brand: "Restaurant", category: "Breads", calories: 110, unit: "1 piece (50g)", tags: ["Light", "Carbs Rich"], color: "yellow", macros: { protein: 4, carbs: 22, fat: 1 } },

  // --- RICE & BIRYANI ---
  { name: "Veg Biryani", nameKn: "ವೆಜ್ ಬಿರಿಯಾನಿ", brand: "Home/Restaurant", category: "Main Course", calories: 380, unit: "1 plate (300g)", tags: ["Carbs Rich", "Healthy"], color: "yellow", macros: { protein: 9, carbs: 68, fat: 8 } },
  { name: "Hyderabadi Chicken Biryani", nameKn: "ಹೈದರಾಬಾದಿ ಬಿರಿಯಾನಿ", brand: "Restaurant", category: "Non-Veg", calories: 490, unit: "1 plate (300g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 28, carbs: 62, fat: 14 } },
  { name: "Egg Biryani", nameKn: "ಮೊಟ್ಟೆ ಬಿರಿಯಾನಿ", brand: "Restaurant", category: "Non-Veg", calories: 420, unit: "1 plate (300g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 16, carbs: 65, fat: 11 } },
  { name: "Prawn Biryani", nameKn: "ಸೀಗಡಿ ಬಿರಿಯಾನಿ", brand: "Restaurant", category: "Non-Veg", calories: 430, unit: "1 plate (300g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 20, carbs: 63, fat: 11 } },
  { name: "Kashmiri Pulao", nameKn: "ಕಾಶ್ಮೀರಿ ಪುಲಾವ್", brand: "Restaurant", category: "Main Course", calories: 370, unit: "1 plate (250g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 8, carbs: 62, fat: 10 } },
  { name: "Peas Pulao", nameKn: "ಮಟರ್ ಪುಲಾವ್", brand: "Home", category: "Main Course", calories: 280, unit: "1 bowl (200g)", tags: ["Healthy", "Carbs Rich"], color: "emerald", macros: { protein: 7, carbs: 52, fat: 5 } },
  { name: "Vegetable Pulao", nameKn: "ತರಕಾರಿ ಪುಲಾವ್", brand: "Home", category: "Main Course", calories: 260, unit: "1 bowl (200g)", tags: ["Healthy", "Carbs Rich"], color: "emerald", macros: { protein: 6, carbs: 48, fat: 5 } },
  { name: "Coconut Rice", nameKn: "ಕೊಬ್ರಿ ಅನ್ನ", brand: "Home", category: "Main Course", calories: 290, unit: "1 bowl (200g)", tags: ["Carbs Rich", "Traditional"], color: "yellow", macros: { protein: 5, carbs: 50, fat: 7 } },
  { name: "Tomato Rice", nameKn: "ಟೊಮ್ಯಾಟೋ ಬಾತ್", brand: "Home", category: "Main Course", calories: 250, unit: "1 bowl (200g)", tags: ["Healthy", "Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 45, fat: 5 } },
  { name: "Vangi Bath", nameKn: "ವಾಂಗಿ ಬಾತ್", brand: "Home", category: "Main Course", calories: 270, unit: "1 bowl (200g)", tags: ["Carbs Rich", "Traditional"], color: "yellow", macros: { protein: 5, carbs: 46, fat: 7 } },
  { name: "Methi Rice", nameKn: "ಮೆಂತ್ಯ ಅನ್ನ", brand: "Home", category: "Main Course", calories: 255, unit: "1 bowl (200g)", tags: ["Healthy", "Iron Rich"], color: "emerald", macros: { protein: 6, carbs: 46, fat: 5 } },
  { name: "Ghee Rice", nameKn: "ತುಪ್ಪದ ಅನ್ನ", brand: "Home/Restaurant", category: "Main Course", calories: 320, unit: "1 bowl (200g)", tags: ["High Fat", "Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 50, fat: 11 } },

  // --- VEGETARIAN CURRIES & DALS ---
  { name: "Moong Dal (Yellow)", nameKn: "ಹೆಸರು ಬೇಳೆ", brand: "Home", category: "Main Course", calories: 140, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy", "Digestive"], color: "emerald", macros: { protein: 9, carbs: 22, fat: 1 } },
  { name: "Masoor Dal", nameKn: "ಮಸೂರ್ ದಾಲ್", brand: "Home", category: "Main Course", calories: 130, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy", "Iron Rich"], color: "emerald", macros: { protein: 9, carbs: 20, fat: 1 } },
  { name: "Urad Dal", nameKn: "ಉದ್ದಿನ ಬೇಳೆ", brand: "Home", category: "Main Course", calories: 150, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 10, carbs: 22, fat: 1 } },
  { name: "Arhar / Toor Dal", nameKn: "ತೊಗರಿ ಬೇಳೆ", brand: "Home", category: "Main Course", calories: 145, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 9, carbs: 22, fat: 1 } },
  { name: "Chana Dal", nameKn: "ಚನಾ ದಾಲ್", brand: "Home", category: "Main Course", calories: 165, unit: "1 bowl (150g)", tags: ["High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 10, carbs: 26, fat: 2 } },
  { name: "Rajma (Kidney Beans)", nameKn: "ರಾಜ್ಮಾ", brand: "Home", category: "Main Course", calories: 170, unit: "1 bowl (150g)", tags: ["High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 10, carbs: 28, fat: 2 } },
  { name: "Chhole Masala", nameKn: "ಛೋಲೆ ಮಸಾಲ", brand: "Home/Restaurant", category: "Main Course", calories: 180, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 9, carbs: 28, fat: 4 } },
  { name: "Paneer Bhurji", nameKn: "ಪನೀರ್ ಭುರ್ಜಿ", brand: "Home", category: "Main Course", calories: 250, unit: "1 bowl (150g)", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 14, carbs: 8, fat: 18 } },
  { name: "Shahi Paneer", nameKn: "ಶಾಹಿ ಪನೀರ್", brand: "Restaurant", category: "Main Course", calories: 310, unit: "1 bowl (150g)", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 12, carbs: 12, fat: 24 } },
  { name: "Paneer Do Pyaza", nameKn: "ಪನೀರ್ ದೊ ಪ್ಯಾಝಾ", brand: "Restaurant", category: "Main Course", calories: 270, unit: "1 bowl (150g)", tags: ["High Protein"], color: "yellow", macros: { protein: 12, carbs: 14, fat: 18 } },
  { name: "Mix Veg Curry", nameKn: "ಮಿಕ್ಸ್ ವೆಜ್ ಕರಿ", brand: "Home", category: "Main Course", calories: 140, unit: "1 bowl (150g)", tags: ["Healthy", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 4, carbs: 18, fat: 6 } },
  { name: "Baingan Bharta", nameKn: "ಬೈಂಗನ್ ಭರ್ತಾ", brand: "Home", category: "Main Course", calories: 120, unit: "1 bowl (150g)", tags: ["Healthy", "Low Calorie"], color: "emerald", macros: { protein: 3, carbs: 16, fat: 5 } },
  { name: "Aloo Matar", nameKn: "ಆಲೂ ಮಟರ್", brand: "Home", category: "Main Course", calories: 155, unit: "1 bowl (150g)", tags: ["Healthy", "Fiber Rich"], color: "yellow", macros: { protein: 4, carbs: 26, fat: 4 } },
  { name: "Aloo Palak", nameKn: "ಆಲೂ ಪಾಲಕ್", brand: "Home", category: "Main Course", calories: 140, unit: "1 bowl (150g)", tags: ["Healthy", "Iron Rich"], color: "emerald", macros: { protein: 4, carbs: 22, fat: 4 } },
  { name: "Lauki Sabzi", nameKn: "ಸೊರೆಕಾಯಿ ಪಲ್ಯ", brand: "Home", category: "Main Course", calories: 70, unit: "1 bowl (150g)", tags: ["Super Food", "Low Calorie", "Hydrating"], color: "emerald", macros: { protein: 2, carbs: 12, fat: 1 } },
  { name: "Bhindi Masala", nameKn: "ಬೆಂಡೇಕಾಯಿ ಪಲ್ಯ", brand: "Home", category: "Main Course", calories: 110, unit: "1 bowl (150g)", tags: ["Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 3, carbs: 14, fat: 5 } },
  { name: "Jeera Aloo", nameKn: "ಜೀರಾ ಆಲೂ", brand: "Home", category: "Main Course", calories: 160, unit: "1 bowl (150g)", tags: ["Healthy"], color: "yellow", macros: { protein: 3, carbs: 28, fat: 5 } },
  { name: "Methi Aloo", nameKn: "ಮೆಂತ್ಯ ಆಲೂ", brand: "Home", category: "Main Course", calories: 145, unit: "1 bowl (150g)", tags: ["Healthy", "Iron Rich"], color: "emerald", macros: { protein: 4, carbs: 23, fat: 5 } },
  { name: "Sarson Ka Saag", nameKn: "ಸಾಸಿವೆ ಸೊಪ್ಪು", brand: "Home", category: "Main Course", calories: 140, unit: "1 bowl (200g)", tags: ["Super Food", "Iron Rich", "Vitamins"], color: "emerald", macros: { protein: 6, carbs: 16, fat: 6 } },
  { name: "Kofta Curry (Veg)", nameKn: "ವೆಜ್ ಕೊಫ್ತಾ", brand: "Restaurant", category: "Main Course", calories: 220, unit: "1 bowl (150g)", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 6, carbs: 18, fat: 14 } },

  // --- FISH & SEAFOOD ---
  { name: "Pomfret Fry", nameKn: "ಪಾಂಫ್ರೆಟ್ ಫ್ರೈ", brand: "Home/Restaurant", category: "Non-Veg", calories: 220, unit: "1 piece (150g)", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 28, carbs: 4, fat: 10 } },
  { name: "Prawn Curry", nameKn: "ಸೀಗಡಿ ಸಾರು", brand: "Home", category: "Non-Veg", calories: 200, unit: "1 bowl (150g)", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 20, carbs: 8, fat: 10 } },
  { name: "Crab Curry", nameKn: "ಏಡಿ ಸಾರು", brand: "Home", category: "Non-Veg", calories: 230, unit: "1 bowl (200g)", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 22, carbs: 6, fat: 12 } },
  { name: "Fish Tikka", nameKn: "ಫಿಶ್ ಟಿಕ್ಕಾ", brand: "Restaurant", category: "Non-Veg", calories: 210, unit: "4 pieces (150g)", tags: ["High Protein", "Low Carb", "Healthy"], color: "emerald", macros: { protein: 26, carbs: 5, fat: 9 } },
  { name: "Surmai Fry", nameKn: "ಸುರ್ಮಾಯ್ ಫ್ರೈ", brand: "Home/Restaurant", category: "Non-Veg", calories: 240, unit: "1 piece (150g)", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 30, carbs: 4, fat: 12 } },
  { name: "Rohu Fish Curry", nameKn: "ರೋಹು ಮೀನು ಸಾರು", brand: "Home", category: "Non-Veg", calories: 210, unit: "1 bowl (200g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 24, carbs: 6, fat: 10 } },
  { name: "Tandoori Fish", nameKn: "ತಂದೂರಿ ಮೀನು", brand: "Restaurant", category: "Non-Veg", calories: 185, unit: "1 serving (150g)", tags: ["High Protein", "Low Carb", "Healthy"], color: "emerald", macros: { protein: 27, carbs: 5, fat: 6 } },
  { name: "Goan Fish Curry", nameKn: "ಗೋವಾ ಮೀನು ಸಾರು", brand: "Home/Restaurant", category: "Non-Veg", calories: 260, unit: "1 bowl (200ml)", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 22, carbs: 8, fat: 15 } },
  { name: "Clam Masala", nameKn: "ತಿಸ್ರ್ಯಾ ಮಸಾಲ", brand: "Home", category: "Non-Veg", calories: 190, unit: "1 bowl (150g)", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 20, carbs: 8, fat: 8 } },

  // --- MORE NON-VEG ---
  { name: "Egg White (Boiled)", nameKn: "ಮೊಟ್ಟೆ ಬಿಳಿ", brand: "Home", category: "Non-Veg", calories: 17, unit: "1 egg white", tags: ["Super Food", "High Protein", "Zero Fat"], color: "emerald", macros: { protein: 4, carbs: 0, fat: 0 } },
  { name: "Boiled Eggs (2 nos)", nameKn: "ಬೇಯಿಸಿದ ಮೊಟ್ಟೆ", brand: "Home", category: "Non-Veg", calories: 155, unit: "2 eggs (100g)", tags: ["Super Food", "High Protein", "Good Fats"], color: "emerald", macros: { protein: 13, carbs: 1, fat: 11 } },
  { name: "Chicken Curry (Home)", nameKn: "ಚಿಕನ್ ಸಾರು", brand: "Home", category: "Non-Veg", calories: 280, unit: "1 bowl (200g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 28, carbs: 8, fat: 14 } },
  { name: "Chicken 65", nameKn: "ಚಿಕನ್ 65", brand: "Restaurant", category: "Non-Veg", calories: 320, unit: "6 pieces (150g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 26, carbs: 16, fat: 16 } },
  { name: "Chicken Kebab", nameKn: "ಚಿಕನ್ ಕಬಾಬ್", brand: "Restaurant", category: "Non-Veg", calories: 220, unit: "2 pieces (120g)", tags: ["High Protein", "Low Carb", "Healthy"], color: "emerald", macros: { protein: 24, carbs: 6, fat: 10 } },
  { name: "Seekh Kebab", nameKn: "ಸೀಖ್ ಕಬಾಬ್", brand: "Restaurant", category: "Non-Veg", calories: 240, unit: "2 pieces (120g)", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 22, carbs: 8, fat: 13 } },
  { name: "Mutton Curry", nameKn: "ಮಟನ್ ಸಾರು", brand: "Home/Restaurant", category: "Non-Veg", calories: 310, unit: "1 bowl (150g)", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 26, carbs: 6, fat: 20 } },
  { name: "Keema Paratha", nameKn: "ಕೀಮಾ ಪರಾಠ", brand: "Restaurant", category: "Non-Veg", calories: 320, unit: "1 piece (120g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 16, carbs: 32, fat: 14 } },
  { name: "Egg Fried Rice", nameKn: "ಮೊಟ್ಟೆ ಫ್ರೈಡ್ ರೈಸ್", brand: "Restaurant", category: "Non-Veg", calories: 350, unit: "1 plate (250g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 12, carbs: 56, fat: 9 } },
  { name: "Chicken Lollipop", nameKn: "ಚಿಕನ್ ಲಾಲಿಪಾಪ್", brand: "Restaurant", category: "Non-Veg", calories: 280, unit: "4 pieces (150g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 20, carbs: 12, fat: 16 } },
  { name: "Chicken Shawarma", nameKn: "ಚಿಕನ್ ಶಾವರ್ಮ", brand: "Restaurant", category: "Non-Veg", calories: 380, unit: "1 roll (200g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 24, carbs: 40, fat: 13 } },
  { name: "Chicken Malai Tikka", nameKn: "ಚಿಕನ್ ಮಲಾಯಿ ಟಿಕ್ಕಾ", brand: "Restaurant", category: "Non-Veg", calories: 260, unit: "4 pieces (150g)", tags: ["High Protein", "Low Carb"], color: "emerald", macros: { protein: 28, carbs: 4, fat: 14 } },
  { name: "Mutton Seekh Kebab", nameKn: "ಮಟನ್ ಸೀಖ್ ಕಬಾಬ್", brand: "Restaurant", category: "Non-Veg", calories: 280, unit: "2 pieces (120g)", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 24, carbs: 6, fat: 18 } },
  { name: "Prawn Koliwada", nameKn: "ಕೋಳಿವಾಡ ಚಿಂಗಡಿ", brand: "Restaurant", category: "Non-Veg", calories: 290, unit: "6 pieces (150g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 22, carbs: 14, fat: 15 } },

  // --- SWEETS & DESSERTS ---
  { name: "Sooji Halwa", nameKn: "ರವಾ ಹಲ್ವ", brand: "Home", category: "Sweets", calories: 310, unit: "1 bowl (100g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 52, fat: 10 } },
  { name: "Carrot Halwa", nameKn: "ಗಾಜರ್ ಹಲ್ವ", brand: "Home/Mithai", category: "Sweets", calories: 290, unit: "1 bowl (100g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 50, fat: 9 } },
  { name: "Motichoor Ladoo", nameKn: "ಮೋತಿಚೂರ್ ಲಡ್ಡು", brand: "Mithai", category: "Sweets", calories: 200, unit: "1 piece (50g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3, carbs: 38, fat: 5 } },
  { name: "Boondi Ladoo", nameKn: "ಬೂಂದಿ ಲಡ್ಡು", brand: "Mithai", category: "Sweets", calories: 210, unit: "1 piece (50g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 37, fat: 6 } },
  { name: "Rava Ladoo", nameKn: "ರವಾ ಲಡ್ಡು", brand: "Home/Mithai", category: "Sweets", calories: 170, unit: "1 piece (40g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3, carbs: 28, fat: 6 } },
  { name: "Til Ladoo", nameKn: "ಎಳ್ಳು ಲಡ್ಡು", brand: "Home", category: "Sweets", calories: 185, unit: "1 piece (40g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 4, carbs: 26, fat: 8 } },
  { name: "Plain Barfi", nameKn: "ಬರ್ಫಿ", brand: "Mithai", category: "Sweets", calories: 190, unit: "1 piece (50g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 5, carbs: 30, fat: 7 } },
  { name: "Milk Peda", nameKn: "ಪೇಡ", brand: "Mithai", category: "Sweets", calories: 120, unit: "1 piece (30g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 3, carbs: 20, fat: 4 } },
  { name: "Sandesh", nameKn: "ಸಂದೇಶ್", brand: "Mithai", category: "Sweets", calories: 130, unit: "1 piece (40g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 4, carbs: 20, fat: 4 } },
  { name: "Phirni", nameKn: "ಫಿರ್ನಿ", brand: "Home/Restaurant", category: "Sweets", calories: 200, unit: "1 bowl (150g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 5, carbs: 34, fat: 5 } },
  { name: "Basundi", nameKn: "ಬಾಸುಂದಿ", brand: "Home", category: "Sweets", calories: 280, unit: "1 bowl (150g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 8, carbs: 42, fat: 9 } },
  { name: "Malai Kulfi", nameKn: "ಮಲಾಯಿ ಕುಲ್ಫಿ", brand: "Street/Restaurant", category: "Sweets", calories: 180, unit: "1 stick (80g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 4, carbs: 26, fat: 7 } },
  { name: "Mango Kulfi", nameKn: "ಮಾವಿನ ಕುಲ್ಫಿ", brand: "Street/Restaurant", category: "Sweets", calories: 175, unit: "1 stick (80g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 3, carbs: 28, fat: 6 } },
  { name: "Vanilla Ice Cream", nameKn: "ವೆನಿಲ್ಲಾ ಐಸ್ ಕ್ರೀಮ್", brand: "Amul", category: "Sweets", calories: 145, unit: "1 scoop (75g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3, carbs: 20, fat: 6 } },
  { name: "Chocolate Ice Cream", nameKn: "ಚಾಕಲೇಟ್ ಐಸ್ ಕ್ರೀಮ್", brand: "Amul", category: "Sweets", calories: 160, unit: "1 scoop (75g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 3, carbs: 22, fat: 7 } },
  { name: "Payasam", nameKn: "ಪಾಯಸ", brand: "Home", category: "Sweets", calories: 220, unit: "1 bowl (150g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 5, carbs: 38, fat: 6 } },
  { name: "Malpua", nameKn: "ಮಾಲ್ಪುವ", brand: "Home/Restaurant", category: "Sweets", calories: 350, unit: "2 pieces (100g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 6, carbs: 56, fat: 12 } },

  // --- DAIRY & BEVERAGES ---
  { name: "Paneer (Full Fat)", nameKn: "ಪೂರ್ಣ ಕೊಬ್ಬಿನ ಪನೀರ್", brand: "Amul", category: "Daily Use", calories: 260, unit: "100g", tags: ["High Protein", "Good Fats", "Calcium"], color: "emerald", macros: { protein: 18, carbs: 4, fat: 20 } },
  { name: "Khoa / Mawa", nameKn: "ಖೋವಾ / ಮಾವ", brand: "Fresh", category: "Daily Use", calories: 390, unit: "100g", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 14, carbs: 38, fat: 22 } },
  { name: "Condensed Milk", nameKn: "ಕಂಡೆನ್ಸ್ಡ್ ಮಿಲ್ಕ್", brand: "Milkmaid", category: "Daily Use", calories: 65, unit: "1 tbsp (20g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 2, carbs: 11, fat: 2 } },
  { name: "Butter Milk (Plain Chaas)", nameKn: "ಮಜ್ಜಿಗೆ", brand: "Home", category: "Drinks", calories: 55, unit: "1 glass (250ml)", tags: ["Super Food", "Probiotic", "Digestive"], color: "emerald", macros: { protein: 3, carbs: 6, fat: 2 } },
  { name: "Rose Milk", nameKn: "ರೋಸ್ ಮಿಲ್ಕ್", brand: "Home/Restaurant", category: "Drinks", calories: 180, unit: "1 glass (250ml)", tags: ["High Sugar", "Avoid"], color: "red", macros: { protein: 6, carbs: 30, fat: 4 } },
  { name: "Shrikhand Mango", nameKn: "ಆಮ್ ಶ್ರೀಖಂಡ", brand: "Amul", category: "Sweets", calories: 220, unit: "1 bowl (100g)", tags: ["Avoid", "High Sugar"], color: "red", macros: { protein: 7, carbs: 36, fat: 6 } },
  { name: "Plain Lassi", nameKn: "ಲಸ್ಸಿ", brand: "Home/Restaurant", category: "Drinks", calories: 190, unit: "1 glass (300ml)", tags: ["Probiotic", "Calcium"], color: "yellow", macros: { protein: 8, carbs: 28, fat: 5 } },
  { name: "Cold Coffee", nameKn: "ಕೋಲ್ಡ್ ಕಾಫಿ", brand: "Cafe", category: "Drinks", calories: 220, unit: "1 glass (300ml)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 7, carbs: 32, fat: 7 } },
  { name: "Chocolate Milk", nameKn: "ಚಾಕಲೇಟ್ ಮಿಲ್ಕ್", brand: "Amul", category: "Drinks", calories: 200, unit: "1 glass (250ml)", tags: ["High Sugar"], color: "yellow", macros: { protein: 8, carbs: 30, fat: 6 } },
  { name: "Horlicks", nameKn: "ಹಾರ್ಲಿಕ್ಸ್", brand: "GSK", category: "Drinks", calories: 160, unit: "1 glass (200ml)", tags: ["Vitamins", "Calcium"], color: "yellow", macros: { protein: 6, carbs: 26, fat: 3 } },
  { name: "Bournvita Milk", nameKn: "ಬೋರ್ನ್‌ವಿಟ", brand: "Cadbury", category: "Drinks", calories: 160, unit: "1 glass (200ml)", tags: ["High Sugar", "Vitamins"], color: "yellow", macros: { protein: 6, carbs: 28, fat: 3 } },
  { name: "Nescafe 3-in-1", nameKn: "ನೆಸ್ಕಾಫೆ", brand: "Nestle", category: "Drinks", calories: 70, unit: "1 sachet (18g)", tags: ["Avoid", "High Sugar", "Heavily Processed"], color: "red", macros: { protein: 1, carbs: 13, fat: 2 } },
  { name: "Nimbu Pani (Sweet)", nameKn: "ನಿಂಬೆ ಶರಬತ್", brand: "Home", category: "Drinks", calories: 80, unit: "1 glass (250ml)", tags: ["High Sugar"], color: "yellow", macros: { protein: 0, carbs: 20, fat: 0 } },
  { name: "Coconut Milk", nameKn: "ತೆಂಗಿನ ಹಾಲು", brand: "Fresh", category: "Daily Use", calories: 230, unit: "100ml", tags: ["Good Fats", "Dairy Free"], color: "yellow", macros: { protein: 2, carbs: 6, fat: 23 } },
  { name: "Green Smoothie", nameKn: "ಹಸಿರು ಸ್ಮೂಥಿ", brand: "Home", category: "Drinks", calories: 160, unit: "1 glass (300ml)", tags: ["Super Food", "Vitamins", "Healthy"], color: "emerald", macros: { protein: 4, carbs: 34, fat: 2 } },
  { name: "Protein Smoothie", nameKn: "ಪ್ರೋಟೀನ್ ಸ್ಮೂಥಿ", brand: "Home", category: "Drinks", calories: 280, unit: "1 glass (300ml)", tags: ["Super Food", "High Protein", "Healthy"], color: "emerald", macros: { protein: 30, carbs: 28, fat: 5 } },
  { name: "Jaljeera Drink", nameKn: "ಜಲ್ಜೀರಾ", brand: "Home/Street", category: "Drinks", calories: 25, unit: "1 glass (250ml)", tags: ["Digestive", "Low Calorie"], color: "emerald", macros: { protein: 0, carbs: 6, fat: 0 } },

  // --- GRAINS, LEGUMES & PULSES ---
  { name: "Moth Beans / Matki (Boiled)", nameKn: "ಮಟಕಿ", brand: "Home", category: "Grains", calories: 155, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 10, carbs: 26, fat: 1 } },
  { name: "Lobia / Black-Eyed Peas", nameKn: "ಲೋಬಿಯಾ", brand: "Home", category: "Grains", calories: 160, unit: "1 bowl (150g)", tags: ["High Protein", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 10, carbs: 26, fat: 1 } },
  { name: "Horsegram / Kulith (Boiled)", nameKn: "ಹುರಳಿ", brand: "Home", category: "Grains", calories: 175, unit: "1 bowl (150g)", tags: ["Super Food", "High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 14, carbs: 28, fat: 1 } },
  { name: "Mixed Sprouts (Boiled)", nameKn: "ಮಿಕ್ಸ್ ಮೊಳಕೆ", brand: "Home", category: "Grains", calories: 90, unit: "1 bowl (100g)", tags: ["Super Food", "High Protein", "Healthy"], color: "emerald", macros: { protein: 6, carbs: 16, fat: 1 } },
  { name: "Vatana / Dried Green Peas (Boiled)", nameKn: "ವಟಾಣ", brand: "Home", category: "Grains", calories: 170, unit: "1 bowl (150g)", tags: ["High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 11, carbs: 30, fat: 1 } },
  { name: "Dalia / Broken Wheat Porridge", nameKn: "ದಲಿಯಾ", brand: "Home", category: "Grains", calories: 240, unit: "1 bowl (200g)", tags: ["Super Food", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 7, carbs: 48, fat: 2 } },
  { name: "Barley / Jau (Cooked)", nameKn: "ಯವ ಧಾನ್ಯ", brand: "Home", category: "Grains", calories: 220, unit: "1 bowl (200g)", tags: ["Super Food", "Fiber Rich", "Healthy"], color: "emerald", macros: { protein: 7, carbs: 44, fat: 1 } },
  { name: "Foxtail Millet / Kangni (Cooked)", nameKn: "ನವಣೆ", brand: "Home", category: "Grains", calories: 230, unit: "1 bowl (200g)", tags: ["Super Food", "Gluten Free", "Healthy"], color: "emerald", macros: { protein: 6, carbs: 44, fat: 2 } },
  { name: "Kodo Millet (Cooked)", nameKn: "ಹಾರಕ", brand: "Home", category: "Grains", calories: 215, unit: "1 bowl (200g)", tags: ["Super Food", "Gluten Free", "Fiber Rich"], color: "emerald", macros: { protein: 6, carbs: 42, fat: 2 } },
  { name: "Amaranth / Rajgira (Cooked)", nameKn: "ರಾಜಗಿರ", brand: "Home", category: "Grains", calories: 250, unit: "1 bowl (200g)", tags: ["Super Food", "High Protein", "Calcium"], color: "emerald", macros: { protein: 9, carbs: 46, fat: 4 } },

  // --- SALADS & HEALTHY BOWLS ---
  { name: "Greek Salad", brand: "Restaurant", category: "Salads", calories: 130, unit: "1 bowl (200g)", tags: ["Healthy", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 4, carbs: 10, fat: 8 } },
  { name: "Caesar Salad (No Croutons)", brand: "Restaurant", category: "Salads", calories: 160, unit: "1 bowl (200g)", tags: ["Healthy", "High Protein"], color: "emerald", macros: { protein: 8, carbs: 6, fat: 12 } },
  { name: "Chicken Caesar Salad", brand: "Restaurant", category: "Salads", calories: 280, unit: "1 bowl (250g)", tags: ["High Protein", "Healthy"], color: "emerald", macros: { protein: 26, carbs: 8, fat: 16 } },
  { name: "Kachumber Salad", nameKn: "ಕಚಂಬರ್", brand: "Home", category: "Salads", calories: 50, unit: "1 bowl (150g)", tags: ["Super Food", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 1 } },
  { name: "Kosambari (Moong Dal Salad)", nameKn: "ಕೋಸಂಬರಿ", brand: "Home", category: "Salads", calories: 120, unit: "1 bowl (150g)", tags: ["High Protein", "Super Food", "Healthy"], color: "emerald", macros: { protein: 7, carbs: 18, fat: 2 } },
  { name: "Cabbage Salad (Raw)", nameKn: "ಎಲೆಕೋಸು ಸಲಾಡ್", brand: "Home", category: "Salads", calories: 45, unit: "1 bowl (150g)", tags: ["Super Food", "Low Calorie", "Fiber Rich"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 0 } },
  { name: "Grilled Chicken Bowl", brand: "Restaurant", category: "Salads", calories: 380, unit: "1 bowl (300g)", tags: ["High Protein", "Healthy", "Super Food"], color: "emerald", macros: { protein: 36, carbs: 30, fat: 12 } },
  { name: "Egg Salad", brand: "Home", category: "Salads", calories: 200, unit: "1 bowl (200g)", tags: ["High Protein", "Good Fats"], color: "emerald", macros: { protein: 14, carbs: 6, fat: 14 } },
  { name: "Quinoa Salad", brand: "Home", category: "Salads", calories: 220, unit: "1 bowl (200g)", tags: ["Super Food", "High Protein", "Healthy"], color: "emerald", macros: { protein: 8, carbs: 36, fat: 6 } },
  { name: "Avocado Toast", brand: "Cafe", category: "International", calories: 190, unit: "1 slice (100g)", tags: ["Super Food", "Good Fats", "Healthy"], color: "emerald", macros: { protein: 5, carbs: 22, fat: 10 } },

  // --- MORE VEGETABLES ---
  { name: "Cluster Beans / Gawar", nameKn: "ಗೊರ್ಚಿಕ್ಕಿ", brand: "Fresh", category: "Vegetables", calories: 30, unit: "100g", tags: ["Super Food", "Low Calorie", "Fiber Rich"], color: "emerald", macros: { protein: 2, carbs: 5, fat: 0 } },
  { name: "Ridge Gourd / Turai", nameKn: "ಹೀರೆಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 22, unit: "100g", tags: ["Super Food", "Low Calorie", "Hydrating"], color: "emerald", macros: { protein: 1, carbs: 4, fat: 0 } },
  { name: "Snake Gourd / Chichinda", nameKn: "ಪಡ್ವಲಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 18, unit: "100g", tags: ["Low Calorie", "Hydrating", "Fiber Rich"], color: "emerald", macros: { protein: 1, carbs: 4, fat: 0 } },
  { name: "Ash Gourd / White Pumpkin", nameKn: "ಬೂದು ಕುಂಬಳ", brand: "Fresh", category: "Vegetables", calories: 14, unit: "100g", tags: ["Super Food", "Low Calorie", "Hydrating"], color: "emerald", macros: { protein: 0, carbs: 3, fat: 0 } },
  { name: "Yam / Suran (Boiled)", nameKn: "ಸುರಣ", brand: "Fresh", category: "Vegetables", calories: 118, unit: "100g", tags: ["Carbs Rich", "Fiber Rich", "Vitamins"], color: "yellow", macros: { protein: 2, carbs: 28, fat: 0 } },
  { name: "Taro Root / Arbi (Boiled)", nameKn: "ಕೇಸವೇ", brand: "Fresh", category: "Vegetables", calories: 112, unit: "100g", tags: ["Carbs Rich", "Fiber Rich"], color: "yellow", macros: { protein: 1, carbs: 26, fat: 0 } },
  { name: "Raw Banana / Plantain", nameKn: "ಕಚ್ಚಾ ಬಾಳೆಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 110, unit: "1 medium (120g)", tags: ["Carbs Rich", "Fiber Rich", "Potassium"], color: "yellow", macros: { protein: 1, carbs: 28, fat: 0 } },
  { name: "Raw Jackfruit / Kathal", nameKn: "ಹಲಸಿನ ಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 95, unit: "100g", tags: ["Fiber Rich", "Vitamins"], color: "yellow", macros: { protein: 2, carbs: 24, fat: 0 } },
  { name: "Bitter Gourd / Karela", nameKn: "ಹಾಗಲಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 19, unit: "100g", tags: ["Super Food", "Low Calorie", "Diabetic Friendly"], color: "emerald", macros: { protein: 1, carbs: 4, fat: 0 } },
  { name: "Drumstick / Moringa", nameKn: "ನುಗ್ಗೆಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 37, unit: "100g", tags: ["Super Food", "Iron Rich", "Vitamins"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 0 } },
  { name: "Capsicum / Bell Pepper", nameKn: "ದೊಣ್ಣೆ ಮೆಣಸಿನಕಾಯಿ", brand: "Fresh", category: "Vegetables", calories: 30, unit: "1 medium (100g)", tags: ["Super Food", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 6, fat: 0 } },
  { name: "Zucchini", brand: "Fresh", category: "Vegetables", calories: 17, unit: "100g", tags: ["Low Calorie", "Hydrating", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 3, fat: 0 } },
  { name: "Baby Corn", nameKn: "ಬೇಬಿ ಕಾರ್ನ್", brand: "Fresh", category: "Vegetables", calories: 26, unit: "100g", tags: ["Low Calorie", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 2, carbs: 6, fat: 0 } },
  { name: "Broccoli (Raw)", brand: "Fresh", category: "Vegetables", calories: 34, unit: "100g", tags: ["Super Food", "High Protein", "Vitamins"], color: "emerald", macros: { protein: 3, carbs: 7, fat: 0 } },
  { name: "Coriander Seeds / Dhania", nameKn: "ಕೊತ್ತಂಬರಿ ಬೀಜ", brand: "Home", category: "Vegetables", calories: 9, unit: "1 tsp (3g)", tags: ["Healthy", "Digestive"], color: "emerald", macros: { protein: 0, carbs: 2, fat: 0 } },

  // --- MORE FRUITS ---
  { name: "Muskmelon / Kharbuja", nameKn: "ಕರ್ಬೂಜ", brand: "Fresh", category: "Fruits", calories: 68, unit: "1 bowl (200g)", tags: ["Hydrating", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 2, carbs: 16, fat: 0 } },
  { name: "Fig (Fresh)", nameKn: "ಅಂಜೂರ (ತಾಜಾ)", brand: "Fresh", category: "Fruits", calories: 55, unit: "2 figs (80g)", tags: ["Fiber Rich", "Calcium", "Iron Rich"], color: "emerald", macros: { protein: 1, carbs: 14, fat: 0 } },
  { name: "Blueberries", brand: "Fresh", category: "Fruits", calories: 57, unit: "1 cup (100g)", tags: ["Super Food", "Antioxidant", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 14, fat: 0 } },
  { name: "Raspberries", brand: "Fresh", category: "Fruits", calories: 52, unit: "1 cup (100g)", tags: ["Super Food", "Fiber Rich", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 12, fat: 1 } },
  { name: "Blackberries", brand: "Fresh", category: "Fruits", calories: 43, unit: "1 cup (100g)", tags: ["Super Food", "Antioxidant", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 10, fat: 1 } },
  { name: "Custard Apple / Sitaphal", nameKn: "ಸೀತಾಫಲ", brand: "Fresh", category: "Fruits", calories: 180, unit: "1 medium (150g)", tags: ["Vitamins", "Calcium", "Energy"], color: "yellow", macros: { protein: 3, carbs: 42, fat: 1 } },
  { name: "Wood Apple / Bel Fruit", nameKn: "ಬೇಲ", brand: "Fresh", category: "Fruits", calories: 137, unit: "100g", tags: ["Super Food", "Digestive", "Vitamins"], color: "yellow", macros: { protein: 2, carbs: 32, fat: 0 } },
  { name: "Star Fruit / Carambola", nameKn: "ಕಮರಕ್", brand: "Fresh", category: "Fruits", calories: 31, unit: "1 fruit (100g)", tags: ["Low Calorie", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 1, carbs: 7, fat: 0 } },
  { name: "Tamarind (Fresh)", nameKn: "ಹುಣಸೆ", brand: "Fresh", category: "Fruits", calories: 239, unit: "100g", tags: ["Iron Rich", "Vitamins"], color: "yellow", macros: { protein: 3, carbs: 62, fat: 1 } },
  { name: "Coconut Water (Packaged)", nameKn: "ತೆಂಗಿನ ನೀರು (ಪ್ಯಾಕ್)", brand: "Paper Boat", category: "Drinks", calories: 70, unit: "1 bottle (350ml)", tags: ["Hydrating", "Low Calorie", "Electrolytes"], color: "emerald", macros: { protein: 0, carbs: 17, fat: 0 } },
  { name: "Dragon Fruit", nameKn: "ಡ್ರಾಗನ್ ಫ್ರೂಟ್", brand: "Fresh", category: "Fruits", calories: 120, unit: "1 medium (200g)", tags: ["Super Food", "Antioxidant", "Fiber Rich"], color: "emerald", macros: { protein: 2, carbs: 29, fat: 1 } },
  { name: "Passion Fruit", nameKn: "ಪ್ಯಾಶನ್ ಫ್ರೂಟ್", brand: "Fresh", category: "Fruits", calories: 97, unit: "100g", tags: ["Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 2, carbs: 23, fat: 0 } },
  { name: "Persimmon / Japani Phal", nameKn: "ಜಪಾನಿ ಹಣ್ಣು", brand: "Fresh", category: "Fruits", calories: 118, unit: "1 fruit (168g)", tags: ["Vitamins", "Antioxidant", "Fiber Rich"], color: "yellow", macros: { protein: 1, carbs: 31, fat: 0 } },
  { name: "Loquat", brand: "Fresh", category: "Fruits", calories: 47, unit: "3 fruits (100g)", tags: ["Low Calorie", "Vitamins", "Fiber Rich"], color: "emerald", macros: { protein: 0, carbs: 12, fat: 0 } },
  { name: "Mulberry", nameKn: "ಹಿಪ್ಪುನೇರಳೆ", brand: "Fresh", category: "Fruits", calories: 43, unit: "1 cup (100g)", tags: ["Super Food", "Antioxidant", "Iron Rich"], color: "emerald", macros: { protein: 1, carbs: 10, fat: 0 } },

  // --- INDIAN STREET FOOD & SNACKS ---
  { name: "Vada Pav", nameKn: "ವಡಾ ಪಾವ್", brand: "Street", category: "Indian Chats", calories: 290, unit: "1 piece", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 7, carbs: 46, fat: 9 } },
  { name: "Pav Bhaji (with Pav)", nameKn: "ಪಾವ್ ಭಾಜಿ", brand: "Street/Restaurant", category: "Indian Chats", calories: 480, unit: "1 plate (2 pavs)", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 12, carbs: 72, fat: 16 } },
  { name: "Dabeli", nameKn: "ದಾಬೇಲಿ", brand: "Street", category: "Indian Chats", calories: 250, unit: "1 piece", tags: ["Avoid", "High Sugar", "Carbs Rich"], color: "red", macros: { protein: 6, carbs: 40, fat: 8 } },
  { name: "Raj Kachori", nameKn: "ರಾಜ್ ಕಚೋರಿ", brand: "Street/Restaurant", category: "Indian Chats", calories: 320, unit: "1 piece", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 9, carbs: 48, fat: 10 } },
  { name: "Dahi Puri (6 pcs)", nameKn: "ದಹಿ ಪುರಿ", brand: "Street", category: "Indian Chats", calories: 220, unit: "6 pieces", tags: ["High Sugar", "Carbs Rich"], color: "yellow", macros: { protein: 6, carbs: 36, fat: 6 } },
  { name: "Sev Puri (4 pcs)", nameKn: "ಸೇವ್ ಪುರಿ", brand: "Street", category: "Indian Chats", calories: 200, unit: "4 pieces", tags: ["Carbs Rich", "Spicy"], color: "yellow", macros: { protein: 4, carbs: 32, fat: 6 } },
  { name: "Misal Pav", nameKn: "ಮಿಸಳ್ ಪಾವ್", brand: "Restaurant", category: "Indian Chats", calories: 380, unit: "1 plate", tags: ["High Protein", "Spicy", "Carbs Rich"], color: "yellow", macros: { protein: 14, carbs: 58, fat: 10 } },
  { name: "Corn Chaat", nameKn: "ಮೆಕ್ಕೆ ಜೋಳ ಚಾಟ್", brand: "Street", category: "Indian Chats", calories: 180, unit: "1 bowl (150g)", tags: ["Healthy", "Fiber Rich"], color: "yellow", macros: { protein: 4, carbs: 34, fat: 4 } },
  { name: "Bread Pakora (2 pcs)", nameKn: "ಬ್ರೆಡ್ ಪಕೋಡ", brand: "Street", category: "Snacks", calories: 280, unit: "2 pieces (120g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 7, carbs: 36, fat: 12 } },
  { name: "Onion Pakora (4 pcs)", nameKn: "ಈರುಳ್ಳಿ ಪಕೋಡ", brand: "Home/Street", category: "Snacks", calories: 220, unit: "4 pieces (100g)", tags: ["Avoid", "High Fat"], color: "red", macros: { protein: 5, carbs: 28, fat: 10 } },
  { name: "Methi Pakora (4 pcs)", nameKn: "ಮೆಂತ್ಯ ಪಕೋಡ", brand: "Home", category: "Snacks", calories: 200, unit: "4 pieces (100g)", tags: ["Avoid", "High Fat"], color: "red", macros: { protein: 5, carbs: 26, fat: 9 } },
  { name: "Paneer Pakora (3 pcs)", nameKn: "ಪನೀರ್ ಪಕೋಡ", brand: "Home/Restaurant", category: "Snacks", calories: 280, unit: "3 pieces (120g)", tags: ["High Protein", "High Fat"], color: "yellow", macros: { protein: 14, carbs: 20, fat: 16 } },
  { name: "Plain Kachori", nameKn: "ಕಚೋರಿ", brand: "Street", category: "Snacks", calories: 270, unit: "1 piece (80g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 5, carbs: 36, fat: 12 } },
  { name: "Moong Dal Kachori", nameKn: "ಮೂಂಗ್ ದಾಲ್ ಕಚೋರಿ", brand: "Street", category: "Snacks", calories: 260, unit: "1 piece (80g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 7, carbs: 34, fat: 11 } },
  { name: "Chivda / Poha Mix", nameKn: "ಚಿವ್ಡ", brand: "Haldirams", category: "Snacks", calories: 220, unit: "1 cup (50g)", tags: ["Light Snack", "Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 34, fat: 8 } },
  { name: "Roasted Makhana", nameKn: "ಮಖಾನ", brand: "Generic", category: "Snacks", calories: 105, unit: "1 cup (30g)", tags: ["Super Food", "Healthy Snack", "Low Fat"], color: "emerald", macros: { protein: 4, carbs: 20, fat: 1 } },
  { name: "Murukku (2 pcs)", nameKn: "ಮುರುಕ್ಕು", brand: "Home/Local", category: "Snacks", calories: 185, unit: "2 pieces (40g)", tags: ["Avoid", "High Fat"], color: "red", macros: { protein: 3, carbs: 26, fat: 8 } },
  { name: "Chana Jor Garam", nameKn: "ಚನಾ ಜೋರ್ ಗರಮ್", brand: "Haldirams", category: "Snacks", calories: 180, unit: "1 cup (50g)", tags: ["High Protein", "Healthy Snack", "Spicy"], color: "yellow", macros: { protein: 8, carbs: 30, fat: 4 } },

  // --- INDO-CHINESE & FUSION ---
  { name: "Veg Manchurian", nameKn: "ವೆಜ್ ಮಂಚೂರಿ", brand: "Restaurant", category: "Fast Food", calories: 280, unit: "1 plate (200g)", tags: ["Avoid", "Heavily Processed", "High Fat"], color: "red", macros: { protein: 6, carbs: 40, fat: 10 } },
  { name: "Chicken Manchurian (Dry)", nameKn: "ಚಿಕನ್ ಮಂಚೂರಿ", brand: "Restaurant", category: "Fast Food", calories: 320, unit: "1 plate (200g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 26, carbs: 20, fat: 14 } },
  { name: "Hakka Noodles (Veg)", nameKn: "ವೆಜ್ ಹಕ್ಕಾ ನೂಡಲ್ಸ್", brand: "Restaurant", category: "Fast Food", calories: 340, unit: "1 plate (250g)", tags: ["Avoid", "Carbs Rich", "Heavily Processed"], color: "red", macros: { protein: 8, carbs: 56, fat: 10 } },
  { name: "Chicken Hakka Noodles", nameKn: "ಚಿಕನ್ ಹಕ್ಕಾ ನೂಡಲ್ಸ್", brand: "Restaurant", category: "Fast Food", calories: 390, unit: "1 plate (250g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 22, carbs: 54, fat: 10 } },
  { name: "Veg Spring Rolls (2 pcs)", nameKn: "ವೆಜ್ ಸ್ಪ್ರಿಂಗ್ ರೋಲ್ಸ್", brand: "Restaurant", category: "Fast Food", calories: 240, unit: "2 pieces (120g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 5, carbs: 34, fat: 10 } },
  { name: "Schezwan Fried Rice", nameKn: "ಶೆಜ್ವಾನ್ ಫ್ರೈಡ್ ರೈಸ್", brand: "Restaurant", category: "Fast Food", calories: 370, unit: "1 plate (250g)", tags: ["Avoid", "Spicy", "Carbs Rich"], color: "red", macros: { protein: 8, carbs: 60, fat: 10 } },
  { name: "Paneer Chilli (Dry)", nameKn: "ಪನೀರ್ ಚಿಲ್ಲಿ", brand: "Restaurant", category: "Fast Food", calories: 310, unit: "1 plate (200g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 14, carbs: 22, fat: 18 } },
  { name: "Chicken Lollipop Gravy", nameKn: "ಚಿಕನ್ ಲಾಲಿಪಾಪ್ ಗ್ರೇವಿ", brand: "Restaurant", category: "Non-Veg", calories: 320, unit: "1 plate (200g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 22, carbs: 18, fat: 16 } },
  { name: "Tandoori Momos (6 pcs)", nameKn: "ತಂದೂರಿ ಮೋಮೋಸ್", brand: "Restaurant", category: "Fast Food", calories: 290, unit: "6 pieces (150g)", tags: ["High Protein", "Spicy"], color: "yellow", macros: { protein: 12, carbs: 38, fat: 10 } },

  // --- INTERNATIONAL FOODS ---
  { name: "Salmon Sushi Roll (6 pcs)", brand: "Restaurant", category: "International", calories: 300, unit: "6 pieces (180g)", tags: ["High Protein", "Good Fats", "Healthy"], color: "emerald", macros: { protein: 16, carbs: 44, fat: 7 } },
  { name: "Chicken Tacos (2 pcs)", brand: "Restaurant", category: "International", calories: 370, unit: "2 tacos (180g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 22, carbs: 40, fat: 12 } },
  { name: "Veg Burrito Bowl", brand: "Restaurant", category: "International", calories: 440, unit: "1 bowl (350g)", tags: ["High Protein", "Fiber Rich"], color: "yellow", macros: { protein: 14, carbs: 70, fat: 12 } },
  { name: "Hummus with Pita", brand: "Restaurant", category: "International", calories: 240, unit: "1 serving (100g)", tags: ["High Protein", "Good Fats", "Healthy"], color: "emerald", macros: { protein: 8, carbs: 28, fat: 11 } },
  { name: "Falafel (3 pcs)", brand: "Restaurant", category: "International", calories: 220, unit: "3 pieces (90g)", tags: ["High Protein", "Healthy", "Fiber Rich"], color: "emerald", macros: { protein: 8, carbs: 26, fat: 10 } },
  { name: "Pita Bread", brand: "Bakery", category: "International", calories: 165, unit: "1 piece (60g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 6, carbs: 32, fat: 1 } },
  { name: "Pasta with Tomato Sauce", brand: "Restaurant", category: "International", calories: 320, unit: "1 plate (250g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 10, carbs: 58, fat: 6 } },
  { name: "Mac and Cheese (Packaged)", brand: "Generic", category: "International", calories: 260, unit: "1 serving (70g)", tags: ["Avoid", "Heavily Processed", "High Fat"], color: "red", macros: { protein: 9, carbs: 42, fat: 7 } },
  { name: "Chicken Ramen", brand: "Restaurant", category: "International", calories: 380, unit: "1 bowl (400ml)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 18, carbs: 52, fat: 10 } },
  { name: "Kimchi", brand: "Generic", category: "International", calories: 40, unit: "1 cup (150g)", tags: ["Super Food", "Probiotic", "Low Calorie"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 0 } },
  { name: "Pad Thai", brand: "Restaurant", category: "International", calories: 380, unit: "1 plate (250g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 16, carbs: 52, fat: 12 } },
  { name: "Croissant", brand: "Bakery", category: "Bakery Items", calories: 230, unit: "1 piece (55g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 5, carbs: 26, fat: 12 } },
  { name: "Plain Bagel", brand: "Bakery", category: "Bakery Items", calories: 270, unit: "1 piece (100g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 10, carbs: 52, fat: 2 } },
  { name: "Granola Bar", brand: "Generic", category: "Snacks", calories: 190, unit: "1 bar (45g)", tags: ["Healthy Snack", "Fiber Rich", "Energy"], color: "yellow", macros: { protein: 4, carbs: 28, fat: 8 } },
  { name: "Oats Energy Balls", brand: "Home", category: "Snacks", calories: 180, unit: "2 pieces (50g)", tags: ["Super Food", "Healthy Snack", "High Protein"], color: "emerald", macros: { protein: 6, carbs: 22, fat: 8 } },

  // --- FAST FOOD & QUICK BITES ---
  { name: "Veg Patty Burger", nameKn: "ವೆಜ್ ಬರ್ಗರ್", brand: "Restaurant", category: "Fast Food", calories: 320, unit: "1 burger", tags: ["Avoid", "Carbs Rich", "High Fat"], color: "red", macros: { protein: 9, carbs: 48, fat: 11 } },
  { name: "Double Patty Burger", brand: "Restaurant", category: "Fast Food", calories: 550, unit: "1 burger", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 30, carbs: 48, fat: 26 } },
  { name: "Cheese Pizza (1 slice)", nameKn: "ಚೀಸ್ ಪಿಜ್ಜಾ", brand: "Dominos/Pizza Hut", category: "Fast Food", calories: 280, unit: "1 slice (100g)", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 12, carbs: 34, fat: 10 } },
  { name: "Pepperoni Pizza (1 slice)", brand: "Pizza Hut", category: "Fast Food", calories: 310, unit: "1 slice (100g)", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 14, carbs: 34, fat: 13 } },
  { name: "French Fries (Large)", brand: "McDonalds", category: "Fast Food", calories: 490, unit: "1 large (170g)", tags: ["Avoid", "High Fat", "High Calorie"], color: "red", macros: { protein: 6, carbs: 66, fat: 23 } },
  { name: "Onion Rings (Medium)", brand: "Burger King", category: "Fast Food", calories: 280, unit: "1 medium (90g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 4, carbs: 40, fat: 12 } },
  { name: "Hot Dog", brand: "Generic", category: "Fast Food", calories: 290, unit: "1 hot dog (120g)", tags: ["Avoid", "High Fat", "Heavily Processed"], color: "red", macros: { protein: 12, carbs: 26, fat: 16 } },
  { name: "Veg Club Sandwich", nameKn: "ವೆಜ್ ಸ್ಯಾಂಡ್‌ವಿಚ್", brand: "Cafe", category: "Fast Food", calories: 320, unit: "1 sandwich (180g)", tags: ["Healthy", "Carbs Rich"], color: "yellow", macros: { protein: 10, carbs: 48, fat: 10 } },
  { name: "Paneer Sandwich", nameKn: "ಪನೀರ್ ಸ್ಯಾಂಡ್‌ವಿಚ್", brand: "Cafe", category: "Fast Food", calories: 310, unit: "1 sandwich (150g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 14, carbs: 38, fat: 12 } },
  { name: "Corn & Cheese Sandwich", nameKn: "ಕಾರ್ನ್ ಚೀಸ್ ಸ್ಯಾಂಡ್‌ವಿಚ್", brand: "Cafe", category: "Fast Food", calories: 330, unit: "1 sandwich (150g)", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 11, carbs: 44, fat: 13 } },

  // --- FITNESS & HEALTH FOODS ---
  { name: "Casein Protein Shake", brand: "MuscleBlaze", category: "Super Food", calories: 120, unit: "1 scoop (30g)", tags: ["Super Food", "High Protein", "Slow Release"], color: "emerald", macros: { protein: 24, carbs: 4, fat: 1 } },
  { name: "Mass Gainer Shake", brand: "Optimum Nutrition", category: "Super Food", calories: 280, unit: "1 scoop (75g)", tags: ["High Protein", "Carbs Rich", "Energy"], color: "yellow", macros: { protein: 28, carbs: 50, fat: 3 } },
  { name: "BCAA Drink", brand: "Generic", category: "Drinks", calories: 20, unit: "1 serving (7g)", tags: ["Super Food", "High Protein", "Zero Carb"], color: "emerald", macros: { protein: 5, carbs: 0, fat: 0 } },
  { name: "Creatine (in water)", brand: "Generic", category: "Drinks", calories: 0, unit: "1 tsp (5g)", tags: ["Super Food", "Zero Calorie", "Strength"], color: "emerald", macros: { protein: 0, carbs: 0, fat: 0 } },
  { name: "Peanut Chikki", nameKn: "ಶೇಂಗಾ ಚಿಕ್ಕಿ", brand: "Local", category: "Sweets", calories: 130, unit: "1 piece (30g)", tags: ["High Protein", "Good Fats", "Energy"], color: "yellow", macros: { protein: 4, carbs: 20, fat: 4 } },
  { name: "Til Chikki", nameKn: "ಎಳ್ಳು ಚಿಕ್ಕಿ", brand: "Local", category: "Sweets", calories: 140, unit: "1 piece (30g)", tags: ["Good Fats", "Calcium", "Iron Rich"], color: "yellow", macros: { protein: 3, carbs: 18, fat: 7 } },
  { name: "Plain Rice Cakes", brand: "Generic", category: "Snacks", calories: 70, unit: "2 cakes (18g)", tags: ["Healthy Snack", "Low Fat", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 15, fat: 0 } },
  { name: "Oat Cookies (2 pcs)", brand: "Home", category: "Snacks", calories: 140, unit: "2 cookies (30g)", tags: ["Healthy Snack", "Fiber Rich"], color: "yellow", macros: { protein: 3, carbs: 20, fat: 5 } },
  { name: "Ragi Cookies (2 pcs)", nameKn: "ರಾಗಿ ಕುಕೀಸ್", brand: "Home", category: "Snacks", calories: 130, unit: "2 cookies (30g)", tags: ["Healthy Snack", "Fiber Rich", "Calcium"], color: "emerald", macros: { protein: 3, carbs: 20, fat: 4 } },
  { name: "Dark Chocolate (70%+)", nameKn: "ಡಾರ್ಕ್ ಚಾಕಲೇಟ್", brand: "Amul", category: "Chocolates", calories: 120, unit: "2 squares (20g)", tags: ["Super Food", "Antioxidant", "Good Fats"], color: "emerald", macros: { protein: 2, carbs: 8, fat: 9 } },

  // --- MORE NUTS & DRY FRUITS ---
  { name: "Pecan", brand: "Organic", category: "Dry Fruits", calories: 196, unit: "1 oz (28g)", tags: ["Good Fats", "Antioxidant", "Vitamins"], color: "emerald", macros: { protein: 3, carbs: 4, fat: 20 } },
  { name: "Brazil Nuts (3 pcs)", brand: "Organic", category: "Dry Fruits", calories: 185, unit: "3 nuts (30g)", tags: ["Good Fats", "Selenium", "High Protein"], color: "emerald", macros: { protein: 4, carbs: 3, fat: 19 } },
  { name: "Pine Nuts / Chilgoza", nameKn: "ಚಿಲ್ಗೋಜಾ", brand: "Generic", category: "Dry Fruits", calories: 68, unit: "1 tbsp (10g)", tags: ["Good Fats", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 1, fat: 7 } },
  { name: "Sunflower Seeds", nameKn: "ಸೂರ್ಯಕಾಂತಿ ಬೀಜ", brand: "Generic", category: "Dry Fruits", calories: 58, unit: "1 tbsp (10g)", tags: ["Super Food", "Good Fats", "Vitamins"], color: "emerald", macros: { protein: 2, carbs: 2, fat: 5 } },
  { name: "Pumpkin Seeds (Roasted)", nameKn: "ಕುಂಬಳ ಬೀಜ", brand: "Generic", category: "Dry Fruits", calories: 55, unit: "1 tbsp (10g)", tags: ["Super Food", "High Protein", "Zinc"], color: "emerald", macros: { protein: 3, carbs: 2, fat: 4 } },
  { name: "Melon Seeds / Magaz", nameKn: "ಮಗಜ್", brand: "Generic", category: "Dry Fruits", calories: 56, unit: "1 tbsp (10g)", tags: ["Good Fats", "Vitamins", "Healthy"], color: "emerald", macros: { protein: 2, carbs: 2, fat: 5 } },
  { name: "Dry Coconut / Copra", nameKn: "ಕೊಪ್ಪರ", brand: "Fresh", category: "Dry Fruits", calories: 70, unit: "1 tbsp (10g)", tags: ["Good Fats", "Energy"], color: "yellow", macros: { protein: 1, carbs: 2, fat: 7 } },
  { name: "Dry Apricot / Khumani", nameKn: "ಖುಮಾನಿ", brand: "Generic", category: "Dry Fruits", calories: 72, unit: "5 pieces (30g)", tags: ["Iron Rich", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 19, fat: 0 } },
  { name: "Prunes / Dry Plum", nameKn: "ಒಣ ಪ್ಲಮ್", brand: "Generic", category: "Dry Fruits", calories: 95, unit: "5 pieces (40g)", tags: ["Fiber Rich", "Iron Rich", "Digestive"], color: "emerald", macros: { protein: 1, carbs: 25, fat: 0 } },
  { name: "Goji Berries", nameKn: "ಗೋಜಿ ಬೆರ್ರಿ", brand: "Organic", category: "Dry Fruits", calories: 35, unit: "1 tbsp (10g)", tags: ["Super Food", "Antioxidant", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 8, fat: 0 } },

  // --- OILS, FATS & CONDIMENTS ---
  { name: "Olive Oil (Extra Virgin)", nameKn: "ಆಲಿವ್ ಎಣ್ಣೆ", brand: "Generic", category: "Fats", calories: 120, unit: "1 tbsp (14g)", tags: ["Super Food", "Good Fats", "Antioxidant"], color: "emerald", macros: { protein: 0, carbs: 0, fat: 14 } },
  { name: "Coconut Oil", nameKn: "ತೆಂಗಿನ ಎಣ್ಣೆ", brand: "Generic", category: "Fats", calories: 120, unit: "1 tbsp (14g)", tags: ["Good Fats", "Energy", "Healthy"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 14 } },
  { name: "Mustard Oil", nameKn: "ಸಾಸಿವೆ ಎಣ್ಣೆ", brand: "Generic", category: "Fats", calories: 120, unit: "1 tbsp (14g)", tags: ["Good Fats", "Traditional"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 14 } },
  { name: "Sesame Oil / Til Tel", nameKn: "ಎಳ್ಳೆಣ್ಣೆ", brand: "Generic", category: "Fats", calories: 120, unit: "1 tbsp (14g)", tags: ["Good Fats", "Antioxidant"], color: "yellow", macros: { protein: 0, carbs: 0, fat: 14 } },
  { name: "Heavy Cream", brand: "Amul", category: "Fats", calories: 52, unit: "1 tbsp (15g)", tags: ["High Fat", "Avoid"], color: "red", macros: { protein: 0, carbs: 0, fat: 6 } },
  { name: "Sour Cream", brand: "Generic", category: "Fats", calories: 31, unit: "1 tbsp (15g)", tags: ["High Fat"], color: "yellow", macros: { protein: 0, carbs: 1, fat: 3 } },
  { name: "Mayonnaise", nameKn: "ಮೇಯೊನೈಸ್", brand: "Dr Oetker", category: "Fats", calories: 100, unit: "1 tbsp (14g)", tags: ["Avoid", "High Fat", "Heavily Processed"], color: "red", macros: { protein: 0, carbs: 0, fat: 11 } },
  { name: "Tomato Ketchup", nameKn: "ಟೊಮ್ಯಾಟೋ ಸಾಸ್", brand: "Kissan", category: "Sides", calories: 20, unit: "1 tbsp (17g)", tags: ["High Sugar"], color: "yellow", macros: { protein: 0, carbs: 5, fat: 0 } },
  { name: "Green Chutney", nameKn: "ಹಸಿರು ಚಟ್ನಿ", brand: "Home", category: "Sides", calories: 20, unit: "2 tbsp (30g)", tags: ["Healthy", "Low Calorie"], color: "emerald", macros: { protein: 1, carbs: 3, fat: 1 } },
  { name: "Tamarind Chutney", nameKn: "ಹುಣಸೆ ಚಟ್ನಿ", brand: "Home", category: "Sides", calories: 60, unit: "2 tbsp (30g)", tags: ["High Sugar"], color: "yellow", macros: { protein: 0, carbs: 15, fat: 0 } },

  // --- BAKERY & BREAKFAST ---
  { name: "Blueberry Muffin", brand: "Bakery", category: "Bakery Items", calories: 370, unit: "1 muffin (100g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 5, carbs: 58, fat: 14 } },
  { name: "Banana Bread (1 slice)", nameKn: "ಬಾಳೆ ಬ್ರೆಡ್", brand: "Bakery/Home", category: "Bakery Items", calories: 240, unit: "1 slice (80g)", tags: ["Avoid", "High Sugar", "Carbs Rich"], color: "red", macros: { protein: 4, carbs: 40, fat: 8 } },
  { name: "Waffles (2 pcs)", brand: "Home/Cafe", category: "Bakery Items", calories: 310, unit: "2 pieces (130g)", tags: ["Avoid", "High Sugar", "Carbs Rich"], color: "red", macros: { protein: 8, carbs: 50, fat: 10 } },
  { name: "French Toast (2 slices)", nameKn: "ಫ್ರೆಂಚ್ ಟೋಸ್ಟ್", brand: "Home", category: "Bakery Items", calories: 280, unit: "2 slices (130g)", tags: ["Carbs Rich", "High Protein"], color: "yellow", macros: { protein: 10, carbs: 38, fat: 10 } },
  { name: "Muesli with Milk", nameKn: "ಮ್ಯೂಸ್ಲಿ ವಿತ್ ಮಿಲ್ಕ್", brand: "Kelloggs", category: "Breakfast", calories: 280, unit: "1 bowl (200g)", tags: ["Healthy", "Fiber Rich", "Carbs Rich"], color: "emerald", macros: { protein: 9, carbs: 48, fat: 6 } },
  { name: "Bread Toast (2 slices)", nameKn: "ಬ್ರೆಡ್ ಟೋಸ್ಟ್", brand: "Home", category: "Breakfast", calories: 160, unit: "2 slices (60g)", tags: ["Carbs Rich"], color: "yellow", macros: { protein: 5, carbs: 28, fat: 3 } },
  { name: "Butter Toast (2 slices)", nameKn: "ಬಟರ್ ಟೋಸ್ಟ್", brand: "Home", category: "Breakfast", calories: 200, unit: "2 slices (70g)", tags: ["Carbs Rich", "High Fat"], color: "yellow", macros: { protein: 5, carbs: 28, fat: 8 } },
  { name: "Anda Bhurji Pav", nameKn: "ಎಗ್ ಭುರ್ಜಿ ಪಾವ್", brand: "Street/Home", category: "Breakfast", calories: 290, unit: "1 plate (150g)", tags: ["High Protein", "Carbs Rich"], color: "yellow", macros: { protein: 14, carbs: 30, fat: 12 } },

  // --- MORE DRINKS ---
  { name: "Aam Panna", nameKn: "ಮಾವಿನ ಪನ್ನ", brand: "Home", category: "Drinks", calories: 90, unit: "1 glass (250ml)", tags: ["Healthy", "Digestive", "Vitamins"], color: "emerald", macros: { protein: 0, carbs: 22, fat: 0 } },
  { name: "Chaas (Salted)", nameKn: "ಉಪ್ಪಿನ ಮಜ್ಜಿಗೆ", brand: "Home", category: "Drinks", calories: 50, unit: "1 glass (250ml)", tags: ["Super Food", "Probiotic", "Hydrating"], color: "emerald", macros: { protein: 3, carbs: 5, fat: 2 } },
  { name: "Bael Sharbat", nameKn: "ಬೇಲ ಶರಬತ್", brand: "Home", category: "Drinks", calories: 130, unit: "1 glass (250ml)", tags: ["Healthy", "Digestive", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 32, fat: 0 } },
  { name: "Rose Sharbat", nameKn: "ರೋಸ್ ಶರಬತ್", brand: "Rooh Afza", category: "Drinks", calories: 120, unit: "1 glass (250ml)", tags: ["High Sugar", "Avoid"], color: "red", macros: { protein: 0, carbs: 30, fat: 0 } },
  { name: "Thandai", nameKn: "ಥಂಡಾಯ್", brand: "Home", category: "Drinks", calories: 280, unit: "1 glass (300ml)", tags: ["High Fat", "High Sugar", "Festive"], color: "red", macros: { protein: 6, carbs: 44, fat: 9 } },
  { name: "Falooda", nameKn: "ಫಾಲೂದ", brand: "Restaurant/Street", category: "Drinks", calories: 320, unit: "1 glass (350ml)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 6, carbs: 56, fat: 8 } },
  { name: "Watermelon Juice", nameKn: "ಕಲ್ಲಂಗಡಿ ರಸ", brand: "Home", category: "Drinks", calories: 75, unit: "1 glass (250ml)", tags: ["Hydrating", "Low Calorie", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 18, fat: 0 } },
  { name: "Pomegranate Juice", nameKn: "ದಾಳಿಂಬೆ ರಸ", brand: "Home", category: "Drinks", calories: 140, unit: "1 glass (250ml)", tags: ["Super Food", "Antioxidant", "Vitamins"], color: "emerald", macros: { protein: 1, carbs: 34, fat: 1 } },
  { name: "Matcha Latte", brand: "Cafe", category: "Drinks", calories: 150, unit: "1 cup (250ml)", tags: ["Super Food", "Antioxidant", "Healthy"], color: "emerald", macros: { protein: 5, carbs: 22, fat: 5 } },

  // --- REGIONAL SPECIALTIES ---
  { name: "Litti Chokha", nameKn: "ಲಿಟ್ಟಿ ಚೋಖ", brand: "Home/Restaurant", category: "Main Course", calories: 380, unit: "2 pieces (200g)", tags: ["Healthy", "Carbs Rich", "High Protein"], color: "yellow", macros: { protein: 12, carbs: 58, fat: 11 } },
  { name: "Dhokla (3 pcs)", nameKn: "ಢೋಕ್ಲ", brand: "Home/Restaurant", category: "Breakfast", calories: 175, unit: "3 pieces (120g)", tags: ["Super Food", "High Protein", "Light"], color: "emerald", macros: { protein: 8, carbs: 28, fat: 4 } },
  { name: "Handvo (Gujarati Cake)", nameKn: "ಹಂಡ್ವೋ", brand: "Home", category: "Breakfast", calories: 200, unit: "1 slice (100g)", tags: ["Healthy", "High Protein", "Fiber Rich"], color: "emerald", macros: { protein: 8, carbs: 28, fat: 6 } },
  { name: "Khandvi (4 rolls)", nameKn: "ಖಾಂಡ್ವಿ", brand: "Home", category: "Snacks", calories: 150, unit: "4 rolls (80g)", tags: ["Super Food", "High Protein", "Light"], color: "emerald", macros: { protein: 6, carbs: 20, fat: 5 } },
  { name: "Undhiyu", nameKn: "ಉಂಧಿಯು", brand: "Home", category: "Main Course", calories: 280, unit: "1 bowl (200g)", tags: ["Healthy", "Fiber Rich", "Vitamins"], color: "emerald", macros: { protein: 8, carbs: 36, fat: 12 } },
  { name: "Modak (2 pcs)", nameKn: "ಮೋದಕ", brand: "Home", category: "Sweets", calories: 280, unit: "2 pieces (100g)", tags: ["Avoid", "High Sugar", "Traditional"], color: "red", macros: { protein: 5, carbs: 50, fat: 8 } },
  { name: "Puran Poli", nameKn: "ಪೂರಣ ಪೋಳಿ", brand: "Home", category: "Sweets", calories: 310, unit: "1 piece (100g)", tags: ["Avoid", "High Sugar", "High Fat"], color: "red", macros: { protein: 7, carbs: 56, fat: 8 } },
  { name: "Sabudana Vada (2 pcs)", nameKn: "ಸಾಬೂದಾನ ವಡೆ", brand: "Home", category: "Snacks", calories: 250, unit: "2 pieces (100g)", tags: ["Avoid", "High Fat", "Carbs Rich"], color: "red", macros: { protein: 4, carbs: 36, fat: 10 } },
  { name: "Bhakri (Jowar)", nameKn: "ಭಾಕ್ರಿ (ಜ್ವಾರಿ)", brand: "Home", category: "Breads", calories: 160, unit: "1 piece (80g)", tags: ["Healthy", "Gluten Free", "Fiber Rich"], color: "emerald", macros: { protein: 5, carbs: 32, fat: 2 } },
  { name: "Appam with Coconut Milk", nameKn: "ಅಪ್ಪ ಮತ್ತು ತೆಂಗಿನ ಹಾಲು", brand: "Home", category: "Breakfast", calories: 210, unit: "1 appam + 100ml", tags: ["Healthy", "Gluten Free"], color: "emerald", macros: { protein: 4, carbs: 36, fat: 6 } }
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
