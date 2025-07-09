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
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  switchMode: () => void;
  formatTime: (seconds: number) => string;
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
          clearInterval(newIntervalId);
          return {
            ...prev,
            timeLeft: 0,
            isRunning: false
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    setIntervalId(newIntervalId);
    setTimerState(prev => ({ ...prev, isRunning: true }));
  }, [timerState.isRunning]);

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
    const newTime = newMode === 'pomodoro' ? 25 * 60 : 5 * 60;
    
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
  }, [timerState.mode, intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const value: TimerContextType = {
    timerState,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
    switchMode,
    formatTime
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}; 