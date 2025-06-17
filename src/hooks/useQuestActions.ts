import { useQuest } from '../contexts/QuestContext';
import type { QuestKey } from '../types/QuestTypes';

export const useQuestActions = () => {
  const { updateProgress, getProgress, resetProgress } = useQuest();

  const questActions = {
    // Actions spécifiques pour chaque type de quête
    login: () => updateProgress("login"),
    startPomodoro: () => {
      updateProgress("start1");
      updateProgress("start2");
    },
    finishTask: () => updateProgress("finishTask"),
    
    // Actions utilitaires
    getLoginProgress: () => getProgress("login"),
    getPomodoroProgress: () => getProgress("start1"),
    getTaskProgress: () => getProgress("finishTask"),
    
    // Action de réinitialisation
    resetAllProgress: resetProgress,
    
    // Action générique pour incrémenter n'importe quelle quête
    incrementQuest: (questType: QuestKey, amount = 1) => {
      updateProgress(questType, amount);
    }
  };

  return questActions;
}; 