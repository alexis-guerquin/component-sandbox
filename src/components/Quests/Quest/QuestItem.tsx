"use client";

import styles from "./QuestItem.module.css";
import questIcon from "../../../assets/quest.svg";
import { playSuccessSound } from '../../../utils/soundUtils';

interface QuestItemProps {
  icon?: string;
  title: string;
  progress: number;
  goal: number;
  done: boolean;
  enableSound?: boolean;
  onClick?: () => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ title, progress, goal, done, onClick, enableSound = true }) => {
  const percentage = Math.min((progress / goal) * 100, 100);
  const isClickable = done;

  const handleClick = () => {
    if (enableSound) {
      playSuccessSound();
    }
    if (done && onClick) {
      onClick();
    }
  };

  return (
    <button 
      className={`${styles.quest} ${done ? styles.done : styles.pending}`}
      onClick={handleClick}
      disabled={!isClickable}
      type="button"
    >
      <img src={questIcon} alt="icon" className={styles.icon} />
      <div className={styles.info}>
        <h4>{title}</h4>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.fill} style={{ width: `${percentage}%` }} />
          </div>
          <span className={styles.progressText}>{progress}/{goal}</span>
        </div>
      </div>
    </button>
  );
};

export default QuestItem;
