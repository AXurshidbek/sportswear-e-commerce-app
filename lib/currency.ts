export type Currency = 'UZS' | 'USD'

export const EXCHANGE_RATES: Record<Currency, number> = {
  UZS: 1,
  USD: 12500,
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  UZS: 'сўм',
  USD: '$',
}

export function parseCurrency(value: string | undefined | null): Currency {
  if (value === 'UZS' || value === 'USD') return value
  return 'UZS'
}

/** SSR va clientda bir xil format — hydration xatosini oldini oladi */
export function formatUzsAmount(amount: number): string {
  const rounded = Math.round(amount)
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatPriceValue(priceInUZS: number, currency: Currency): string {
  const convertedPrice = priceInUZS / EXCHANGE_RATES[currency]
  const symbol = CURRENCY_SYMBOLS[currency]

  if (currency === 'UZS') {
    return `${formatUzsAmount(convertedPrice)} ${symbol}`
  }
  return `${symbol}${convertedPrice.toFixed(2)}`
}
