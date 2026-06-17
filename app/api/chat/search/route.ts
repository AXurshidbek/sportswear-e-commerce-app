import { generateSportxResponse } from '@/lib/ai'
import { localizeProducts } from '@/lib/product-i18n'
import { searchProducts } from '@/lib/recommendations'
import { formatPriceValue } from '@/lib/currency'
import { parseLanguage, type Language } from '@/lib/translate'

function buildSearchFallback(language: Language, query: string, results: ReturnType<typeof searchProducts>) {
  if (results.length === 0) {
    return language === 'uz'
      ? `"${query}" bo'yicha mahsulot topilmadi. Boshqa kalit so'z bilan qidiring yoki katalogdan ko'ring.`
      : language === 'ru'
        ? `По запросу «${query}» ничего не найдено. Попробуйте другие ключевые слова.`
        : `No products found for "${query}". Try different keywords or browse the catalog.`
  }

  const intro =
    language === 'uz'
      ? `"${query}" bo'yicha topilgan mahsulotlar:\n\n`
      : language === 'ru'
        ? `Результаты по запросу «${query}»:\n\n`
        : `Results for "${query}":\n\n`

  const body = results
    .map((p, i) => `${i + 1}. **${p.name}** — ${formatPriceValue(p.price, 'UZS')} (${p.rating}★)`)
    .join('\n')

  return intro + body
}

export async function POST(request: Request) {
  try {
    const { query, messages, language: reqLanguage } = await request.json()
    const language = parseLanguage(reqLanguage)
    const catalog = localizeProducts(language)
    const searchResults = searchProducts(catalog, String(query), 5)

    const extraContext = `## Search request
Query: "${query}"

Matching products:
${searchResults.map((p) => `- ${p.name} — ${formatPriceValue(p.price, 'UZS')} — ${p.category} — ${p.description.slice(0, 100)}`).join('\n') || 'No direct matches.'}

Help the customer understand which products best match their search.`

    try {
      const content = await generateSportxResponse(
        language,
        messages.map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        extraContext,
      )

      return Response.json({ content, results: searchResults })
    } catch (error) {
      console.error('AI search fallback:', error)
      return Response.json({
        content: buildSearchFallback(language, String(query), searchResults),
        results: searchResults,
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Search API error:', error)
    return Response.json({ error: 'Failed to process search' }, { status: 500 })
  }
}
