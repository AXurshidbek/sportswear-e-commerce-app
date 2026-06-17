import type { Product } from '@/lib/data'
import { products } from '@/lib/data'
import type { Language } from '@/lib/translate'

interface ProductLocaleContent {
  name: string
  description: string
  features: string[]
  tags: string[]
  colorNames: string[]
}

const PRODUCT_I18N: Record<string, Partial<Record<Language, ProductLocaleContent>>> = {
  '1': {
    en: {
      name: "Real Madrid Men's Home Jersey",
      description:
        "Achieve outstanding results with the Pro Running Shoes X1. Designed for professional runners who demand the best performance and comfort.",
      features: [
        'Lightweight mesh upper',
        'Responsive cushioning',
        'Durable rubber outsole',
        'Breathable design',
      ],
      tags: ['running', 'performance', 'bestseller'],
      colorNames: ['Black', 'White', 'Red'],
    },
    ru: {
      name: 'Домашняя футболка Real Madrid (мужская)',
      description:
        'Достигайте выдающихся результатов с Pro Running Shoes X1. Создано для профессиональных бегунов, которые требуют максимума.',
      features: [
        'Легкий сетчатый верх',
        'Амортизация с быстрым откликом',
        'Прочная резиновая подошва',
        'Дышащий дизайн',
      ],
      tags: ['бег', 'производительность', 'хит продаж'],
      colorNames: ['Черный', 'Белый', 'Красный'],
    },
  },
  '2': {
    en: {
      name: 'Elite Sport Training T-Shirt',
      description:
        'Stay cool and comfortable during intense workouts with our Elite Sport training t-shirt.',
      features: [
        'Moisture-wicking fabric',
        'Four-way stretch',
        'Anti-odor technology',
        'Flat-lock seams',
      ],
      tags: ['workout', 'fitness', 'essential'],
      colorNames: ['Black', 'Navy Blue', 'Gray'],
    },
    ru: {
      name: 'Элитная спортивная футболка',
      description:
        'Ощущайте прохладу и комфорт во время интенсивных тренировок в нашей элитной спортивной футболке.',
      features: [
        'Влагоотводящая ткань',
        'Четырехсторонняя эластичность',
        'Антибактериальная технология',
        'Плоские швы',
      ],
      tags: ['тренировка', 'фитнес', 'базовый'],
      colorNames: ['Черный', 'Темно-синий', 'Серый'],
    },
  },
  '3': {
    en: {
      name: "Barcelona Women's Stadium Jersey",
      description:
        'High-quality leggings with excellent stretch and support for any workout session.',
      features: [
        'High-waist design',
        'Hidden pocket',
        'Squat-proof fabric',
        'Compression fit',
      ],
      tags: ['yoga', 'fitness', 'bestseller'],
      colorNames: ['Black', 'Deep Purple', 'Teal'],
    },
    ru: {
      name: 'Женская футболка Barcelona',
      description:
        'Высококачественные леггинсы с отличной эластичностью и поддержкой для любых тренировок.',
      features: [
        'Высокая посадка',
        'Скрытый карман',
        'Непрозрачная ткань',
        'Компрессионная посадка',
      ],
      tags: ['йога', 'фитнес', 'хит продаж'],
      colorNames: ['Черный', 'Темно-фиолетовый', 'Бирюзовый'],
    },
  },
  '4': {
    en: {
      name: 'CrossFit Training Shorts',
      description:
        'Built for intense CrossFit sessions with maximum mobility and durability.',
      features: [
        'Quick-dry fabric',
        'Inner liner',
        'Reinforced stitching',
        'Deep pockets',
      ],
      tags: ['crossfit', 'workout', 'performance'],
      colorNames: ['Black', 'Gray'],
    },
    ru: {
      name: 'Шорты для кроссфита',
      description:
        'Созданы для интенсивных кроссфит-тренировок с максимальной свободой движений и прочностью.',
      features: [
        'Быстросохнущая ткань',
        'Внутренняя подкладка',
        'Усиленные швы',
        'Глубокие карманы',
      ],
      tags: ['кроссфит', 'тренировка', 'производительность'],
      colorNames: ['Черный', 'Серый'],
    },
  },
  '5': {
    en: {
      name: "Women's Pro Sports Bra",
      description:
        'Maximum support sports bra designed for high-intensity activities.',
      features: [
        'High-impact support',
        'Adjustable straps',
        'Moisture-wicking',
        'Removable pads',
      ],
      tags: ['sports bra', 'running', 'fitness'],
      colorNames: ['Black', 'White', 'Pink'],
    },
    ru: {
      name: 'Женский спортивный топ Pro',
      description:
        'Спортивный топ с максимальной поддержкой для высокоинтенсивных нагрузок.',
      features: [
        'Высокая степень поддержки',
        'Регулируемые бретели',
        'Влагоотводящий материал',
        'Съемные вкладыши',
      ],
      tags: ['спортивный топ', 'бег', 'фитнес'],
      colorNames: ['Черный', 'Белый', 'Розовый'],
    },
  },
  '6': {
    en: {
      name: "Kids' Running Sneakers",
      description:
        'Lightweight and durable sneakers designed for active children.',
      features: [
        'Easy Velcro straps',
        'Soft sole',
        'Non-marking outsole',
        'Breathable mesh',
      ],
      tags: ['kids', 'running', 'school'],
      colorNames: ['Blue/Green', 'Pink/Purple'],
    },
    ru: {
      name: 'Детские беговые кроссовки',
      description:
        'Легкие и прочные кроссовки для активных детей.',
      features: [
        'Удобные липучки',
        'Мягкая подошва',
        'Немаркая подошва',
        'Дышащая сетка',
      ],
      tags: ['дети', 'бег', 'школа'],
      colorNames: ['Синий/Зеленый', 'Розовый/Фиолетовый'],
    },
  },
  '7': {
    en: {
      name: 'Spacious Gym Duffel Bag',
      description:
        'A roomy gym bag with dedicated compartments for all your gear.',
      features: [
        'Separate shoe compartment',
        'Water-resistant fabric',
        'Padded shoulder strap',
        'Multiple pockets',
      ],
      tags: ['fitness', 'travel', 'essential'],
      colorNames: ['Black', 'Navy Blue'],
    },
    ru: {
      name: 'Вместительная спортивная сумка',
      description:
        'Просторная спортивная сумка с отдельными отделениями для всех вещей.',
      features: [
        'Отделение для обуви',
        'Водоотталкивающая ткань',
        'Мягкий ремень',
        'Множество карманов',
      ],
      tags: ['фитнес', 'путешествие', 'базовый'],
      colorNames: ['Черный', 'Темно-синий'],
    },
  },
  '8': {
    en: {
      name: 'Compression Socks (3 Pairs)',
      description:
        'Performance compression socks designed to improve circulation and recovery.',
      features: [
        'Arch support',
        'Cushioned heel',
        'Seamless toe',
        'Moisture control',
      ],
      tags: ['running', 'recovery', 'essential'],
      colorNames: ['Black', 'White'],
    },
    ru: {
      name: 'Компрессионные носки (3 пары)',
      description:
        'Компрессионные носки для улучшения кровообращения и восстановления.',
      features: [
        'Поддержка свода стопы',
        'Мягкая пятка',
        'Бесшовный носок',
        'Контроль влаги',
      ],
      tags: ['бег', 'восстановление', 'базовый'],
      colorNames: ['Черный', 'Белый'],
    },
  },
}

function getUzContent(product: Product): ProductLocaleContent {
  return {
    name: product.name,
    description: product.description,
    features: product.features,
    tags: product.tags,
    colorNames: product.colors.map((c) => c.name),
  }
}

function getLocaleContent(product: Product, language: Language): ProductLocaleContent {
  if (language === 'uz') return getUzContent(product)
  const localized = PRODUCT_I18N[product.id]?.[language]
  if (localized) return localized
  return getUzContent(product)
}

export function localizeProduct(product: Product, language: Language): Product {
  const content = getLocaleContent(product, language)
  return {
    ...product,
    name: content.name,
    description: content.description,
    features: content.features,
    tags: content.tags,
    colors: product.colors.map((color, index) => ({
      hex: color.hex,
      name: content.colorNames[index] ?? color.name,
    })),
  }
}

export function localizeProducts(language: Language): Product[] {
  return products.map((p) => localizeProduct(p, language))
}

export function getProductById(id: string, language: Language): Product | undefined {
  const product = products.find((p) => p.id === id)
  if (!product) return undefined
  return localizeProduct(product, language)
}

export function getCatalogSummary(language: Language): string {
  return localizeProducts(language)
    .map(
      (p) =>
        `- ID: ${p.id} | ${p.name} | ${p.price} UZS | ${p.category}/${p.subcategory} | ${p.brand} | Rating: ${p.rating} | ${p.description}`,
    )
    .join('\n')
}
