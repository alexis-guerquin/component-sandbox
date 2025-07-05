import React, { useState } from 'react';
import styles from './SessionEndTester.module.css';
import SessionEnd from '../../SessionEnd';
import { createMockSessionData } from '../../../utils/trophyUtils';
import {
  playSuccessSound,
} from '../../../utils/soundUtils';

const SessionEndTester: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockSessionData = createMockSessionData();

  const handleOpenModal = () => {
    playSuccessSound();
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