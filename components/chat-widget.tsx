'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import { useLanguage } from '@/contexts/language-context';
import { MessageCircle, X } from 'lucide-react';
import ChatMessages from './chat-messages';
import ChatInput from './chat-input';
import RecommendationForm from './recommendation-form';

export default function ChatWidget() {
  const { isOpen, toggleChat, messages } = useChatBot();
  const { t } = useLanguage();
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 z-40 sm:left-6 md:bottom-6">
      {isOpen && (
        <div className="absolute bottom-full mb-3 left-0 flex h-[min(600px,calc(100vh-8rem))] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-accent to-accent/80 p-4 text-accent-foreground sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent-foreground/20 p-2">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold">{t('chat.assistantTitle')}</h2>
                <p className="text-xs text-accent-foreground/80">{t('chat.poweredBy')}</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="rounded-full p-2 transition-colors hover:bg-accent-foreground/10"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-background">
            {messages.length === 0 && !showRecommendationForm ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-4">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{t('chat.hello')}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{t('chat.welcomeMessage')}</p>
                <div className="w-full space-y-3">
                  <button
                    onClick={() => setShowRecommendationForm(true)}
                    className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    {t('chat.getRecommendations')}
                  </button>
                  <p className="text-xs text-muted-foreground">{t('chat.askAnything')}</p>
                </div>
              </div>
            ) : messages.length === 0 && showRecommendationForm ? (
              <div className="p-4">
                <RecommendationForm onSubmitted={() => setShowRecommendationForm(false)} />
              </div>
            ) : (
              <ChatMessages
                showRecommendationForm={showRecommendationForm}
                onRecommendationSubmitted={() => setShowRecommendationForm(false)}
              />
            )}
          </div>

          <ChatInput setShowRecommendationForm={setShowRecommendationForm} />
        </div>
      )}

      <button
        onClick={toggleChat}
        className="flex items-center justify-center rounded-full bg-accent p-4 text-accent-foreground shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
