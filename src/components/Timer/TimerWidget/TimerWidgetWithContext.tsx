import React from 'react';
import TimerWidget from './TimerWidget';
import { useTimer } from '../../../hooks/useTimer';
import { useTimerTheme } from '../../../hooks/useTimerTheme';

interface TimerWidgetWithContextProps {
  className?: string;
}

const TimerWidgetWithContext: React.FC<TimerWidgetWithContextProps> = ({ className }) => {
  const { timerState, startTimer, pauseTimer, switchMode } = useTimer();
  const theme = useTimerTheme(timerState.mode);

  return (
    <TimerWidget
      timeLeft={timerState.timeLeft}
      totalTime={timerState.totalTime}
      isRunning={timerState.isRunning}
      mode={timerState.mode}
      onStart={startTimer}
      onPause={pauseTimer}
      // onStop={stopTimer}
      onSkip={switchMode}
      className={className}
      theme={theme}
    />
  );
};

export default TimerWidgetWithContext; 