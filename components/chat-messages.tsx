'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import RecommendationForm from './recommendation-form';

interface ChatMessagesProps {
  showRecommendationForm: boolean;
  onRecommendationSubmitted?: () => void;
}

function formatMessageTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export default function ChatMessages({
  showRecommendationForm,
  onRecommendationSubmitted,
}: ChatMessagesProps) {
  const { messages, isLoading } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm ${
              message.role === 'user'
                ? 'rounded-br-none bg-accent text-accent-foreground'
                : 'rounded-bl-none bg-secondary text-secondary-foreground'
            }`}
          >
            {message.content}
            {mounted && (
              <span
                className={`mt-1 block text-xs opacity-60 ${
                  message.role === 'user' ? 'text-accent-foreground' : 'text-secondary-foreground'
                }`}
              >
                {formatMessageTime(message.timestamp)}
              </span>
            )}
          </div>
        </div>
      ))}

      {showRecommendationForm && (
        <RecommendationForm onSubmitted={onRecommendationSubmitted} />
      )}

      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-lg rounded-bl-none bg-secondary px-4 py-2 text-secondary-foreground">
            <div className="flex space-x-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: '0.1s' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
