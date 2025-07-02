import React, { useState } from 'react';
import styles from './SessionEndTester.module.css';
import SessionEnd from '../../SessionEnd';

const SessionEndTester: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockSessionData = {
    xpGained: 50,
    progressions: [
      {
        name: 'Focus Time',
        progress: 45,
        maxProgress: 60
      },
      {
        name: 'Deep Work',
        progress: 12,
        maxProgress: 20
      },
      {
        name: 'Learning',
        progress: 8,
        maxProgress: 10
      },
      {
        name: 'Productivity',
        progress: 23,
        maxProgress: 30
      }
    ]
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.sessionEndTester}>
      <h3>Testeur SessionEnd</h3>
      <div className={styles.sessionEndTesterButton}>
        <button onClick={handleOpenModal}>Ouvrir SessionEnd</button>
      </div>

      <SessionEnd
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sessionData={mockSessionData}
      />
    </div>
  );
};

export default SessionEndTester; 