import React from 'react';
import styles from './BreakCard.module.css';

interface BreakOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'neutral';
}

interface BreakCardProps {
  option: BreakOption;
  onClick: () => void;
}

const BreakCard: React.FC<BreakCardProps> = ({ option, onClick }) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return styles.cardPrimary;
      case 'secondary':
        return styles.cardSecondary;
      case 'accent':
        return styles.cardAccent;
      case 'neutral':
        return styles.cardNeutral;
      default:
        return styles.cardPrimary;
    }
  };

  return (
    <div
      className={`${styles.card} ${getColorClass(option.color)}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{option.icon}</span>
        </div>
        
        <div className={styles.textContent}>
          <h4 className={styles.title}>{option.title}</h4>
          <p className={styles.description}>{option.description}</p>
        </div>
        
        <div className={styles.actionIndicator}>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </div>
  );
};

export default BreakCard;