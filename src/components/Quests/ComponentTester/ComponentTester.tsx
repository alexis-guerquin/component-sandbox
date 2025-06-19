import React, { useState } from 'react';
import { useQuestActions } from '../../../hooks/useQuestActions';
// import { useQuest } from '../../contexts/QuestContext';
import styles from './ComponentTester.module.css';
import ThreeDButton from '../3DButton/3dbutton';

const ComponentTester: React.FC = () => {
  const questActions = useQuestActions();
  const [activeTab] = useState<'actions' | 'progress' | 'utilities'>('actions');

  const handleLogin = () => {
    questActions.login();
  };

  const handlePomodoroComplete = () => {
    questActions.startPomodoro();
  };

  const handleTaskComplete = () => {
    questActions.finishTask();
  };

  const handleReset = () => {
    questActions.resetAllProgress();
  };

  const actionButtons = [
    {
      label: 'Simuler une connexion',
      onClick: handleLogin,
    },
    {
      label: 'Terminer un pomodoro',
      onClick: handlePomodoroComplete,
    },
    {
      label: 'Terminer une tâche',
      onClick: handleTaskComplete,
    },
    {
      label: 'Réinitialiser tout',
      onClick: handleReset,
    }
  ];

  return (
    <div className={styles.componenttester}>
      <div className={styles.testerheader}>
        <h1>ComponentTester</h1>
      </div>

      <div className={styles.testercontent}>
        {activeTab === 'actions' && (
          <div className={styles.actionssection}>
            <h2>Actions disponibles</h2>
            <div className={styles.actiongrid}>
              {actionButtons.map((button, index) => (
                <ThreeDButton
                  key={index}
                  onClick={button.onClick}
                  text={button.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTester; 