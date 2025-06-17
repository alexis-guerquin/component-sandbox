"use client";

import styles from "./QuestItem.module.css";

interface QuestItemProps {
  icon: string;
  title: string;
  progress: number;
  goal: number;
  done: boolean;
}

const QuestItem: React.FC<QuestItemProps> = ({ icon, title, progress, goal, done }) => {
  const percentage = Math.min((progress / goal) * 100, 100);

  return (
    <div className={`${styles.quest} ${done ? styles.done : styles.pending}`}>
      <img src={icon} alt="icon" className={styles.icon} />
      <div className={styles.info}>
        <h4>{title}</h4>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.fill} style={{ width: `${percentage}%` }} />
          </div>
          <span className={styles.progressText}>{progress}/{goal}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestItem;
