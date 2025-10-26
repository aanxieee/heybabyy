import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getTranslation, Language, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider = ({ children, initialLanguage = 'en' }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: TranslationKey): string => {
    return getTranslation(currentLanguage, key);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};