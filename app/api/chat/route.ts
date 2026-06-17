import { generateSportxResponse } from '@/lib/ai'
import { parseLanguage, type Language } from '@/lib/translate'

const fallbackResponses: Record<Language, Record<string, string>> = {
  uz: {
    'return policy':
      "Biz barcha mahsulotlar uchun 30 kunlik qaytarish siyosatini taklif qilamiz. Mahsulot kiyilmagan va yorliqlari saqlangan bo'lishi kerak.",
    shipping:
      '1000000 dan ortiq buyurtmalarda bepul yetkazib berish! Standart yetkazib berish 35 000 so\'m, 5-7 ish kuni.',
    sizing:
      'Har bir mahsulot uchun batafsil o\'lcham jadvali mavjud. O\'lcham oralig\'ida qolsangiz, kiyimni kattaroq tanlashni tavsiya qilamiz.',
    default:
      "SPORTX yordamchisiman! Yetkazib berish, qaytarish, o'lcham va mahsulotlar haqida savollaringizga javob bera olaman.",
  },
  en: {
    'return policy':
      'We offer a 30-day return policy on all items. Items must be unworn with original tags attached.',
    shipping:
      'Free shipping on orders over 1,000,000 UZS! Standard delivery 35,000 UZS, 5-7 business days.',
    sizing:
      'We provide detailed size charts for each product. If between sizes, we recommend sizing up for athletic wear.',
    default:
      "I'm the SPORTX assistant! I can help with shipping, returns, sizing, and product questions.",
  },
  ru: {
    'return policy':
      'Мы предлагаем 30-дневную политику возврата. Товар должен быть не ношеным с оригинальными бирками.',
    shipping:
      'Бесплатная доставка при заказе от 1 000 000 сум! Стандартная доставка 35 000 сум, 5-7 рабочих дней.',
    sizing:
      'Для каждого товара есть таблица размеров. Если между размерами — рекомендуем брать больше.',
    default:
      'Я помощник SPORTX! Могу ответить на вопросы о доставке, возврате, размерах и товарах.',
  },
}

function getFallbackResponse(language: Language, userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()
  const responses = fallbackResponses[language]

  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response
    }
  }
  return responses.default
}

export async function POST(request: Request) {
  try {
    const { messages, language: reqLanguage } = await request.json()
    const language = parseLanguage(reqLanguage)

    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    try {
      const content = await generateSportxResponse(language, formattedMessages)
      return Response.json({ content })
    } catch (aiError) {
      console.error('Chat AI error:', aiError)
      const lastUserMessage = formattedMessages[formattedMessages.length - 1]?.content || ''
      return Response.json({
        content: getFallbackResponse(language, lastUserMessage),
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Failed to process chat message' }, { status: 500 })
  }
}
