import { generateText } from 'ai';
import { products } from '@/lib/data';

const modelId = 'anthropic/claude-3-5-sonnet';

function generateFallbackSearchResponse(query: string, searchResults: any[]): string {
  if (searchResults.length === 0) {
    return `I couldn't find any products matching "${query}". Try searching for something like "running shoes", "training shirt", or "leggings". What would you like to find?`;
  }

  let response = `I found ${searchResults.length} product(s) matching "${query}":\n\n`;
  
  searchResults.forEach((product, index) => {
    response += `${index + 1}. **${product.name}** (${product.category}) - ${product.price}\n`;
    response += `   Rating: ${product.rating || 'N/A'}\n\n`;
  });

  response += `Feel free to click on any product to view full details or add it to your cart!`;
  return response;
}

export async function POST(request: Request) {
  try {
    const { query, messages } = await request.json();

    // Perform semantic search on products
    const searchResults = products.filter((product) => {
      const searchText = `${product.name} ${product.category} ${product.description || ''}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      return searchText.includes(queryLower) || 
             queryLower.split(' ').some(word => searchText.includes(word));
    }).slice(0, 5);

    const systemPrompt = `You are a helpful shopping assistant for a sportswear store.

Search Query: "${query}"

Here are the relevant products we found:
${searchResults.map(p => `- ${p.name} (${p.category}) - $${p.price} - Rating: ${p.rating || 'N/A'}`).join('\n')}

Based on the search results, help the customer find what they're looking for.
- Explain which products match their search
- Highlight key features and benefits
- Help them decide between options if multiple products are relevant
- Suggest related items if helpful

Be friendly and concise.`;

    try {
      const response = await generateText({
        model: modelId,
        system: systemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        maxTokens: 500,
      });

      return Response.json({
        content: response.text,
        results: searchResults,
      });
    } catch (aiError: any) {
      // Use fallback search response if AI service fails
      console.log('AI Gateway error in search, using fallback:', aiError.message);
      const fallbackResponse = generateFallbackSearchResponse(query, searchResults);
      
      return Response.json({
        content: fallbackResponse,
        results: searchResults,
        isFallback: true,
      });
    }
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}
