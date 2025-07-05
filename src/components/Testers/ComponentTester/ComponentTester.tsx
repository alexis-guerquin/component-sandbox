import React, { useState } from 'react';
import { useQuestActions } from '../../../hooks/useQuestActions';
import { useTheme } from '../../../hooks/useTheme';
// import { useQuest } from '../../contexts/QuestContext';
import styles from './ComponentTester.module.css';

const ComponentTester: React.FC = () => {
  const questActions = useQuestActions();
  const { theme, toggleTheme } = useTheme();
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
    },
    {
      label: `Basculer vers le mode ${theme === 'light' ? 'sombre' : 'clair'}`,
      onClick: toggleTheme,
    }
  ];

  return (
    <div className={styles.componenttester}>
      <div className={styles.testercontent}>
        {activeTab === 'actions' && (
          <div className={styles.actionssection}>
            <h3>Actions disponibles</h3>
            <div className={styles.themeinfo}>
              <p>Thème actuel : <strong>{theme === 'light' ? 'Clair' : 'Sombre'}</strong></p>
              <p>Valeur localStorage : <code>{localStorage.getItem('theme') || 'non défini'}</code></p>
            </div>
            <div className={styles.actiongrid}>
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                >{button.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTester; 