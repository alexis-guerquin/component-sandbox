"use client";

import { useState } from "react";
import QuestItem from "../Quest/QuestItem";
import { useQuest } from "../../../contexts/QuestContext";
import type { QuestKey, Quest } from "../../../types/QuestTypes";
import questIcon from "../../../assets/quest.svg";
import styles from "./DailyQuest.module.css";

interface DailyQuestProps {
  style: "pomodoro" | "shortBreak" | "longBreak";
}

const QUESTS: Quest[] = [
  { key: "login", icon: "./assets/svg/icons/quest.svg", title: "Se connecter", goal: 1 },
  { key: "start1", icon: "./assets/svg/icons/quest.svg", title: "Terminer un pomodoro", goal: 1 },
  { key: "start2", icon: "./assets/svg/icons/quest.svg", title: "Terminer 2 pomodoros", goal: 2 },
  { key: "finishTask", icon: "./assets/svg/icons/quest.svg", title: "Finir une tâche", goal: 1 },
];

const DailyQuest: React.FC<DailyQuestProps> = ({ style }) => {
  const colorClass = style === "pomodoro" ? "none" : "flex";
  const [expanded, setExpanded] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<QuestKey[]>([]);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  
  const { progress } = useQuest();

  const progressCount = completedQuests.length;
  const maxProgress = 4;
  const progressPercent = (progressCount / maxProgress) * 100;

  // Vérifier s'il y a des quêtes prêtes à être récupérées
  const hasQuestsToClaim = QUESTS.some(({ key, goal }) => 
    !completedQuests.includes(key) && progress[key] >= goal
  );

  // Appliquer la classe jaune s'il y a des quêtes à récupérer
  const shouldShowYellow = hasQuestsToClaim;

  const handleQuestClick = (key: QuestKey) => {
    if (!completedQuests.includes(key)) {
      setCompletedQuests((prev) => [...prev, key]);
    }
  };

  const handleClaimReward = () => {
    setRewardClaimed(true);
    // ici tu pourrais déclencher une animation ou logique de récompense réelle
  };

  return (
      <div className={`${styles.basic} ${styles.quests} ${expanded ? styles.expanded : ""} ${styles[colorClass]} ${shouldShowYellow ? styles.completed : ""}`}>
        {expanded ? (
          <div className={styles.content}>
            <button className={styles.closeButton} onClick={() => setExpanded(false)}>
              ×
            </button>
            <h3>QUESTS</h3>

            <div className={styles.progressWrapper}>
              <div className={styles.globalBar}>
                <div className={styles.globalFill} style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p>{progressCount}/{maxProgress}</p>
            </div>

            {!rewardClaimed && progressCount >= maxProgress ? (
              <div className={styles.rewardSection}>
                <p>🎉 Quêtes complétées</p>
                <button className={styles.rewardButton} onClick={handleClaimReward}>Récupérer la récompense</button>
              </div>
            ) : (
              <div className={styles.questList}>
                {QUESTS.map(({ key, icon, title, goal }) =>
                  !completedQuests.includes(key) ? (
                    progress[key] >= goal ? (
                      <div key={key} onClick={() => handleQuestClick(key)}>
                        <QuestItem
                          icon={icon}
                          title={title}
                          goal={goal}
                          progress={progress[key]}
                          done={true}
                        />
                      </div>
                    ) : (
                      <QuestItem
                        key={key}
                        icon={icon}
                        title={title}
                        goal={goal}
                        progress={progress[key]}
                        done={false}
                      />
                    )
                  ) : null
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.icon} onClick={() => setExpanded(true)}>
            <img src={questIcon} alt="Missions" className={styles.svgIcon} />
          </div>
        )}
      </div>
  );
};

export default DailyQuest;
