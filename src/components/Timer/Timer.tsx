import React, { useState } from 'react';
import styles from './Timer.module.css';
import TimerAnimation from './TimerAnimation/TimerAnimation';
import { FaPlay, FaPause, FaStop, FaForward, FaCog } from 'react-icons/fa';
import { useTimer } from '../../hooks/useTimer';
import { useTimerTheme } from '../../hooks/useTimerTheme';
import TimerConfig from './TimerConfig/TimerConfig';
import ThreeDButton from '../Buttons/3DButton/3dbutton';

interface TimerProps {
  variant?: 'full' | 'widget';
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ 
  variant = 'full', 
  className = '' 
}) => {
  const { timerState, pomodoroTime, breakTime, startTimer, pauseTimer, stopTimer, switchMode, formatTime, updateConfig } = useTimer();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const theme = useTimerTheme(timerState.mode);

  if (variant === 'widget') {
    return (
      <div className={`${styles.timerWidget} ${className}`}>
        <div className={styles.widgetContent}>
          <TimerAnimation
            timeLeft={timerState.timeLeft}
            totalTime={timerState.totalTime}
            mode={timerState.mode}
          />
          <div className={styles.widgetControls}>
            <button
              className={`${styles.controlButton} ${styles.widgetButton}`}
              onClick={timerState.isRunning ? pauseTimer : startTimer}
              title={timerState.isRunning ? 'Pause' : 'Start'}
            >
              {timerState.isRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className={`${styles.controlButton} ${styles.widgetButton}`}
              onClick={stopTimer}
              title="Stop"
            >
              <FaStop />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.timer} ${className}`}
      style={{
        background: theme.background,
        boxShadow: `0 10px 30px ${theme.shadow}`
      }}
    >
      <div className={styles.timerHeader}>
        <div className={styles.headerTop}>
          {/* <h2 className={styles.timerTitle}>Timer Pomodoro</sh2> */}
          <div className={styles.configButton}>
            <ThreeDButton
                onClick={() => setIsConfigOpen(true)}
                text=""
                icon={<FaCog />}
                variant="round"
                enableSound={true}
            />
          </div>
        </div>
      </div>

      <div className={styles.timerContent}>
        <div className={styles.animationContainer}>
          <TimerAnimation
            timeLeft={timerState.timeLeft}
            totalTime={timerState.totalTime}
            mode={timerState.mode}
          />
        </div>

        <div className={styles.timeDisplay}>
          <span className={styles.timeText}>{formatTime(timerState.timeLeft)}</span>
          {/* <span className={styles.modeText}>
            {timerState.mode === 'pomodoro' ? 'Temps de travail' : 'Pause'}
          </span> */}
        </div>

        <div className={styles.controls}>
          <ThreeDButton
            onClick={timerState.isRunning ? pauseTimer : startTimer}
            text={timerState.isRunning ? 'Pause' : 'Démarrer'}
            icon={timerState.isRunning ? <FaPause /> : <FaPlay />}
            enableSound={true}
          />
          
          <ThreeDButton
            onClick={switchMode}
            text="Skip"
            icon={<FaForward />}
            enableSound={true}
          />
        </div>
      </div>

      <TimerConfig
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        pomodoroTime={pomodoroTime}
        breakTime={breakTime}
        onSave={updateConfig}
      />
    </div>
  );
};

export default Timer; 