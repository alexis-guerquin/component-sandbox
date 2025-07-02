import React, { useState, useEffect } from 'react';
import styles from './BreakSuggestion.module.css';
import BreakCard from './BreakCard/BreakCard';

interface BreakOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'neutral';
}

const breakOptions: BreakOption[] = [
  {
    id: 'meditation',
    title: 'Respiration / Méditation',
    description: 'Prenez le temps de respirer et de vous recentrer',
    icon: '🧘',
    color: 'primary'
  },
  {
    id: 'exercise',
    title: 'Étirement / Sport',
    description: 'Bougez votre corps et étirez vos muscles',
    icon: '💪',
    color: 'secondary'
  },
  {
    id: 'nutrition',
    title: 'Manger / Boire',
    description: 'Hydratez-vous et prenez une collation',
    icon: '🍎',
    color: 'accent'
  },
  {
    id: 'free',
    title: 'Pause Libre',
    description: 'Faites ce qui vous fait du bien, (sans votre téléphone c\'est mieux)',
    icon: '🌟',
    color: 'neutral'
  }
];

const BreakSuggestion: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Animation d'apparition des cartes avec délai
    const timer = setTimeout(() => {
      const showCards = () => {
        setVisibleCards(prev => {
          if (prev.length < breakOptions.length) {
            return [...prev, prev.length];
          }
          return prev;
        });
      };

      // Afficher une carte toutes les 200ms
      const interval = setInterval(() => {
        if (visibleCards.length < breakOptions.length) {
          showCards();
        } else {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    }, 500); // Délai initial avant de commencer l'animation

    return () => clearTimeout(timer);
  }, [visibleCards.length]);

  const handleCardClick = (breakId: string) => {
    console.log(`Pause sélectionnée: ${breakId}`);
    // Ici vous pouvez ajouter la logique pour gérer la sélection de pause
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Suggestions de Pause</h3>
      <p className={styles.sectionDescription}>
        Choisissez une activité pour votre pause
      </p>
      
      <div className={styles.cardsGrid}>
        {breakOptions.map((option, index) => (
          <div
            key={option.id}
            className={`${styles.cardWrapper} ${
              visibleCards.includes(index) ? styles.cardVisible : styles.cardHidden
            }`}
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            <BreakCard
              option={option}
              onClick={() => handleCardClick(option.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakSuggestion; 