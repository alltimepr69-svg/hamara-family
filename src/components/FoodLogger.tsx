import { useState, useMemo } from 'react';
import React from 'react';
import { GlassCard, Button, Input, containerVariants, itemVariants } from './UI';
import { FOOD_DATABASE, FoodLog, FoodItem, vibrate, cn } from '@/lib/utils';
import { Search, Plus, X, ChevronLeft, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

interface FoodLoggerProps {
  onAddFood: (food: FoodLog) => void;
  onClose?: () => void;
  isEmbedded?: boolean;
}

// Helper component for highlighting text
const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() 
          ? <span key={i} className="font-bold text-amber-400">{part}</span> 
          : <span key={i}>{part}</span>
      )}
    </>
  );
};

export const FoodLogger = ({ onAddFood, onClose, isEmbedded = false }: FoodLoggerProps) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [customFood, setCustomFood] = useState({ name: '', calories: '' });
  const [showCustom, setShowCustom] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Instant-Sense Search Logic
  const filteredFood = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const lowerQuery = searchTerm.toLowerCase();
    const searchTokens = lowerQuery.split(/\s+/).filter(t => t.length > 0);

    return FOOD_DATABASE
      .filter(f => {
        const searchableText = [
          f.name,
          f.nameKn || '',
          f.brand || '',
          f.category,
          ...(f.tags || [])
        ].join(' ').toLowerCase();

        // Fuzzy matching: Check if ALL tokens are present
        return searchTokens.every(token => searchableText.includes(token));
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // 1. Priority: Starts with search term
        const aStarts = aName.startsWith(lowerQuery);
        const bStarts = bName.startsWith(lowerQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // 2. Priority: Super Foods (Emerald) boost
        const aSuper = a.category === 'Super Food' || a.color === 'emerald';
        const bSuper = b.category === 'Super Food' || b.color === 'emerald';
        if (aSuper && !bSuper) return -1;
        if (!aSuper && bSuper) return 1;

        // 3. Alphabetical fallback
        return aName.localeCompare(bName);
      })
      .slice(0, 20); // Limit to top 20 for performance
  }, [searchTerm]);

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'red': return 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10';
      case 'yellow': return 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10';
      case 'emerald': return 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
      case 'green': return 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10';
      default: return 'border-transparent hover:bg-white/5';
    }
  };

  // Group food by category (only used when NOT searching)
  const groupedFood = useMemo(() => {
    if (searchTerm) return {}; // Don't group if searching
    return FOOD_DATABASE.reduce((acc, food) => {
      if (!acc[food.category]) {
        acc[food.category] = [];
      }
      acc[food.category].push(food);
      return acc;
    }, {} as Record<string, FoodItem[]>);
  }, [searchTerm]);

  // Order of categories
  const categoryOrder = [
    'Super Food',
    'Breakfast',
    'Indian Chats',
    'Non-Veg',
    'Meals',
    'Bakery Items',
    'Chocolates',
    'Fats',
    'Nuts'
  ];

  const handleAdd = (name: string, calories: number, macros?: { protein: number, carbs: number, fat: number }) => {
    onAddFood({
      id: crypto.randomUUID(),
      name,
      calories,
      timestamp: Date.now(),
      macros
    });
    if (onClose) onClose();
    else {
      // Reset state if embedded
      setSelectedFood(null);
      setQuantity(1);
      setCustomFood({ name: '', calories: '' });
      setShowCustom(false);
      setSearchTerm('');
    }
  };

  const handleQuantityAdd = () => {
    if (!selectedFood) return;
    
    // Calories are already buffered in the DB
    const totalCalories = Math.ceil(selectedFood.calories * quantity);
    
    // Calculate macros if available
    const totalMacros = selectedFood.macros ? {
      protein: Math.ceil(selectedFood.macros.protein * quantity),
      carbs: Math.ceil(selectedFood.macros.carbs * quantity),
      fat: Math.ceil(selectedFood.macros.fat * quantity)
    } : undefined;

    // Use localized name if available and language is Kannada
    const foodName = (language === 'kn' && selectedFood.nameKn) ? selectedFood.nameKn : selectedFood.name;
    handleAdd(`${foodName} (${quantity} ${selectedFood.unit})`, totalCalories, totalMacros);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredFood.length > 0) {
      vibrate(10);
      setSelectedFood(filteredFood[0]);
    }
  };

  const Content = (
    <div className={cn("w-full flex flex-col overflow-hidden bg-black/95", !isEmbedded && "max-w-md max-h-[90vh] sm:rounded-3xl rounded-t-3xl border-t border-white/10 sm:border border-white/10 shadow-2xl")}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <h3 className="font-bold text-lg text-neutral-100">
          {selectedFood 
            ? ((language === 'kn' && selectedFood.nameKn) ? selectedFood.nameKn : selectedFood.name) 
            : (showCustom ? t('addCustomFood') : t('logFood'))}
        </h3>
        {!isEmbedded && onClose && (
          <button onClick={() => {
            vibrate(10);
            onClose();
          }} className="p-2 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {selectedFood ? (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-6"
           >
             <div className="text-center space-y-2">
               <div className="text-4xl font-bold text-amber-400 drop-shadow-lg">
                 {Math.ceil(selectedFood.calories * quantity)}
                 <span className="text-lg text-neutral-500 font-normal ml-1">kcal</span>
               </div>
               <div className="text-xs text-amber-400 font-medium bg-amber-500/10 inline-block px-3 py-1 rounded-full border border-amber-500/20">
                 {t('safetyBuffer')}
               </div>
             </div>

             {selectedFood.macros && (
               <div className="grid grid-cols-3 gap-2 px-4">
                 <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 text-center">
                   <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium mb-1">{t('protein')}</div>
                   <div className="text-lg font-bold text-emerald-400">{Math.ceil(selectedFood.macros.protein * quantity)}g</div>
                 </div>
                 <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 text-center">
                   <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium mb-1">{t('carbs')}</div>
                   <div className="text-lg font-bold text-amber-400">{Math.ceil(selectedFood.macros.carbs * quantity)}g</div>
                 </div>
                 <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 text-center">
                   <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium mb-1">{t('fats')}</div>
                   <div className="text-lg font-bold text-red-400">{Math.ceil(selectedFood.macros.fat * quantity)}g</div>
                 </div>
               </div>
             )}

             {selectedFood.tags && selectedFood.tags.length > 0 && (
               <div className="flex flex-wrap gap-2 justify-center">
                 {selectedFood.tags.map(tag => (
                   <div key={tag} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full text-xs text-neutral-300 border border-white/5">
                      {tag}
                   </div>
                 ))}
               </div>
             )}

             <div className="space-y-2">
               <label className="text-sm font-medium text-neutral-400">{t('quantity')} ({selectedFood.unit}s)</label>
               <div className="flex items-center gap-4 justify-center">
                 <button 
                   onClick={() => {
                     vibrate(5);
                     setQuantity(Math.max(0.5, quantity - 0.5));
                   }}
                   className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-white/5 flex items-center justify-center text-xl font-bold text-neutral-400 hover:text-white transition-colors"
                 >
                   -
                 </button>
                 <Input 
                   type="number" 
                   value={quantity} 
                   onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                   className="text-center text-xl font-bold bg-white/5 w-24"
                 />
                 <button 
                   onClick={() => {
                     vibrate(5);
                     setQuantity(quantity + 0.5);
                   }}
                   className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-white/5 flex items-center justify-center text-xl font-bold text-neutral-400 hover:text-white transition-colors"
                 >
                   +
                 </button>
               </div>
             </div>

             <div className="flex gap-2 pt-4">
               <button 
                 onClick={() => { 
                   vibrate(10);
                   setSelectedFood(null); 
                   setQuantity(1); 
                 }}
                 className="flex-1 py-3 rounded-2xl font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors flex items-center justify-center gap-2"
               >
                 <ChevronLeft size={18} /> {t('back')}
               </button>
               <Button 
                 className="flex-1"
                 onClick={handleQuantityAdd}
               >
                 {t('addLog')}
               </Button>
             </div>
           </motion.div>
        ) : !showCustom ? (
          <>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-white/5 border-white/10"
                  autoFocus={!isEmbedded}
                />
              </div>
            </div>

            <motion.div 
              className="space-y-4 pb-20"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {searchTerm ? (
                // Search Results (Flat List)
                <div className="space-y-2">
                  {filteredFood.length > 0 ? (
                    filteredFood.map((food, idx) => (
                      <motion.button
                        key={`search-${idx}`}
                        variants={itemVariants}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          vibrate(10);
                          setSelectedFood(food);
                        }}
                        className={cn(
                          "w-full flex justify-between items-center p-3 rounded-xl transition-colors text-left group border",
                          getColorClass(food.color),
                          idx === 0 && "ring-1 ring-amber-500/50" // Highlight first result
                        )}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="font-medium text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                            <HighlightedText 
                              text={(language === 'kn' && food.nameKn) ? food.nameKn : food.name} 
                              highlight={searchTerm} 
                            />
                            {food.brand && <span className="text-xs text-neutral-500 ml-2 font-normal">({food.brand})</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-neutral-500">{food.unit}</span>
                            {food.color === 'red' && (
                                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 rounded-sm border border-red-500/20 flex items-center gap-1">
                                    <AlertTriangle size={8} /> {t('avoid')}
                                </span>
                            )}
                            {food.tags && (
                              <div className="flex gap-1">
                                {food.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="text-[10px] text-neutral-400 bg-white/5 px-1.5 rounded-sm">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-amber-500">{food.calories}</span>
                          <span className="text-xs text-neutral-500">kcal</span>
                          <Plus size={16} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.button>
                    ))
                  ) : (
                    <motion.div variants={itemVariants} className="text-center py-8 text-neutral-500">
                      <p className="mb-2">{t('noFoodsFound')}</p>
                      <p className="text-xs text-neutral-600">Can't find it? Try searching for the main ingredient (e.g., Chicken or Rice).</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                // Default View (Grouped)
                <>
                  <div className="space-y-2">
                     <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-1 flex items-center gap-2">
                       <Zap size={12} fill="currentColor" /> {t('recommended')}
                     </h4>
                     {groupedFood['Super Food']?.map((food, idx) => (
                        <motion.button
                          key={`super-${idx}`}
                          variants={itemVariants}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            vibrate(10);
                            setSelectedFood(food);
                          }}
                          className={cn(
                            "w-full flex justify-between items-center p-3 rounded-xl transition-colors text-left group border",
                            getColorClass(food.color)
                          )}
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="font-medium text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                              {(language === 'kn' && food.nameKn) ? food.nameKn : food.name}
                              {food.brand && <span className="text-xs text-neutral-500 ml-2 font-normal">({food.brand})</span>}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-neutral-500">{food.unit}</span>
                              {food.tags && (
                                <div className="flex gap-1">
                                  {food.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] text-neutral-400 bg-white/5 px-1.5 rounded-sm">{tag}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-amber-500">{food.calories}</span>
                            <span className="text-xs text-neutral-500">kcal</span>
                            <Plus size={16} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.button>
                     ))}
                  </div>

                  {categoryOrder.map(category => {
                    if (category === 'Super Food') return null; // Already shown above
                    const items = groupedFood[category];
                    if (!items || items.length === 0) return null;

                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-1">{category}</h4>
                        {items.map((food, idx) => (
                          <motion.button
                            key={`${category}-${idx}`}
                            variants={itemVariants}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              vibrate(10);
                              setSelectedFood(food);
                            }}
                            className={cn(
                              "w-full flex justify-between items-center p-3 rounded-xl transition-colors text-left group border",
                              getColorClass(food.color)
                            )}
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="font-medium text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                                {(language === 'kn' && food.nameKn) ? food.nameKn : food.name}
                                {food.brand && <span className="text-xs text-neutral-500 ml-2 font-normal">({food.brand})</span>}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-neutral-500">{food.unit}</span>
                                {food.color === 'red' && (
                                    <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 rounded-sm border border-red-500/20 flex items-center gap-1">
                                        <AlertTriangle size={8} /> {t('avoid')}
                                    </span>
                                )}
                                {food.tags && (
                                  <div className="flex gap-1">
                                    {food.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className="text-[10px] text-neutral-400 bg-white/5 px-1.5 rounded-sm">{tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-bold text-amber-500">{food.calories}</span>
                              <span className="text-xs text-neutral-500">kcal</span>
                              <Plus size={16} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    );
                  })}
                </>
              )}
            </motion.div>

            <Button 
              onClick={() => setShowCustom(true)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 shadow-none border border-white/5"
            >
              {t('addCustomFood')}
            </Button>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">{t('foodName')}</label>
              <Input 
                value={customFood.name}
                onChange={(e) => setCustomFood(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Grandma's Pie"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">{t('calories')}</label>
              <Input 
                type="number"
                value={customFood.calories}
                onChange={(e) => setCustomFood(prev => ({ ...prev, calories: e.target.value }))}
                placeholder="e.g. 350"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  vibrate(10);
                  setShowCustom(false);
                }}
                className="flex-1 py-3 rounded-2xl font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                {t('back')}
              </button>
              <Button 
                className="flex-1"
                disabled={!customFood.name || !customFood.calories}
                onClick={() => handleAdd(customFood.name, Number(customFood.calories))}
              >
                {t('addFood')}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  if (isEmbedded) {
    return Content;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
      onClick={() => {
        vibrate(10);
        if (onClose) onClose();
      }}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {Content}
      </motion.div>
    </motion.div>
  );
};
