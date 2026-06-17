'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'uz' | 'en' | 'ru'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Import translations
import translations from '@/lib/translations'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && ['uz', 'en', 'ru'].includes(saved)) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k]
          } else {
            return key // Return key if still not found
          }
        }
      }
    }

    return typeof value === 'string' ? value : key
  }

  if (!mounted) return <>{children}</>

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Return default Uzbek translation during SSR
    return {
      language: 'uz' as Language,
      setLanguage: () => {},
      t: (key: string) => translations.uz[key as any] || key,
    }
  }
  return context
}
