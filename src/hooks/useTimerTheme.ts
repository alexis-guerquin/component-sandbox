import { useMemo } from 'react';

interface TimerTheme {
  background: string;
  primaryButton: string;
  secondaryButton: string;
  text: string;
  border: string;
  shadow: string;
}

export const useTimerTheme = (mode: 'pomodoro' | 'break'): TimerTheme => {
  return useMemo(() => {
    if (mode === 'pomodoro') {
      // Thème marron pour le mode pomodoro (travail)
      return {
        background: 'var(--brown-400)',
        primaryButton: 'var(--brown-500)',
        secondaryButton: 'rgba(255, 255, 255, 0.2)',
        text: '#ffffff',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: 'rgba(160, 119, 95, 0.4)'
      };
    } else {
      // Thème vert pour le mode break (pause)
      return {
        background: 'var(--green-400)',
        primaryButton: 'var(--green-500)',
        secondaryButton: 'rgba(255, 255, 255, 0.2)',
        text: '#ffffff',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: 'rgba(143, 170, 74, 0.4)'
      };
    }
  }, [mode]);
}; 