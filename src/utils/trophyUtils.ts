import type { Trophy, TrophyProgression } from '../types/TrophyTypes';
import * as trophyIcons from '../assets/throphys';

// Données des trophées par catégorie
export const trophyData: Record<string, Trophy[]> = {
  tasks: [
    {
      id: 'tasks-bronze',
      name: 'Tâches Bronze',
      category: 'tasks',
      level: 'bronze',
      currentProgress: 0,
      maxProgress: 10,
      icon: trophyIcons.tasksBronze,
      description: 'Compléter 10 tâches'
    },
    {
      id: 'tasks-iron',
      name: 'Tâches Fer',
      category: 'tasks',
      level: 'iron',
      currentProgress: 0,
      maxProgress: 25,
      icon: trophyIcons.tasksIron,
      description: 'Compléter 25 tâches'
    },
    {
      id: 'tasks-silver',
      name: 'Tâches Argent',
      category: 'tasks',
      level: 'silver',
      currentProgress: 0,
      maxProgress: 50,
      icon: trophyIcons.tasksSilver,
      description: 'Compléter 50 tâches'
    },
    {
      id: 'tasks-gold',
      name: 'Tâches Or',
      category: 'tasks',
      level: 'gold',
      currentProgress: 0,
      maxProgress: 100,
      icon: trophyIcons.tasksGold,
      description: 'Compléter 100 tâches'
    }
  ],
  streak: [
    {
      id: 'streak-bronze',
      name: 'Série Bronze',
      category: 'streak',
      level: 'bronze',
      currentProgress: 0,
      maxProgress: 3,
      icon: trophyIcons.streakBronze,
      description: 'Maintenir une série de 3 jours'
    },
    {
      id: 'streak-iron',
      name: 'Série Fer',
      category: 'streak',
      level: 'iron',
      currentProgress: 0,
      maxProgress: 7,
      icon: trophyIcons.streakIron,
      description: 'Maintenir une série de 7 jours'
    },
    {
      id: 'streak-silver',
      name: 'Série Argent',
      category: 'streak',
      level: 'silver',
      currentProgress: 0,
      maxProgress: 14,
      icon: trophyIcons.streakSilver,
      description: 'Maintenir une série de 14 jours'
    },
    {
      id: 'streak-gold',
      name: 'Série Or',
      category: 'streak',
      level: 'gold',
      currentProgress: 0,
      maxProgress: 30,
      icon: trophyIcons.streakGold,
      description: 'Maintenir une série de 30 jours'
    }
  ],
  daily: [
    {
      id: 'daily-bronze',
      name: 'Quotidien Bronze',
      category: 'daily',
      level: 'bronze',
      currentProgress: 0,
      maxProgress: 5,
      icon: trophyIcons.dailyBronze,
      description: 'Compléter 5 objectifs quotidiens'
    },
    {
      id: 'daily-iron',
      name: 'Quotidien Fer',
      category: 'daily',
      level: 'iron',
      currentProgress: 0,
      maxProgress: 15,
      icon: trophyIcons.dailyIron,
      description: 'Compléter 15 objectifs quotidiens'
    },
    {
      id: 'daily-silver',
      name: 'Quotidien Argent',
      category: 'daily',
      level: 'silver',
      currentProgress: 0,
      maxProgress: 30,
      icon: trophyIcons.dailySilver,
      description: 'Compléter 30 objectifs quotidiens'
    },
    {
      id: 'daily-gold',
      name: 'Quotidien Or',
      category: 'daily',
      level: 'gold',
      currentProgress: 0,
      maxProgress: 60,
      icon: trophyIcons.dailyGold,
      description: 'Compléter 60 objectifs quotidiens'
    }
  ],
  clock: [
    {
      id: 'clock-bronze',
      name: 'Temps Bronze',
      category: 'clock',
      level: 'bronze',
      currentProgress: 0,
      maxProgress: 60,
      icon: trophyIcons.clockBronze,
      description: 'Passer 60 minutes en focus'
    },
    {
      id: 'clock-iron',
      name: 'Temps Fer',
      category: 'clock',
      level: 'iron',
      currentProgress: 0,
      maxProgress: 300,
      icon: trophyIcons.clockIron,
      description: 'Passer 5 heures en focus'
    },
    {
      id: 'clock-silver',
      name: 'Temps Argent',
      category: 'clock',
      level: 'silver',
      currentProgress: 0,
      maxProgress: 600,
      icon: trophyIcons.clockSilver,
      description: 'Passer 10 heures en focus'
    },
    {
      id: 'clock-gold',
      name: 'Temps Or',
      category: 'clock',
      level: 'gold',
      currentProgress: 0,
      maxProgress: 1200,
      icon: trophyIcons.clockGold,
      description: 'Passer 20 heures en focus'
    }
  ],
  grind: [
    {
      id: 'grind-bronze',
      name: 'Grind Bronze',
      category: 'grind',
      level: 'bronze',
      currentProgress: 0,
      maxProgress: 100,
      icon: trophyIcons.grindBronze,
      description: 'Gagner 100 XP'
    },
    {
      id: 'grind-iron',
      name: 'Grind Fer',
      category: 'grind',
      level: 'iron',
      currentProgress: 0,
      maxProgress: 500,
      icon: trophyIcons.grindIron,
      description: 'Gagner 500 XP'
    },
    {
      id: 'grind-silver',
      name: 'Grind Argent',
      category: 'grind',
      level: 'silver',
      currentProgress: 0,
      maxProgress: 1000,
      icon: trophyIcons.grindSilver,
      description: 'Gagner 1000 XP'
    },
    {
      id: 'grind-gold',
      name: 'Grind Or',
      category: 'grind',
      level: 'gold',
      currentProgress: 0,
      maxProgress: 5000,
      icon: trophyIcons.grindGold,
      description: 'Gagner 5000 XP'
    }
  ]
};

// Fonction pour obtenir le prochain trophée d'une catégorie
export const getNextTrophy = (category: string, currentProgress: number): Trophy | undefined => {
  const categoryTrophies = trophyData[category];
  if (!categoryTrophies) return undefined;

  return categoryTrophies.find(trophy => currentProgress < trophy.maxProgress);
};

// Fonction pour créer des données de progression mockées
export const createMockProgressions = (): TrophyProgression[] => {
  const categories = Object.keys(trophyData);
  const progressions: TrophyProgression[] = [];

  categories.forEach(category => {
    const currentProgress = Math.floor(Math.random() * 50) + 10; // Progression aléatoire entre 10 et 60
    const nextTrophy = getNextTrophy(category, currentProgress);
    
    if (nextTrophy) {
      const progressNeeded = nextTrophy.maxProgress - currentProgress;
      const sessionProgress = Math.min(Math.floor(Math.random() * 20) + 5, progressNeeded); // Progression de session entre 5 et 25

      progressions.push({
        name: nextTrophy.name,
        progress: sessionProgress,
        maxProgress: progressNeeded,
        trophy: nextTrophy,
        nextTrophy: nextTrophy
      });
    }
  });

  return progressions;
};

// Fonction pour créer des données de session mockées
export const createMockSessionData = () => {
  return {
    xpGained: Math.floor(Math.random() * 100) + 25, // XP entre 25 et 125
    progressions: createMockProgressions()
  };
}; 