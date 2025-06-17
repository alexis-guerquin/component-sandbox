export type QuestStyle = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  reward: number;
}

export interface DailyQuestProps {
  style?: QuestStyle;
  quests: Quest[];
  onQuestComplete?: (questId: string) => void;
  onAllQuestsComplete?: () => void;
}

export interface QuestProgress {
  quests: Record<string, boolean>;
  lastReset: string;
  totalReward: number;
}

export interface Window {
  questProgress: {
    login: () => void;
    startPomodoro: () => void;
    finishTask: () => void;
  };
} 