import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { QuestKey, QuestProgress, QuestContextType } from '../types/QuestTypes';

const QuestContext = createContext<QuestContextType | undefined>(undefined);

const STORAGE_KEY = "dailyQuests";

const getTodayKey = () => {
  const now = new Date();
  if (now.getHours() < 7) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
};

const initialProgress: QuestProgress = {
  login: 0,
  start1: 0,
  start2: 0,
  finishTask: 0,
};

interface QuestProviderProps {
  children: ReactNode;
}

export const QuestProvider: React.FC<QuestProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<QuestProgress>(initialProgress);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const today = getTodayKey();
    
    if (data.date !== today) {
      // Nouveau jour, réinitialiser le progrès
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
        date: today, 
        progress: initialProgress 
      }));
    } else {
      // Même jour, charger le progrès sauvegardé
      setProgress(data.progress || initialProgress);
    }
  }, []);

  const updateProgress = (key: QuestKey, increment = 1) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [key]: prev[key] + increment,
      };
      
      // Sauvegarder dans localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
        date: getTodayKey(), 
        progress: updated 
      }));
      
      return updated;
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      date: getTodayKey(), 
      progress: initialProgress 
    }));
  };

  const getProgress = (key: QuestKey) => {
    return progress[key];
  };

  const value: QuestContextType = {
    progress,
    updateProgress,
    resetProgress,
    getProgress,
  };

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = (): QuestContextType => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuest doit être utilisé à l\'intérieur d\'un QuestProvider');
  }
  return context;
}; 