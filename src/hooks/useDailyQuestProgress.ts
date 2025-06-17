import { useState, useEffect } from 'react';
import type { Quest, QuestProgress } from '../types/DailyQuest';

const STORAGE_KEY = 'dailyQuestProgress';
const RESET_HOUR = 7;

export const useDailyQuestProgress = (initialQuests: Quest[]) => {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [progress, setProgress] = useState<QuestProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      quests: {},
      lastReset: new Date().toISOString(),
      totalReward: 0
    };
  });

  const checkReset = () => {
    const now = new Date();
    const lastReset = new Date(progress.lastReset);
    
    if (now.getHours() >= RESET_HOUR && lastReset.getHours() < RESET_HOUR) {
      setProgress({
        quests: {},
        lastReset: now.toISOString(),
        totalReward: 0
      });
      setQuests(initialQuests);
    }
  };

  useEffect(() => {
    checkReset();
    const interval = setInterval(checkReset, 60000); // Vérifier toutes les minutes
    return () => clearInterval(interval);
  }, [progress.lastReset]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeQuest = (questId: string) => {
    if (progress.quests[questId]) return;

    setProgress(prev => ({
      ...prev,
      quests: { ...prev.quests, [questId]: true },
      totalReward: prev.totalReward + (quests.find(q => q.id === questId)?.reward || 0)
    }));

    setQuests(prev => 
      prev.map(quest => 
        quest.id === questId ? { ...quest, completed: true } : quest
      )
    );
  };

  const isAllQuestsComplete = () => {
    return quests.every(quest => progress.quests[quest.id]);
  };

  return {
    quests,
    progress,
    completeQuest,
    isAllQuestsComplete,
    totalReward: progress.totalReward
  };
}; 