'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import { Send, Zap } from 'lucide-react';

interface ChatInputProps {
  setShowRecommendationForm: (show: boolean) => void;
}

export default function ChatInput({
  setShowRecommendationForm,
}: ChatInputProps) {
  const { sendMessage, isLoading } = useChatBot();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input, 'faq');
    setInput('');
  };

  const handleRecommendClick = () => {
    setShowRecommendationForm(true);
  };

  return (
    <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleRecommendClick}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Zap className="w-4 h-4" />
          Recommend
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center">
        Powered by Claude AI
      </p>
    </div>
  );
}
