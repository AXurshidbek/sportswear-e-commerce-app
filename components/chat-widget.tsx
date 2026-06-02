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
        <div className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent-foreground/20 rounded-lg p-2">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base">SPORTX Assistant</h2>
                <p className="text-xs text-accent-foreground/80">Powered by Claude AI</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-accent-foreground/10 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-background">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-accent/10 rounded-full p-4 mb-4">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Hello! 👋
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  I can help you find the perfect gear for your activities!
                </p>
                <div className="space-y-3 w-full">
                  <button
                    onClick={() => setShowRecommendationForm(true)}
                    className="w-full px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Get Recommendations
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Or ask me about shipping, returns, sizing, and more!
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
        className="bg-accent text-accent-foreground rounded-full p-4 shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all duration-200 flex items-center justify-center"
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
