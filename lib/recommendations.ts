import type { Product } from '@/lib/data'
import { formatPriceValue } from '@/lib/currency'
import type { Language } from '@/lib/translate'

const ACTIVITY_PROFILES: { id: string; keywords: string[]; categories: string[]; subcategories: string[] }[] = [
  {
    id: 'running',
    keywords: ['run', 'yugur', 'бег', 'jog', 'marafon', 'krossovk', 'sneaker', 'shoe', 'oyoq', 'maktab'],
    categories: ['men', 'women', 'kids'],
    subcategories: ['shoes'],
  },
  {
    id: 'gym',
    keywords: ['gym', 'zal', 'mashq', 'train', 'fitnes', 'fitness', 'crossfit', 'kuch', 'силов', 'тренир'],
    categories: ['men', 'women'],
    subcategories: ['tops', 'bottoms', 'gloves'],
  },
  {
    id: 'yoga',
    keywords: ['yoga', 'йога', 'leggin', 'losin', 'stretch', 'flex', 'moslash', 'гибк'],
    categories: ['women'],
    subcategories: ['bottoms', 'tops'],
  },
  {
    id: 'sports',
    keywords: ['sport', 'forma', 'jersi', 'jersey', 'bra', 'футбол', 'футболк', 'team', 'футбол'],
    categories: ['men', 'women', 'kids'],
    subcategories: ['tops', 'bottoms', 'shoes'],
  },
  {
    id: 'casual',
    keywords: ['casual', 'kundalik', 'futbolka', 'tee', 'shirt', 'повседнев', 'kiyim'],
    categories: ['men', 'women', 'kids', 'accessories'],
    subcategories: ['tops', 'clothing', 'bags', 'socks'],
  },
]

function productSearchText(product: Product): string {
  return [
    product.name,
    product.category,
    product.subcategory,
    product.brand,
    product.description,
    ...product.features,
    ...product.tags,
  ]
    .join(' ')
    .toLowerCase()
}

function scoreProduct(product: Product, activityText: string): number {
  const text = productSearchText(product)
  const activity = activityText.toLowerCase()
  let score = 0

  for (const profile of ACTIVITY_PROFILES) {
    const profileHit =
      profile.id === activity ||
      profile.keywords.some((kw) => activity.includes(kw) || text.includes(kw))
    if (!profileHit) continue

    if (profile.categories.includes(product.category)) score += 4
    if (profile.subcategories.includes(product.subcategory)) score += 5
    profile.keywords.forEach((kw) => {
      if (activity.includes(kw)) score += 3
      if (text.includes(kw)) score += 2
    })
    if (profile.id === activity) score += 6
  }

  if (product.tags.includes('bestseller')) score += 2
  score += product.rating * 0.5

  // Direct word overlap between activity and product
  activity
    .split(/[\s,/]+/)
    .filter((w) => w.length > 3)
    .forEach((word) => {
      if (text.includes(word)) score += 2
    })

  return score
}

export function recommendProducts(
  products: Product[],
  budgetUzs: number,
  activityText: string,
  limit = 3,
): Product[] {
  const budget = Number.isFinite(budgetUzs) && budgetUzs > 0 ? budgetUzs : 1_000_000
  const withinBudget = products.filter((p) => p.price <= budget)

  const scored = withinBudget
    .map((product) => ({ product, score: scoreProduct(product, activityText) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)

  if (scored.length > 0) {
    return scored.slice(0, limit).map((item) => item.product)
  }

  // Byudjet ichidagi eng yuqori reytingli mahsulotlar
  return [...withinBudget].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

const ACTIVITY_LABELS: Record<Language, Record<string, string>> = {
  uz: {
    running: 'Yugurish',
    gym: 'Zal / Kuch mashqlari',
    yoga: 'Yoga / Moslashuvchanlik',
    sports: 'Sport',
    casual: 'Kundalik kiyim',
  },
  en: {
    running: 'Running',
    gym: 'Gym / Strength Training',
    yoga: 'Yoga / Flexibility',
    sports: 'Sports',
    casual: 'Casual Wear',
  },
  ru: {
    running: 'Бег',
    gym: 'Зал / Силовые тренировки',
    yoga: 'Йога / Гибкость',
    sports: 'Спорт',
    casual: 'Повседневная одежда',
  },
}

function getActivityLabel(language: Language, activityText: string): string {
  return ACTIVITY_LABELS[language][activityText] ?? activityText
}

export function buildRecommendationFallback(
  language: Language,
  activityText: string,
  budgetLabel: string,
  products: Product[],
): string {
  const activityLabel = getActivityLabel(language, activityText)

  if (products.length === 0) {
    return language === 'uz'
      ? `Kechirasiz, ${budgetLabel} byudjetda ${activityLabel} uchun mos mahsulot topilmadi. Byudjetni oshirishni yoki boshqa faoliyat turini tanlashni sinab ko'ring.`
      : language === 'ru'
        ? `К сожалению, в бюджете ${budgetLabel} не найдено подходящих товаров для «${activityLabel}». Попробуйте увеличить бюджет или выбрать другой вид активности.`
        : `Sorry, no products found for ${activityLabel} within a ${budgetLabel} budget. Try increasing your budget or choosing a different activity.`
  }

  const intro =
    language === 'uz'
      ? `${activityLabel} uchun ${budgetLabel} byudjet asosida tavsiyalarim:\n\n`
      : language === 'ru'
        ? `Мои рекомендации для «${activityLabel}» с бюджетом ${budgetLabel}:\n\n`
        : `My recommendations for ${activityLabel} with a ${budgetLabel} budget:\n\n`

  const body = products
    .map((p, i) => {
      const price = formatPriceValue(p.price, 'UZS')
      const reason =
        language === 'uz'
          ? `${p.category}/${p.subcategory}, reyting ${p.rating}`
          : language === 'ru'
            ? `${p.category}/${p.subcategory}, рейтинг ${p.rating}`
            : `${p.category}/${p.subcategory}, rating ${p.rating}`
      return `${i + 1}. **${p.name}** — ${price}\n   ${reason}`
    })
    .join('\n\n')

  const footer =
    language === 'uz'
      ? '\n\nMahsulot sahifasiga o\'tish uchun katalogdan tanlang yoki savatga qo\'shing!'
      : language === 'ru'
        ? '\n\nВыберите товар в каталоге, чтобы посмотреть детали или добавить в корзину!'
        : '\n\nBrowse the catalog to view details or add items to your cart!'

  return intro + body + footer
}

export function searchProducts(products: Product[], query: string, limit = 5): Product[] {
  const queryLower = query.toLowerCase().trim()
  if (!queryLower) return []

  const words = queryLower.split(/\s+/).filter((w) => w.length > 1)

  const scored = products
    .map((product) => {
      const text = productSearchText(product)
      let score = 0
      if (text.includes(queryLower)) score += 10
      words.forEach((word) => {
        if (text.includes(word)) score += 3
      })
      return { product, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)

  return scored.slice(0, limit).map((item) => item.product)
}
