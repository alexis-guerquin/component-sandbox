import React, { useState } from 'react';
import { useQuestActions } from '../../../hooks/useQuestActions';
// import { useQuest } from '../../contexts/QuestContext';
import './ComponentTester.module.css';

const ComponentTester: React.FC = () => {
  const questActions = useQuestActions();
  // const { progress } = useQuest();
  const [activeTab] = useState<'actions' | 'progress' | 'utilities'>('actions');

  const handleLogin = () => {
    questActions.login();
    console.log('Utilisateur connecté - Progrès login mis à jour');
  };

  const handlePomodoroComplete = () => {
    questActions.startPomodoro();
    console.log('Pomodoro terminé - Progrès pomodoro mis à jour');
  };

  const handleTaskComplete = () => {
    questActions.finishTask();
    console.log('Tâche terminée - Progrès tâche mis à jour');
  };

  const handleReset = () => {
    questActions.resetAllProgress();
    console.log('Tous les progrès ont été réinitialisés');
  };

  const actionButtons = [
    {
      label: 'Simuler une connexion',
      onClick: handleLogin,
      icon: '🔐',
      color: '#4CAF50'
    },
    {
      label: 'Terminer un pomodoro',
      onClick: handlePomodoroComplete,
      icon: '⏰',
      color: '#2196F3'
    },
    {
      label: 'Terminer une tâche',
      onClick: handleTaskComplete,
      icon: '✅',
      color: '#FF9800'
    },
    {
      label: 'Réinitialiser tout',
      onClick: handleReset,
      icon: '🔄',
      color: '#f44336'
    }
  ];

  return (
    <div className="component-tester">
      <div className="tester-header">
        <h1>ComponentTester</h1>
      </div>

      <div className="tester-content">
        {activeTab === 'actions' && (
          <div className="actions-section">
            <h2>Actions disponibles</h2>
            <div className="action-grid">
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  className="action-button"
                  onClick={button.onClick}
                  style={{ '--button-color': button.color } as React.CSSProperties}
                >
                  <span className="button-icon">{button.icon}</span>
                  <span className="button-label">{button.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTester; 