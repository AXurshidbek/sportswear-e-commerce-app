import { generateSportxResponse } from '@/lib/ai'
import { localizeProducts } from '@/lib/product-i18n'
import { recommendProducts, buildRecommendationFallback } from '@/lib/recommendations'
import { formatPriceValue } from '@/lib/currency'
import { parseLanguage } from '@/lib/translate'

export async function POST(request: Request) {
  try {
    const { budget, activityType, messages, language: reqLanguage } = await request.json()
    const language = parseLanguage(reqLanguage)
    const catalog = localizeProducts(language)

    const budgetNum = parseInt(String(budget).replace(/\D/g, ''), 10) || 1_000_000
    const activity = String(activityType || '')
    const recommended = recommendProducts(catalog, budgetNum, activity, 3)

    const budgetLabel = formatPriceValue(budgetNum, 'UZS')

    const extraContext = `## Recommendation request
User budget: ${budgetLabel} (${budgetNum} UZS max)
User activity: ${activity}

Pre-filtered best matches (use these as primary recommendations):
${recommended.map((p, i) => `${i + 1}. ${p.name} — ${formatPriceValue(p.price, 'UZS')} — ${p.category}/${p.subcategory} — rating ${p.rating} — ${p.description.slice(0, 120)}`).join('\n') || 'No products within budget — suggest closest options from catalog.'}

Respond with 2-3 personalized recommendations from the list above. Include product name, price, and why it suits their activity.`

    try {
      const content = await generateSportxResponse(
        language,
        messages.map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        extraContext,
      )

      return Response.json({
        content,
        recommendedProducts: recommended,
      })
    } catch (error) {
      console.error('AI recommendation fallback:', error)
      return Response.json({
        content: buildRecommendationFallback(language, activity, budgetLabel, recommended),
        recommendedProducts: recommended,
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Recommendation API error:', error)
    return Response.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
