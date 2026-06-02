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
    <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What&apos;s your budget?
        </label>
        <div className="space-y-2">
          {BUDGETS.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={b}
                checked={localBudget === b}
                onChange={(e) => setLocalBudget(e.target.value)}
                className="accent-primary"
              />
              <span className="text-sm text-gray-700">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What activity?
        </label>
        <div className="space-y-2">
          {ACTIVITIES.map((activity) => (
            <label
              key={activity}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="activity"
                value={activity}
                checked={localActivity === activity}
                onChange={(e) => setLocalActivity(e.target.value)}
                className="accent-primary"
              />
              <span className="text-sm text-gray-700">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!localBudget || !localActivity}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
      >
        Get Recommendations
      </button>
    </form>
  );
}
