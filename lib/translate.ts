import translations from '@/lib/translations'

export type Language = 'uz' | 'en' | 'ru'

export function translate(language: Language, key: string): string {
  const keys = key.split('.')
  let value: unknown = translations[language]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      let fallback: unknown = translations.en
      for (const k2 of keys) {
        if (fallback && typeof fallback === 'object' && k2 in fallback) {
          fallback = (fallback as Record<string, unknown>)[k2]
        } else {
          return key
        }
      }
      return typeof fallback === 'string' ? fallback : key
    }
  }

  return typeof value === 'string' ? value : key
}

export function parseLanguage(value: string | undefined | null): Language {
  if (value === 'uz' || value === 'en' || value === 'ru') return value
  return 'uz'
}
