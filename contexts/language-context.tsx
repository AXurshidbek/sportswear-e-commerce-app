'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translate, parseLanguage, type Language } from '@/lib/translate'

export type { Language }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_COOKIE = 'language'

function setLanguageCookie(lang: Language) {
  document.cookie = `${LANGUAGE_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`
}

export function LanguageProvider({
  children,
  initialLanguage = 'uz',
}: {
  children: React.ReactNode
  initialLanguage?: Language
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    const saved = parseLanguage(localStorage.getItem(LANGUAGE_COOKIE))
    if (saved !== language) {
      setLanguageState(saved)
    }
    localStorage.setItem(LANGUAGE_COOKIE, saved)
    setLanguageCookie(saved)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_COOKIE, lang)
    setLanguageCookie(lang)
  }, [])

  const t = useCallback((key: string) => translate(language, key), [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
