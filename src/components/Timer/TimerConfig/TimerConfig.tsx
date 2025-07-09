import React, { useState } from 'react';
import styles from './TimerConfig.module.css';
import { FaTimes } from 'react-icons/fa';

interface TimerConfigProps {
  isOpen: boolean;
  onClose: () => void;
  pomodoroTime: number;
  breakTime: number;
  onSave: (pomodoroTime: number, breakTime: number) => void;
}

const TimerConfig: React.FC<TimerConfigProps> = ({
  isOpen,
  onClose,
  pomodoroTime,
  breakTime,
  onSave
}) => {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(Math.floor(pomodoroTime / 60));
  const [breakMinutes, setBreakMinutes] = useState(Math.floor(breakTime / 60));

  const handleSave = () => {
    onSave(pomodoroMinutes * 60, breakMinutes * 60);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Configuration du Timer</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <label htmlFor="pomodoro-time">Temps de travail (minutes)</label>
            <input
              id="pomodoro-time"
              type="number"
              min="1"
              max="120"
              value={pomodoroMinutes}
              onChange={(e) => setPomodoroMinutes(parseInt(e.target.value) || 25)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="break-time">Temps de pause (minutes)</label>
            <input
              id="break-time"
              type="number"
              min="1"
              max="60"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
              className={styles.input}
            />
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Annuler
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerConfig; 