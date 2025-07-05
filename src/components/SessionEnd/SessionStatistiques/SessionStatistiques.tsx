import React from 'react';
import styles from './SessionStatistiques.module.css';
import CountUp from '../../Animations/CountUp/CountUp';
import type { SessionData } from '../../../types/TrophyTypes';

interface SessionStatistiquesProps {
  sessionData: SessionData;
}

const SessionStatistiques: React.FC<SessionStatistiquesProps> = ({ sessionData }) => {
  const { xpGained, progressions } = sessionData;

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Statistiques de Session</h3>
      
      <div className={styles.statsGrid}>
        {/* XP Gained */}
        <div className={styles.xpCard}>
          <div className={styles.xpIcon}>⭐</div>
          <div className={styles.xpContent}>
            <h4 className={styles.xpTitle}>XP Gagné</h4>
            <p className={styles.xpValue}>
              + <CountUp 
                to={xpGained} 
                from={0} 
                duration={1.5} 
                delay={0.2}
                separator=" "
                className={styles.countUpValue}
              />
            </p>
          </div>
        </div>
        <div className={styles.progressionsContainer}>
          <h4 className={styles.progressionsTitle}>Progression vers les Trophées</h4>
          <div className={styles.trophyGrid}>
            {progressions.map((progression, index) => {
              const percentage = Math.round((progression.progress / progression.maxProgress) * 100);
              const { trophy } = progression;
              
              return (
                <div 
                  key={index} 
                  className={styles.trophyCard}
                >
                  <div className={styles.trophyIcon}>
                    <img 
                      src={trophy.icon} 
                      alt={trophy.name}
                      className={styles.trophyImage}
                    />
                  </div>
                  <h5 className={styles.trophyName}>{trophy.name}</h5>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className={styles.progressionDetails}>
                    <span className={styles.progressionCurrent}>
                      <CountUp 
                        to={progression.progress} 
                        from={0} 
                        duration={1} 
                        delay={0.6 + (index * 0.1)}
                        separator=" "
                        className={styles.countUpProgress}
                      />
                    </span>
                    <span className={styles.progressionSeparator}>/</span>
                    <span className={styles.progressionMax}>
                      {progression.maxProgress}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStatistiques; 