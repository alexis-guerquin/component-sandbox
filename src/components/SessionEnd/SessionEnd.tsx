import React from 'react';
import styles from './SessionEnd.module.css';
import SessionStatistiques from './SessionStatistiques/SessionStatistiques';
import BreakSuggestion from './BreakSuggestion/BreakSuggestion';

interface SessionEndProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: {
    xpGained: number;
    progressions: Array<{
      name: string;
      progress: number;
      maxProgress: number;
    }>;
  };
}

const SessionEnd: React.FC<SessionEndProps> = ({
  isOpen,
  onClose,
  sessionData,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Session Terminée !</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.statsSection}>
            <SessionStatistiques sessionData={sessionData} />
          </div>
          <div className={styles.breakSection}>
            <BreakSuggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEnd; 