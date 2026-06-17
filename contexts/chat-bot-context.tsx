'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/language-context';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  budget: string;
  activityType: string;
  setBudget: (budget: string) => void;
  setActivityType: (activityType: string) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  sendMessage: (
    content: string,
    type?: 'faq' | 'recommend' | 'search',
    meta?: { budget?: string; activityType?: string },
  ) => Promise<void>;
  toggleChat: () => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState('');
  const [activityType, setActivityType] = useState('');

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(
    async (
      content: string,
      type: 'faq' | 'recommend' | 'search' = 'faq',
      meta?: { budget?: string; activityType?: string },
    ) => {
      if (!content.trim()) return;

      addMessage('user', content);
      setIsLoading(true);

      const activeBudget = meta?.budget ?? budget;
      const activeActivity = meta?.activityType ?? activityType;

      try {
        let endpoint = '/api/chat';
        const history = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user' as const, content },
        ];
        const payload: Record<string, unknown> = {
          language,
          messages: history,
        };

        if (type === 'recommend' && activeBudget && activeActivity) {
          endpoint = '/api/chat/recommend';
          payload.budget = activeBudget;
          payload.activityType = activeActivity;
        } else if (type === 'search') {
          endpoint = '/api/chat/search';
          payload.query = content;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Failed to get response');

        const data = await response.json();
        const reply =
          typeof data.content === 'string' && data.content.trim()
            ? data.content
            : t('chat.errorMessage');
        addMessage('assistant', reply);
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage('assistant', t('chat.errorMessage'));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, budget, activityType, addMessage, language, t],
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setBudget('');
    setActivityType('');
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isOpen,
        budget,
        activityType,
        setBudget,
        setActivityType,
        addMessage,
        sendMessage,
        toggleChat,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatBot() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatBot must be used within a ChatProvider');
  }
  return context;
}
