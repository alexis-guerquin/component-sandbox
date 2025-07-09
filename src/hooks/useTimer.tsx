import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  mode: 'pomodoro' | 'break';
}

interface TimerContextType {
  timerState: TimerState;
  pomodoroTime: number;
  breakTime: number;
  totalPomodoroTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  switchMode: () => void;
  formatTime: (seconds: number) => string;
  updateConfig: (pomodoroTime: number, breakTime: number) => void;
  resetTotalPomodoroTime: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [totalPomodoroTime, setTotalPomodoroTime] = useState(0);
  
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: 25 * 60,
    totalTime: 25 * 60,
    isRunning: false,
    mode: 'pomodoro'
  });

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback(() => {
    if (timerState.isRunning) return;

    const newIntervalId = setInterval(() => {
      setTimerState(prev => {
        if (prev.timeLeft <= 1) {
          // Timer terminé - switch automatique de mode et arrêt du timer
          const newMode = prev.mode === 'pomodoro' ? 'break' : 'pomodoro';
          const newTime = newMode === 'pomodoro' ? pomodoroTime : breakTime;
          
          // Si on termine un pomodoro, ajouter le temps au total
          if (prev.mode === 'pomodoro') {
            setTotalPomodoroTime(current => current + pomodoroTime);
          }
          
          // Arrêter l'intervalle en utilisant la référence actuelle
          clearInterval(newIntervalId);
          setIntervalId(null);
          
          return {
            ...prev,
            mode: newMode,
            timeLeft: newTime,
            totalTime: newTime,
            isRunning: false
          };
        }
        
        // Si on est en mode pomodoro et que le timer tourne, incrémenter le total
        if (prev.mode === 'pomodoro') {
          setTotalPomodoroTime(current => current + 0.5);
        }
        
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    setIntervalId(newIntervalId);
    setTimerState(prev => ({ ...prev, isRunning: true }));
  }, [timerState.isRunning, pomodoroTime, breakTime]);

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, [intervalId]);

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimerState(prev => ({
      ...prev,
      timeLeft: prev.totalTime,
      isRunning: false
    }));
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimerState(prev => ({
      ...prev,
      timeLeft: prev.totalTime,
      isRunning: false
    }));
  }, [intervalId]);

  const switchMode = useCallback(() => {
    const newMode = timerState.mode === 'pomodoro' ? 'break' : 'pomodoro';
    const newTime = newMode === 'pomodoro' ? pomodoroTime : breakTime;
    
    setTimerState(prev => ({
      ...prev,
      mode: newMode,
      timeLeft: newTime,
      totalTime: newTime,
      isRunning: false
    }));
    
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [timerState.mode, intervalId, pomodoroTime, breakTime]);

  const updateConfig = useCallback((newPomodoroTime: number, newBreakTime: number) => {
    setPomodoroTime(newPomodoroTime);
    setBreakTime(newBreakTime);
    
    setTimerState(prev => ({
      ...prev,
      totalTime: prev.mode === 'pomodoro' ? newPomodoroTime : newBreakTime,
      timeLeft: prev.mode === 'pomodoro' ? newPomodoroTime : newBreakTime,
      isRunning: false
    }));
    
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const resetTotalPomodoroTime = useCallback(() => {
    setTotalPomodoroTime(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const value: TimerContextType = {
    timerState,
    pomodoroTime,
    breakTime,
    totalPomodoroTime,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
    switchMode,
    formatTime,
    updateConfig,
    resetTotalPomodoroTime
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}; 