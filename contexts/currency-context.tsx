'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type Currency,
  parseCurrency,
  formatPriceValue,
  CURRENCY_SYMBOLS,
} from '@/lib/currency'

export type { Currency }

interface CurrencyContextType {
  currency: Currency
  setCurrency: (curr: Currency) => void
  formatPrice: (price: number) => string
  getSymbol: () => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const CURRENCY_COOKIE = 'currency'

function setCurrencyCookie(curr: Currency) {
  document.cookie = `${CURRENCY_COOKIE}=${curr};path=/;max-age=31536000;SameSite=Lax`
}

export function CurrencyProvider({
  children,
  initialCurrency = 'UZS',
}: {
  children: React.ReactNode
  initialCurrency?: Currency
}) {
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency)

  useEffect(() => {
    const saved = parseCurrency(localStorage.getItem(CURRENCY_COOKIE))
    if (saved !== currency) {
      setCurrencyState(saved)
    }
    localStorage.setItem(CURRENCY_COOKIE, saved)
    setCurrencyCookie(saved)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setCurrency = useCallback((curr: Currency) => {
    setCurrencyState(curr)
    localStorage.setItem(CURRENCY_COOKIE, curr)
    setCurrencyCookie(curr)
  }, [])

  const formatPrice = useCallback((price: number) => formatPriceValue(price, currency), [currency])
  const getSymbol = useCallback(() => CURRENCY_SYMBOLS[currency], [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
