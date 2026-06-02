'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

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
  sendMessage: (content: string, type?: 'faq' | 'recommend' | 'search') => Promise<void>;
  toggleChat: () => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
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
    async (content: string, type: 'faq' | 'recommend' | 'search' = 'faq') => {
      if (!content.trim()) return;

      // Add user message
      addMessage('user', content);
      setIsLoading(true);

      try {
        let endpoint = '/api/chat';
        let payload: any = {
          messages: messages.concat([{ role: 'user', content }]).map(m => ({
            role: m.role,
            content: m.content,
          })),
        };

        if (type === 'recommend' && budget && activityType) {
          endpoint = '/api/chat/recommend';
          payload.budget = budget;
          payload.activityType = activityType;
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
        addMessage('assistant', data.content);
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage(
          'assistant',
          'Sorry, I encountered an error. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, budget, activityType, addMessage]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setBudget('');
    setActivityType('');
  }, []);

  const value: ChatContextType = {
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
  };

  return (
    <ChatContext.Provider value={value}>
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
