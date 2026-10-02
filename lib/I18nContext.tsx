'use client';

import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'am';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    store: 'Ye-Buna Store',
    library: 'My Library & Orders',
    reader: 'Digital Reader',
    audiobook: 'Audiobooks',
    companion: 'Ask The Book',
    transformation: '30-Day Program',
    settings: 'Account Settings',
    // ...
  },
  am: {
    dashboard: 'ዳሽቦርድ',
    store: 'የቡና መደብር',
    library: 'የእኔ ቤተ-መጽሐፍት',
    reader: 'ዲጂታል ንባብ',
    audiobook: 'የድምፅ መጽሐፍት',
    companion: 'መጽሐፉን ጠይቅ',
    transformation: 'የ30 ቀን መርሃ ግብር',
    settings: 'የመለያ ቅንብሮች',
    // ...
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const t = (key: string) => translations[lang][key] || key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
