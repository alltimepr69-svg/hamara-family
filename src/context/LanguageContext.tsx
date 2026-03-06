import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('kn'); // Default to Kannada initially

  useEffect(() => {
    // Check localStorage on mount
    const storedLang = localStorage.getItem('hamara_family_language');
    if (storedLang === 'en' || storedLang === 'kn') {
      setLanguageState(storedLang);
    } else {
      // First visit logic: Default is already 'kn', so just save it
      localStorage.setItem('hamara_family_language', 'kn');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hamara_family_language', lang);
  };

  const t = (key: keyof typeof translations) => {
    const entry = translations[key];
    if (!entry) return key as string;
    return entry[language] || entry['en'] || key as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
