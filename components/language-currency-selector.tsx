'use client'

import { useLanguage, type Language } from '@/contexts/language-context'
import { useCurrency, type Currency } from '@/contexts/currency-context'
import { Globe, DollarSign, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function LanguageCurrencySelector() {
  const { language, setLanguage, t } = useLanguage()
  const { currency, setCurrency } = useCurrency()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)

  const languages: { code: Language; name: string }[] = [
    { code: 'uz', name: "O'zbekcha" },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ]

  const currencies: Currency[] = ['UZS', 'USD', 'RUB']

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="hidden md:flex items-center gap-1 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm font-medium text-foreground"
        >
          <Globe className="h-4 w-4" />
          <span>{language.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showLanguageMenu && (
          <div className="absolute top-full mt-1 right-0 bg-card border border-border rounded-lg shadow-lg z-50 min-w-max">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setShowLanguageMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                  language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Currency Selector */}
      <div className="relative">
        <button
          onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
          className="hidden md:flex items-center gap-1 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm font-medium text-foreground"
        >
          <DollarSign className="h-4 w-4" />
          <span>{currency}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showCurrencyMenu && (
          <div className="absolute top-full mt-1 right-0 bg-card border border-border rounded-lg shadow-lg z-50 min-w-max">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  setCurrency(curr)
                  setShowCurrencyMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
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
