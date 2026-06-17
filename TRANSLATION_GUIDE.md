# Translation Guide - SPORTX App

## How to Use the Translation System

The app has a complete i18n (internationalization) system in place with 3 languages:
- **Uzbek (uz)** - Default language
- **English (en)**
- **Russian (ru)**

## Implementation Steps

### 1. Import the Translation Hook

```tsx
import { useLanguage } from '@/contexts/language-context'
```

### 2. Use in Your Component

```tsx
export default function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('common.addToCart')}</button>
    </div>
  )
}
```

### 3. Add Translations to `/lib/translations.ts`

The translations file has a nested structure. Example:

```typescript
const translations = {
  uz: {
    header: {
      search: 'Qidiruv',
      cart: 'Savat',
      profile: 'Profil',
    },
  },
  en: {
    header: {
      search: 'Search',
      cart: 'Cart',
      profile: 'Profile',
    },
  },
  ru: {
    header: {
      search: 'Поиск',
      cart: 'Корзина',
      profile: 'Профиль',
    },
  },
}
```

## Currency System

Similarly, use the currency hook:

```tsx
import { useCurrency } from '@/contexts/currency-context'

export default function PriceDisplay({ price }: { price: number }) {
  const { currency, formatPrice } = useCurrency()
  
  return <span>{formatPrice(price)}</span>
}
```

## Components Already Using Translations

- Language/Currency Selector - `/components/language-currency-selector.tsx`
- Chat Widget - Uses some translations

## Components That Need Translation Integration

### High Priority (User-Facing):
1. Header - navigation, search, cart, profile
2. Product Card - "Add to Cart", "Add to Wishlist"
3. Cart Page - all labels and buttons
4. Checkout - form labels
5. Hero Banner - main text
6. Footer - links and info

### Medium Priority:
7. Product filters and sorting
8. User profile
9. Orders page
10. Chat messages

## Testing Translation Changes

1. Run: `pnpm dev`
2. Click the language selector in the header (top-right on desktop, beside currency on mobile)
3. Verify text changes to selected language
4. Test on mobile and desktop

## Currency Formatting

Exchange rates are configured in `currency-context.tsx`:
- 1 USD = 12,500 UZS
- 1 RUB = 100 UZS

Prices automatically convert when currency is changed.
