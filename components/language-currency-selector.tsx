'use client'

import { useLanguage, type Language } from '@/contexts/language-context'
import { useCurrency, type Currency } from '@/contexts/currency-context'
import { Globe, DollarSign, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function LanguageCurrencySelector() {
  const { language, setLanguage } = useLanguage()
  const { currency, setCurrency } = useCurrency()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const currRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; name: string }[] = [
    { code: 'uz', name: "O'zbekcha" },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ]

  const currencies: Currency[] = ['UZS', 'USD']

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
      if (currRef.current && !currRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <div className="relative" ref={langRef}>
        <button
          onClick={() => {
            setShowLanguageMenu(!showLanguageMenu)
            setShowCurrencyMenu(false)
          }}
          className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80 md:px-3 md:text-sm"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span>{language.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        {showLanguageMenu && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-max rounded-lg border border-border bg-card shadow-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setShowLanguageMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={currRef}>
        <button
          onClick={() => {
            setShowCurrencyMenu(!showCurrencyMenu)
            setShowLanguageMenu(false)
          }}
          className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80 md:px-3 md:text-sm"
        >
          <DollarSign className="h-4 w-4 shrink-0" />
          <span>{currency}</span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        {showCurrencyMenu && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-max rounded-lg border border-border bg-card shadow-lg">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  setCurrency(curr)
                  setShowCurrencyMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  currency === curr ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
