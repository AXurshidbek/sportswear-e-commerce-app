/** Barcha mahsulot narxlari UZS (so'm) da saqlanadi */

export const FREE_SHIPPING_THRESHOLD_UZS = 1_000_000
export const STANDARD_SHIPPING_UZS = 35_000
export const TAX_RATE = 0.12
export const MAX_PRICE_FILTER_UZS = 1_500_000
export const PRICE_FILTER_STEP_UZS = 50_000

export function calculateShipping(subtotalUzs: number): number {
  return subtotalUzs >= FREE_SHIPPING_THRESHOLD_UZS ? 0 : STANDARD_SHIPPING_UZS
}

export function calculateTax(subtotalUzs: number): number {
  return Math.round(subtotalUzs * TAX_RATE)
}

export function calculateOrderTotal(subtotalUzs: number, discountUzs = 0): {
  subtotal: number
  shipping: number
  tax: number
  total: number
} {
  const afterDiscount = Math.max(0, subtotalUzs - discountUzs)
  const shipping = calculateShipping(afterDiscount)
  const tax = calculateTax(afterDiscount)
  return {
    subtotal: subtotalUzs,
    shipping,
    tax,
    total: afterDiscount + shipping + tax,
  }
}
