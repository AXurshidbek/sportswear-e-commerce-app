'use client'

import { useLanguage } from '@/contexts/language-context'
import { useCurrency } from '@/contexts/currency-context'

export function TranslationDemo() {
  const { t, language } = useLanguage()
  const { currency, formatPrice } = useCurrency()

  return (
    <div className="bg-secondary p-4 rounded-lg border border-border text-center">
      <p className="text-sm text-muted-foreground mb-2">
        {t('common.current_language')}: <span className="font-bold text-foreground uppercase">{language}</span>
      </p>
      <p className="text-sm text-muted-foreground">
        {t('common.current_currency')}: <span className="font-bold text-foreground">{currency}</span>
      </p>
      <p className="text-xs text-muted-foreground mt-3 italic">
        {t('common.example_price')}: {formatPrice(100)}
      </p>
    </div>
  )
}
