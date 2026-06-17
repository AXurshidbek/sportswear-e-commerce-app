'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'UZS' | 'USD' | 'RUB'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (curr: Currency) => void
  formatPrice: (price: number) => string
  getSymbol: () => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Currency exchange rates (you can update these based on real rates)
const EXCHANGE_RATES: Record<Currency, number> = {
  'UZS': 1, // Base currency
  'USD': 12500, // 1 USD = 12500 UZS (approximate)
  'RUB': 140, // 1 RUB = 140 UZS (approximate)
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  'UZS': 'сўм',
  'USD': '$',
  'RUB': '₽',
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('UZS')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency | null
    if (saved && ['UZS', 'USD', 'RUB'].includes(saved)) {
      setCurrencyState(saved)
    }
    setMounted(true)
  }, [])

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr)
    localStorage.setItem('currency', curr)
  }

  const formatPrice = (priceInUZS: number): string => {
    const convertedPrice = priceInUZS / EXCHANGE_RATES[currency]
    const symbol = CURRENCY_SYMBOLS[currency]

    if (currency === 'UZS') {
      return `${Math.round(convertedPrice).toLocaleString('uz-UZ')} ${symbol}`
    } else if (currency === 'USD') {
      return `${symbol}${convertedPrice.toFixed(2)}`
    } else {
      return `${convertedPrice.toFixed(2)} ${symbol}`
    }
  }

  const getSymbol = (): string => CURRENCY_SYMBOLS[currency]

  if (!mounted) return <>{children}</>

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    // Return default UZS during SSR
    return {
      currency: 'UZS' as Currency,
      setCurrency: () => {},
      formatPrice: (price: number) => `${Math.round(price).toLocaleString('uz-UZ')} сўм`,
      getSymbol: () => 'сўм',
    }
  }
  return context
}
