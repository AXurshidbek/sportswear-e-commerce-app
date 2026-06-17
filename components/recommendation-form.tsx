'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';
import { useLanguage } from '@/contexts/language-context';
import { useCurrency } from '@/contexts/currency-context';

const ACTIVITY_KEYS = ['running', 'gym', 'yoga', 'sports', 'casual'] as const;
const BUDGET_OPTIONS = [
  { key: '200k', amount: 200_000 },
  { key: '400k', amount: 400_000 },
  { key: '600k', amount: 600_000 },
  { key: '800k', amount: 800_000 },
  { key: '1000k', amount: 1_000_000 },
] as const;

interface RecommendationFormProps {
  onSubmitted?: () => void;
}

export default function RecommendationForm({ onSubmitted }: RecommendationFormProps) {
  const { budget, activityType, setBudget, setActivityType, sendMessage } = useChatBot();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [localBudget, setLocalBudget] = useState(budget);
  const [localActivity, setLocalActivity] = useState(activityType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localBudget || !localActivity) return;

    setBudget(localBudget);
    setActivityType(localActivity);

    const budgetLabel = BUDGET_OPTIONS.find((b) => String(b.amount) === localBudget);
    const budgetText = budgetLabel ? t(`chat.budgets.${budgetLabel.key}`) : formatPrice(Number(localBudget));

    const activityLabel = t(`chat.activities.${localActivity as (typeof ACTIVITY_KEYS)[number]}`);

    const message =
      language === 'uz'
        ? `Mening byudjetim ${budgetText} va men ${activityLabel} uchun mahsulot qidiryapman. Tavsiya bera olasizmi?`
        : language === 'ru'
          ? `Мой бюджет ${budgetText}, ищу товары для ${activityLabel}. Можете порекомендовать?`
          : `I have a budget of ${budgetText} and I'm looking for products for ${activityLabel}. Can you recommend some products?`;

    await sendMessage(message, 'recommend', {
      budget: localBudget,
      activityType: localActivity,
    });
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-secondary p-4">
      <div>
        <label className="mb-3 block text-sm font-semibold text-foreground">{t('chat.budget')}</label>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map(({ key, amount }) => (
            <label key={key} className="group flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="budget"
                value={String(amount)}
                checked={localBudget === String(amount)}
                onChange={(e) => setLocalBudget(e.target.value)}
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm text-foreground transition-colors group-hover:text-accent">
                {t(`chat.budgets.${key}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <label className="mb-3 block text-sm font-semibold text-foreground">{t('chat.activity')}</label>
        <div className="space-y-2">
          {ACTIVITY_KEYS.map((key) => {
            const label = t(`chat.activities.${key}`);
            return (
              <label key={key} className="group flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="activity"
                  value={key}
                  checked={localActivity === key}
                  onChange={(e) => setLocalActivity(e.target.value)}
                  className="h-4 w-4 accent-accent"
                />
                <span className="text-sm text-foreground transition-colors group-hover:text-accent">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={!localBudget || !localActivity}
        className="w-full rounded-lg bg-accent py-2 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t('chat.recommendButton')}
      </button>
    </form>
  );
}
