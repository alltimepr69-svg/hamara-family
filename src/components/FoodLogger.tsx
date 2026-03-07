import { useState, useMemo, useDeferredValue, useCallback } from 'react';
import React from 'react';
import { Button, Input } from './UI';
import { FOOD_DATABASE, FoodLog, FoodItem, vibrate, cn } from '@/lib/utils';
import { Search, Plus, X, ChevronLeft, AlertTriangle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

interface FoodLoggerProps {
  onAddFood: (food: FoodLog) => void;
  onClose?: () => void;
  isEmbedded?: boolean;
}

// ─── Smart Highlight: highlights ALL token occurrences ────────────────────────
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  try {
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase()
            ? <span key={i} className="font-bold text-amber-300 bg-amber-400/15 rounded-sm px-0.5">{part}</span>
            : <span key={i}>{part}</span>
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
};

// ─── Scoring Algorithm ─────────────────────────────────────────────────────────
// Ranks results by: exact match > starts-with > word boundary > contains > char coverage
const scoreFood = (food: FoodItem, query: string, tokens: string[]): number => {
  const name    = food.name.toLowerCase();
  const nameKn  = (food.nameKn  || '').toLowerCase();
  const brand   = (food.brand   || '').toLowerCase();
  const cat     = food.category.toLowerCase();
  const tags    = (food.tags    || []).join(' ').toLowerCase();

  let score = 0;

  // 1. Exact match — absolute winner
  if (name === query) return 100_000;

  // 2. Full query at start of name — very high relevance
  if (name.startsWith(query)) {
    score += 10_000 + Math.max(0, 500 - name.length * 8); // shorter = more specific
  } else {
    const qIdx = name.indexOf(query);
    if (qIdx >= 0) score += 5_000 - qIdx * 15; // earlier = better
  }

  // 3. Kannada name match
  if (nameKn.startsWith(query)) score += 3_000;
  else if (nameKn.includes(query)) score += 1_000;

  // 4. Token-by-token scoring (handles multi-word queries)
  for (const token of tokens) {
    const tLen = token.length;

    if (name.startsWith(token)) {
      score += 2_000 + tLen * 15;
    } else {
      // Word boundary match (token starts a word in name)
      const words = name.split(/[\s/()\-,]+/);
      const wordStart = words.some(w => w.startsWith(token));
      if (wordStart) {
        score += 1_200 + tLen * 12;
      } else {
        const idx = name.indexOf(token);
        if (idx >= 0) score += 600 - idx * 4 + tLen * 8; // earlier + longer = better
      }
    }

    // Brand / category / tag bonuses
    if (brand.startsWith(token)) score += 150;
    else if (brand.includes(token)) score += 80;
    if (cat.includes(token)) score += 50;
    if (tags.includes(token)) score += 30;
  }

  // 5. Character coverage: how many chars of query appear in name in order
  let matched = 0, pos = 0;
  for (const ch of query) {
    const i = name.indexOf(ch, pos);
    if (i >= 0) { matched++; pos = i + 1; }
  }
  score += (matched / Math.max(query.length, 1)) * 300;

  // 6. Specificity bonus: shorter names rank higher for identical queries
  score += Math.max(0, 120 - name.length * 1.5);

  return score;
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const FoodLogger = ({ onAddFood, onClose, isEmbedded = false }: FoodLoggerProps) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm]   = useState('');
  const [customFood, setCustomFood]   = useState({ name: '', calories: '' });
  const [showCustom, setShowCustom]   = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity]       = useState(1);

  // useDeferredValue keeps typing instant — search runs after paint
  const deferredSearch = useDeferredValue(searchTerm);
  const isStale = searchTerm !== deferredSearch;

  // ─── Search with full scoring ───────────────────────────────────────────────
  const filteredFood = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    return FOOD_DATABASE
      .filter(f => {
        const searchable = [
          f.name, f.nameKn || '', f.brand || '', f.category, ...(f.tags || [])
        ].join(' ').toLowerCase();
        return tokens.every(token => searchable.includes(token)); // ALL tokens must match
      })
      .map(f => ({ food: f, score: scoreFood(f, q, tokens) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 25)
      .map(r => r.food);
  }, [deferredSearch]);

  // ─── Color classes ──────────────────────────────────────────────────────────
  const getColorClass = (color?: string) => {
    switch (color) {
      case 'red':     return 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10 active:bg-red-500/20';
      case 'yellow':  return 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 active:bg-yellow-500/15';
      case 'emerald': return 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.07)]';
      case 'green':   return 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10';
      default:        return 'border-white/5 hover:bg-white/5 active:bg-white/8';
    }
  };

  // ─── Grouped view (no search) ───────────────────────────────────────────────
  const groupedFood = useMemo(() =>
    FOOD_DATABASE.reduce((acc, food) => {
      if (!acc[food.category]) acc[food.category] = [];
      acc[food.category].push(food);
      return acc;
    }, {} as Record<string, FoodItem[]>)
  , []);

  const categoryOrder = [
    'Super Food', 'Breakfast', 'Indian Chats', 'Non-Veg', 'Main Course',
    'Meals', 'Bakery Items', 'Chocolates', 'Snacks', 'Fats', 'Nuts', 'Sweets',
    'Drinks', 'Fruits', 'Vegetables', 'Grains', 'Salads', 'International', 'Fast Food', 'Breads',
  ];

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleAdd = useCallback((
    name: string, calories: number,
    macros?: { protein: number; carbs: number; fat: number }
  ) => {
    vibrate(20);
    onAddFood({ id: crypto.randomUUID(), name, calories, timestamp: Date.now(), macros });
    if (onClose) {
      onClose();
    } else {
      setSelectedFood(null); setQuantity(1);
      setCustomFood({ name: '', calories: '' });
      setShowCustom(false); setSearchTerm('');
    }
  }, [onAddFood, onClose]);

  const handleQuantityAdd = useCallback(() => {
    if (!selectedFood) return;
    const totalCalories = Math.ceil(selectedFood.calories * quantity);
    const totalMacros = selectedFood.macros ? {
      protein: Math.ceil(selectedFood.macros.protein * quantity),
      carbs:   Math.ceil(selectedFood.macros.carbs   * quantity),
      fat:     Math.ceil(selectedFood.macros.fat     * quantity),
    } : undefined;
    const foodName = (language === 'kn' && selectedFood.nameKn)
      ? selectedFood.nameKn : selectedFood.name;
    handleAdd(`${foodName} (${quantity} ${selectedFood.unit})`, totalCalories, totalMacros);
  }, [selectedFood, quantity, language, handleAdd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredFood.length > 0) {
      vibrate(10); setSelectedFood(filteredFood[0]);
    }
  };

  // ─── Food Row Component ─────────────────────────────────────────────────────
  const FoodRow = ({
    food, idx, highlight
  }: { food: FoodItem; idx: number; highlight?: string }) => (
    <motion.button
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.14, delay: Math.min(idx * 0.025, 0.18), ease: 'easeOut' }}
      whileTap={{ scale: 0.974 }}
      onClick={() => { vibrate(10); setSelectedFood(food); }}
      className={cn(
        "w-full flex justify-between items-center p-3 rounded-2xl transition-all duration-150 text-left group border",
        getColorClass(food.color),
        idx === 0 && highlight && "ring-1 ring-amber-500/40 shadow-[0_0_14px_rgba(245,158,11,0.1)]"
      )}
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className={cn(
          "font-medium text-neutral-200 group-hover:text-amber-400 transition-colors duration-100 truncate text-sm leading-snug",
          isStale && "opacity-60"
        )}>
          {highlight
            ? <HighlightedText
                text={(language === 'kn' && food.nameKn) ? food.nameKn : food.name}
                highlight={highlight}
              />
            : (language === 'kn' && food.nameKn) ? food.nameKn : food.name
          }
          {food.brand && (
            <span className="text-[10px] text-neutral-500 ml-1.5 font-normal">({food.brand})</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[10px] text-neutral-500">{food.unit}</span>
          {food.color === 'red' && (
            <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-0.5 leading-none">
              <AlertTriangle size={7} /> {t('avoid')}
            </span>
          )}
          {food.macros && (
            <span className="text-[9px] text-neutral-500 bg-white/4 px-1.5 py-0.5 rounded font-mono leading-none">
              P:{food.macros.protein} C:{food.macros.carbs} F:{food.macros.fat}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-bold text-amber-400 text-sm tabular-nums">{food.calories}</span>
        <span className="text-[9px] text-neutral-500 leading-none">kcal</span>
        <motion.div
          className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.2 }}
        >
          <Plus size={13} />
        </motion.div>
      </div>
    </motion.button>
  );

  // ─── Main Render ────────────────────────────────────────────────────────────
  const Content = (
    <div className={cn(
      "w-full flex flex-col bg-[#080808]",
      !isEmbedded && "max-w-md max-h-[92vh] sm:rounded-3xl rounded-t-3xl border-t border-white/10 sm:border border-white/8 shadow-2xl shadow-black/60"
    )}>

      {/* ── Header ── */}
      <div className="px-4 pt-3.5 pb-3 border-b border-white/8 flex justify-between items-center bg-white/3 shrink-0">
        <AnimatePresence mode="wait">
          <motion.h3
            key={selectedFood ? 'food' : showCustom ? 'custom' : 'log'}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.13 }}
            className="font-bold text-base text-neutral-100 truncate flex-1 pr-2"
          >
            {selectedFood
              ? ((language === 'kn' && selectedFood.nameKn) ? selectedFood.nameKn : selectedFood.name)
              : showCustom ? t('addCustomFood') : t('logFood')}
          </motion.h3>
        </AnimatePresence>
        {!isEmbedded && onClose && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { vibrate(10); onClose(); }}
            className="p-1.5 hover:bg-white/10 active:bg-white/15 rounded-full text-neutral-500 hover:text-white transition-colors shrink-0"
          >
            <X size={17} />
          </motion.button>
        )}
      </div>

      {/* ── Body ── */}
      <div className="overflow-y-auto flex-1 overscroll-contain fithona-scroll">
        <AnimatePresence mode="wait" initial={false}>

          {/* ── Selected Food View ── */}
          {selectedFood ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
              className="p-4 space-y-5"
            >
              {/* Calorie display */}
              <div className="text-center space-y-1.5 pt-2">
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.07, type: 'spring', stiffness: 320, damping: 22 }}
                  className="text-5xl font-bold text-amber-400 drop-shadow-lg tabular-nums"
                >
                  {Math.ceil(selectedFood.calories * quantity)}
                  <span className="text-base text-neutral-500 font-normal ml-2">kcal</span>
                </motion.div>
                <div className="text-[10px] text-amber-400/70 font-medium bg-amber-500/8 inline-block px-3 py-1 rounded-full border border-amber-500/15">
                  {t('safetyBuffer')}
                </div>
              </div>

              {/* Macros grid */}
              {selectedFood.macros && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.22 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {[
                    { label: t('protein'), val: Math.ceil(selectedFood.macros.protein * quantity), color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/15' },
                    { label: t('carbs'),   val: Math.ceil(selectedFood.macros.carbs   * quantity), color: 'text-amber-400',   bg: 'bg-amber-500/8 border-amber-500/15'   },
                    { label: t('fats'),    val: Math.ceil(selectedFood.macros.fat     * quantity), color: 'text-red-400',     bg: 'bg-red-500/8 border-red-500/15'       },
                  ].map(({ label, val, color, bg }) => (
                    <div key={label} className={cn("p-3 rounded-2xl border text-center", bg)}>
                      <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold mb-1">{label}</div>
                      <div className={cn("text-2xl font-bold tabular-nums", color)}>{val}<span className="text-xs font-normal ml-0.5 opacity-60">g</span></div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tags */}
              {selectedFood.tags && selectedFood.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {selectedFood.tags.map(tag => (
                    <span key={tag} className="bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-neutral-400 border border-white/5">{tag}</span>
                  ))}
                </div>
              )}

              {/* Quantity selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                  {t('quantity')} — {selectedFood.unit}
                </label>
                <div className="flex items-center gap-3 justify-center">
                  {([-0.5, null, +0.5] as (number | null)[]).map((delta, i) =>
                    delta === null ? (
                      <Input
                        key="qty-input"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(0.5, Number(e.target.value)))}
                        className="text-center text-xl font-bold bg-white/5 w-24"
                      />
                    ) : (
                      <motion.button
                        key={`btn-${i}`}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => { vibrate(5); setQuantity(q => Math.max(0.5, +(q + delta).toFixed(1))); }}
                        className="w-12 h-12 rounded-2xl bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-white/5 flex items-center justify-center text-2xl font-light text-neutral-300 hover:text-white transition-colors"
                      >
                        {delta > 0 ? '+' : '−'}
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { vibrate(10); setSelectedFood(null); setQuantity(1); }}
                  className="flex-1 py-3.5 rounded-2xl font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all text-sm flex items-center justify-center gap-1.5"
                >
                  <ChevronLeft size={15} /> {t('back')}
                </motion.button>
                <Button className="flex-1" onClick={handleQuantityAdd}>{t('addLog')}</Button>
              </div>
            </motion.div>

          ) : !showCustom ? (
            /* ── Search / Browse View ── */
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3.5 space-y-3 pb-24"
            >
              {/* Search input */}
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                  size={15}
                />
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-10 bg-white/5 border-white/8 text-sm h-11"
                  autoFocus={!isEmbedded}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.1 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-neutral-700 hover:bg-neutral-600 text-neutral-400 hover:text-white transition-colors"
                    >
                      <X size={11} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Results count badge */}
              <AnimatePresence>
                {searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between px-1"
                  >
                    <span className="text-[10px] text-neutral-500">
                      {isStale
                        ? <span className="text-neutral-600 animate-pulse">Searching…</span>
                        : <span>{filteredFood.length} result{filteredFood.length !== 1 ? 's' : ''}</span>
                      }
                    </span>
                    {filteredFood.length > 0 && (
                      <span className="text-[10px] text-amber-500/70">↵ to select top result</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results / Categories */}
              <AnimatePresence mode="wait" initial={false}>
                {searchTerm ? (
                  /* ─ Search Results ─ */
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="space-y-1.5"
                  >
                    <AnimatePresence initial={false}>
                      {filteredFood.length > 0 ? (
                        filteredFood.map((food, idx) => (
                          <FoodRow key={food.name} food={food} idx={idx} highlight={searchTerm} />
                        ))
                      ) : !isStale ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-center py-12 text-neutral-500"
                        >
                          <Search size={30} className="mx-auto mb-3 opacity-15" />
                          <p className="text-sm mb-1 font-medium">{t('noFoodsFound')}</p>
                          <p className="text-xs text-neutral-600">Try the main ingredient — e.g. "Chicken" or "Rice"</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  /* ─ Default Category View ─ */
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="space-y-4"
                  >
                    {/* Super Foods */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                        <Zap size={10} fill="currentColor" /> {t('recommended')}
                      </h4>
                      {groupedFood['Super Food']?.map((food, idx) => (
                        <FoodRow key={food.name} food={food} idx={idx} />
                      ))}
                    </div>

                    {/* Other categories */}
                    {categoryOrder.map(cat => {
                      if (cat === 'Super Food') return null;
                      const items = groupedFood[cat];
                      if (!items?.length) return null;
                      return (
                        <div key={cat} className="space-y-1.5">
                          <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-1">{cat}</h4>
                          {items.map((food, idx) => <FoodRow key={food.name} food={food} idx={idx} />)}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom food button */}
              <Button
                onClick={() => setShowCustom(true)}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 shadow-none border border-white/5"
              >
                {t('addCustomFood')}
              </Button>
            </motion.div>

          ) : (
            /* ── Custom Food View ── */
            <motion.div
              key="custom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
              className="p-4 space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-400">{t('foodName')}</label>
                <Input
                  value={customFood.name}
                  onChange={(e) => setCustomFood(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Grandma's Pie"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-400">{t('calories')}</label>
                <Input
                  type="number"
                  value={customFood.calories}
                  onChange={(e) => setCustomFood(p => ({ ...p, calories: e.target.value }))}
                  placeholder="e.g. 350"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { vibrate(10); setShowCustom(false); }}
                  className="flex-1 py-3.5 rounded-2xl font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all text-sm"
                >
                  {t('back')}
                </motion.button>
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
        </AnimatePresence>
      </div>
    </div>
  );

  if (isEmbedded) return Content;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/55 backdrop-blur-md"
      onClick={() => { vibrate(10); if (onClose) onClose(); }}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 32, stiffness: 340, mass: 0.75 }}
        className="w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {Content}
      </motion.div>
    </motion.div>
  );
};
