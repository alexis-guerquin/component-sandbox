import React from 'react';
import styles from './TimerWidget.module.css';
import TimerAnimation from '../TimerAnimation/TimerAnimation';
import { FaPlay, FaPause, FaForward } from 'react-icons/fa';
import ThreeDButton from '../../Buttons/3DButton/3dbutton';

interface TimerTheme {
  background: string;
  primaryButton: string;
  secondaryButton: string;
  text: string;
  border: string;
  shadow: string;
}

interface TimerWidgetProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  mode: 'pomodoro' | 'break';
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  className?: string;
  theme?: TimerTheme;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({
  timeLeft,
  totalTime,
  isRunning,
  mode,
  onStart,
  onPause,
  onSkip,
  className = '',
  theme
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`${styles.timerWidget} ${className}`}
      style={theme ? {
        background: theme.background,
        boxShadow: `0 8px 25px ${theme.shadow}`
      } : undefined}
    >
      <div className={styles.widgetContent}>
        <TimerAnimation
          timeLeft={timeLeft}
          totalTime={totalTime}
          mode={mode}
        />
        <div className={styles.timeDisplay}>
          <span className={styles.timeText}>{formatTime(timeLeft)}</span>
        </div>
        <div className={styles.widgetControls}>
          <ThreeDButton
            onClick={isRunning ? onPause : onStart}
            text=""
            icon={isRunning ? <FaPause /> : <FaPlay />}
            variant="round"
            enableSound={true}
          />
          <ThreeDButton
            onClick={onSkip}
            text=""
            icon={<FaForward />}
            variant="round"
            enableSound={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerWidget; 