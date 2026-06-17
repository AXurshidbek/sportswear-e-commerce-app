import { useMemo } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { products, type Product } from '@/lib/data'
import { localizeProduct, localizeProducts } from '@/lib/product-i18n'

export function useLocalizedProducts(): Product[] {
  const { language } = useLanguage()
  return useMemo(() => localizeProducts(language), [language])
}

export function useLocalizedProduct(product: Product): Product {
  const { language } = useLanguage()
  return useMemo(() => localizeProduct(product, language), [product, language])
}

export function useLocalizedProductById(id: string): Product | undefined {
  const { language } = useLanguage()
  return useMemo(() => {
    const product = products.find((p) => p.id === id)
    return product ? localizeProduct(product, language) : undefined
  }, [id, language])
}
