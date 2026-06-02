import { generateText } from 'ai';
import { products } from '@/lib/data';

const modelId = 'anthropic/claude-3-5-sonnet';

function generateFallbackRecommendation(budget: string, activityType: string, filteredProducts: any[]): string {
  if (filteredProducts.length === 0) {
    return `I couldn't find products matching your criteria (${activityType} activity with ${budget} budget). Please try adjusting your preferences!`;
  }

  const recommendations = filteredProducts.slice(0, 3);
  let response = `Great! Based on your budget of ${budget} and ${activityType} activity, here are my top recommendations:\n\n`;
  
  recommendations.forEach((product, index) => {
    response += `${index + 1}. **${product.name}** (${product.price})\n`;
    response += `   Category: ${product.category}\n`;
    response += `   Rating: ${product.rating || 'N/A'}\n\n`;
  });

  response += `These products are perfect for your needs! Feel free to click on any product to view more details or add it to your cart.`;
  return response;
}

export async function POST(request: Request) {
  try {
    const { budget, activityType, messages } = await request.json();

    // Filter products based on budget and activity type
    const filteredProducts = products.filter((product) => {
      const priceNum = parseFloat(product.price.replace('$', ''));
      const budgetNum = parseFloat(budget.replace('$', ''));
      
      // Match activity type with categories
      const activityMatches = 
        (activityType.toLowerCase().includes('running') && product.category.toLowerCase().includes('shoe')) ||
        (activityType.toLowerCase().includes('gym') && (product.category.toLowerCase().includes('glove') || product.category.toLowerCase().includes('short') || product.category.toLowerCase().includes('shirt'))) ||
        (activityType.toLowerCase().includes('yoga') && product.category.toLowerCase().includes('legging')) ||
        (activityType.toLowerCase().includes('training') && (product.category.toLowerCase().includes('shirt') || product.category.toLowerCase().includes('legging') || product.category.toLowerCase().includes('short'))) ||
        (activityType.toLowerCase().includes('casual') && (product.category.toLowerCase().includes('shirt') || product.category.toLowerCase().includes('short') || product.category.toLowerCase().includes('legging'))) ||
        (activityType.toLowerCase().includes('sports') && (product.category.toLowerCase().includes('bra') || product.category.toLowerCase().includes('shirt') || product.category.toLowerCase().includes('short')));

      return priceNum <= budgetNum && activityMatches;
    });

    const systemPrompt = `You are a product recommendation expert for a sportswear store.

User Budget: ${budget}
User Activity: ${activityType}

Available products that match their criteria:
${filteredProducts.map(p => `- ${p.name} ($${p.price}) - ${p.category} - Rating: ${p.rating || 'N/A'}`).join('\n')}

Based on their budget and activity type, recommend 2-3 products from the list above. 
Explain why each product is suitable for their needs and activity level.
Be friendly and helpful.`;

    try {
      const response = await generateText({
        model: modelId,
        system: systemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        maxTokens: 600,
      });

      return Response.json({
        content: response.text,
        recommendedProducts: filteredProducts.slice(0, 3),
      });
    } catch (aiError: any) {
      // Use fallback recommendation if AI service fails
      const fallbackResponse = generateFallbackRecommendation(budget, activityType, filteredProducts);
      
      return Response.json({
        content: fallbackResponse,
        recommendedProducts: filteredProducts.slice(0, 3),
        isFallback: true,
      });
    }
  } catch (error) {
    console.error('Recommendation API error:', error);
    return Response.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
