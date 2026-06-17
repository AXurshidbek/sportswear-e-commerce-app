'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import { useLanguage } from '@/contexts/language-context';
import { Send, Zap } from 'lucide-react';

interface ChatInputProps {
  setShowRecommendationForm: (show: boolean) => void;
}

export default function ChatInput({ setShowRecommendationForm }: ChatInputProps) {
  const { sendMessage, isLoading } = useChatBot();
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input, 'faq');
    setInput('');
  };

  return (
    <div className="space-y-3 border-t border-border bg-secondary p-4">
      <div className="flex gap-2">
        <button
          onClick={() => setShowRecommendationForm(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Zap className="h-4 w-4" />
          {t('chat.recommend')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat.askAnything')}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-accent p-2 text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
