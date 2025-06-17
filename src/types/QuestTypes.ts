export type QuestKey = "login" | "start1" | "start2" | "finishTask";

export interface QuestProgress {
  login: number;
  start1: number;
  start2: number;
  finishTask: number;
}

export interface Quest {
  key: QuestKey;
  icon: string;
  title: string;
  goal: number;
}

export interface QuestContextType {
  progress: QuestProgress;
  updateProgress: (key: QuestKey, increment?: number) => void;
  resetProgress: () => void;
  getProgress: (key: QuestKey) => number;
} 