import { generateText } from 'ai';

const modelId = 'anthropic/claude-3-5-sonnet';

const systemPrompt = `You are a helpful customer service AI assistant for a sportswear e-commerce store. You help customers with:

1. **Frequently Asked Questions**: Answer questions about shipping, returns, sizing, materials, care instructions, and general product information.
2. **Product Recommendations**: When users provide their budget and activity type, recommend suitable products from our catalog.
3. **Smart Search**: Help customers find products using natural language.

Be friendly, professional, and concise. Always maintain context of the conversation.

When answering FAQs:
- Be clear and helpful
- Provide specific information when available
- Suggest related products if relevant

When recommending products:
- Ask for budget and activity type if not provided
- Consider quality and price balance
- Recommend 2-3 products
- Explain why each product is suitable

Available product categories: Running Shoes, Training T-shirts, Athletic Leggings, Training Shorts, Sports Bras, Gym Gloves`;

// Fallback responses for common questions when API is not available
const fallbackResponses: { [key: string]: string } = {
  'return policy': 'We offer a 30-day return policy on all items. Items must be unworn and with original tags attached. Simply contact our customer service with your order number to initiate a return. Refunds are processed within 5-7 business days after we receive the item.',
  'shipping': 'We offer free shipping on orders over $100! Standard shipping typically takes 5-7 business days. Express shipping (2-3 days) is available for $15. All orders are tracked and you\'ll receive an email with your tracking number.',
  'sizing': 'We provide detailed size charts for each product. Measurements are in inches for US sizes. If you\'re between sizes, we recommend sizing up for athletic wear to allow for movement. Contact our customer service if you need personalized sizing assistance!',
  'materials': 'Our sportswear is made from high-quality, breathable fabrics including polyester, nylon, and spandex blends. All materials are moisture-wicking and designed for optimal performance during various activities.',
  'care': 'Most items are machine washable. We recommend washing in cold water with similar colors and air drying to maintain quality. Avoid bleach and fabric softeners. For detailed care instructions, check the label inside each item.',
};

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(fallbackResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return 'Thanks for your question! I\'m a helpful assistant for SPORTX. I can answer questions about our return policy, shipping, sizing, materials, and product care. What would you like to know?';
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Convert messages to the format expected by generateText
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await generateText({
        model: modelId,
        system: systemPrompt,
        messages: formattedMessages,
        temperature: 0.7,
        maxTokens: 500,
      });

      return Response.json({
        content: response.text,
      });
    } catch (aiError: any) {
      // If AI Gateway fails, use fallback responses
      console.log('AI Gateway error, using fallback:', aiError.message);
      const lastUserMessage = formattedMessages[formattedMessages.length - 1]?.content || '';
      const fallbackResponse = getFallbackResponse(lastUserMessage);
      
      return Response.json({
        content: fallbackResponse,
        isFallback: true,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
