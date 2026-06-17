import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import type { Language } from '@/lib/translate'
import { getCatalogSummary } from '@/lib/product-i18n'

export const geminiModel = google('gemini-2.5-flash')

const LANGUAGE_NAMES: Record<Language, string> = {
  uz: "O'zbek",
  en: 'English',
  ru: 'Russian',
}

export function buildSportxSystemPrompt(language: Language): string {
  const catalog = getCatalogSummary(language)

  return `You are the SPORTX AI Assistant — a knowledgeable customer service agent for SPORTX, a premium sportswear e-commerce marketplace based in Uzbekistan.

CRITICAL: Always respond in ${LANGUAGE_NAMES[language]} language only.

## About SPORTX
- Multi-vendor marketplace for sportswear: football jerseys, training apparel, shoes, accessories
- Target customers: men, women, and kids
- Brands: SPORTX, SPORTX Junior, Nike, Adidas, and more
- Currencies: UZS (so'm) and USD
- Payment methods: Payme, credit/debit cards (Humo, Uzcard, Visa, Mastercard), cash on delivery
- Free shipping on orders over 1,000,000 UZS (~$80)
- 30-day return policy: items must be unworn with original tags
- Standard delivery: 5-7 business days (35,000 UZS); express: 2-3 days

## Your responsibilities
1. Answer FAQs about shipping, returns, sizing, materials, and product care
2. Recommend 2-3 products based on customer budget and activity type
3. Help customers find products using natural language search
4. Answer detailed questions about specific products from the catalog below
5. Be friendly, professional, and concise (max 4 short paragraphs)

## Product catalog (current language, prices in UZS)
${catalog}

When recommending products:
- Mention exact product name and price in UZS
- Explain why each product fits the customer's activity and budget
- Suggest max 3 products
- If nothing fits the budget, suggest the closest alternatives honestly`
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function generateSportxResponse(
  language: Language,
  messages: ChatMessage[],
  extraSystemContext?: string,
): Promise<string> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured')
  }

  const system = extraSystemContext
    ? `${buildSportxSystemPrompt(language)}\n\n${extraSystemContext}`
    : buildSportxSystemPrompt(language)

  const response = await generateText({
    model: geminiModel,
    system,
    messages: messages.filter((m) => m.role === 'user' || m.role === 'assistant'),
    temperature: 0.7,
    maxOutputTokens: 800,
  })

  return response.text
}
