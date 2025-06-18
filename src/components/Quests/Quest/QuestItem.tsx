"use client";

import styles from "./QuestItem.module.css";
import questIcon from "../../../assets/quest.svg";

interface QuestItemProps {
  icon?: string;
  title: string;
  progress: number;
  goal: number;
  done: boolean;
  onClick?: () => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ title, progress, goal, done, onClick }) => {
  const percentage = Math.min((progress / goal) * 100, 100);
  const isClickable = done;

  return (
    <button 
      className={`${styles.quest} ${done ? styles.done : styles.pending}`}
      onClick={onClick}
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
