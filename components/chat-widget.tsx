'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatMessages from './chat-messages';
import ChatInput from './chat-input';

export default function ChatWidget() {
  const { isOpen, toggleChat, messages } = useChatBot();
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">Support Assistant</h2>
              <p className="text-sm text-white/80">Ask me anything!</p>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">
                  Welcome!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  I can help you with:
                </p>
                <div className="space-y-2 w-full">
                  <button
                    onClick={() => setShowRecommendationForm(true)}
                    className="w-full px-3 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
                  >
                    Get Product Recommendations
                  </button>
                  <p className="text-xs text-gray-500">
                    Or ask me any questions about our products!
                  </p>
                </div>
              </div>
            ) : (
              <ChatMessages showRecommendationForm={showRecommendationForm} />
            )}
          </div>

          {/* Input Area */}
          <ChatInput setShowRecommendationForm={setShowRecommendationForm} />
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-primary text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
