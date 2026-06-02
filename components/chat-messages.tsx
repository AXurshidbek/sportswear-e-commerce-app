'use client';

import { useEffect, useRef } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import RecommendationForm from './recommendation-form';

interface ChatMessagesProps {
  showRecommendationForm: boolean;
}

export default function ChatMessages({
  showRecommendationForm,
}: ChatMessagesProps) {
  const { messages, isLoading } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-4 space-y-4 flex flex-col overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs px-4 py-3 rounded-lg text-sm whitespace-pre-wrap ${
              message.role === 'user'
                ? 'bg-accent text-accent-foreground rounded-br-none'
                : 'bg-secondary text-secondary-foreground rounded-bl-none'
            }`}
          >
            {message.content}
            <span className={`text-xs opacity-60 mt-1 block ${
              message.role === 'user' ? 'text-accent-foreground' : 'text-secondary-foreground'
            }`}>
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}

      {showRecommendationForm && messages.length > 0 && (
        <RecommendationForm />
      )}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg rounded-bl-none">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
