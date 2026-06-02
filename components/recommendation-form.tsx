'use client';

import { useState } from 'react';
import { useChatBot } from '@/contexts/chat-bot-context';

const ACTIVITIES = [
  'Running',
  'Gym/Strength Training',
  'Yoga/Flexibility',
  'Sports',
  'Casual Wear',
];

const BUDGETS = ['$50', '$100', '$150', '$200', '$300+'];

export default function RecommendationForm() {
  const { budget, activityType, setBudget, setActivityType, sendMessage } =
    useChatBot();
  const [localBudget, setLocalBudget] = useState(budget);
  const [localActivity, setLocalActivity] = useState(activityType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localBudget || !localActivity) return;

    setBudget(localBudget);
    setActivityType(localActivity);

    const message = `I have a budget of ${localBudget} and I'm looking for products for ${localActivity}. Can you recommend some products?`;
    await sendMessage(message, 'recommend');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-xl space-y-4 border border-border">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          What&apos;s your budget?
        </label>
        <div className="space-y-2">
          {BUDGETS.map((b) => (
            <label key={b} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="budget"
                value={b}
                checked={localBudget === b}
                onChange={(e) => setLocalBudget(e.target.value)}
                className="accent-accent w-4 h-4"
              />
              <span className="text-sm text-foreground group-hover:text-accent transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <label className="block text-sm font-semibold text-foreground mb-3">
          What activity?
        </label>
        <div className="space-y-2">
          {ACTIVITIES.map((activity) => (
            <label
              key={activity}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="activity"
                value={activity}
                checked={localActivity === activity}
                onChange={(e) => setLocalActivity(e.target.value)}
                className="accent-accent w-4 h-4"
              />
              <span className="text-sm text-foreground group-hover:text-accent transition-colors">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!localBudget || !localActivity}
        className="w-full bg-accent text-accent-foreground py-2 rounded-lg hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        Get Recommendations
      </button>
    </form>
  );
}
