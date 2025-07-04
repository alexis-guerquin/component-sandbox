export interface Trophy {
  id: string;
  name: string;
  category: 'tasks' | 'streak' | 'grind' | 'daily' | 'clock';
  level: 'bronze' | 'iron' | 'silver' | 'gold' | 'unlocked';
  currentProgress: number;
  maxProgress: number;
  icon: string;
  description: string;
}

export interface TrophyProgression {
  name: string;
  progress: number;
  maxProgress: number;
  trophy: Trophy;
  nextTrophy?: Trophy;
}

export interface SessionData {
  xpGained: number;
  progressions: TrophyProgression[];
} 