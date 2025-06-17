# Système de Quêtes Quotidiennes

Ce système permet de gérer les progrès des quêtes quotidiennes depuis n'importe où dans l'application.

## Architecture

### 1. Contexte React (`QuestContext`)
- Gère l'état global des quêtes
- Persiste les données dans le localStorage
- Réinitialise automatiquement les progrès chaque jour à 7h du matin

### 2. Hook utilitaire (`useQuestActions`)
- Fournit des actions prédéfinies pour chaque type de quête
- Simplifie l'utilisation du contexte

### 3. Types centralisés (`QuestTypes`)
- Définit tous les types TypeScript pour les quêtes
- Assure la cohérence des types dans toute l'application

## Utilisation

### 1. Envelopper l'application avec le provider

```tsx
import { QuestProvider } from './contexts/QuestContext';

function App() {
  return (
    <QuestProvider>
      {/* Votre application */}
    </QuestProvider>
  );
}
```

### 2. Utiliser les actions de quêtes dans n'importe quel composant

```tsx
import { useQuestActions } from '../hooks/useQuestActions';

const MonComposant = () => {
  const questActions = useQuestActions();

  const handleLogin = () => {
    questActions.login(); // Incrémente le progrès de connexion
  };

  const handlePomodoroComplete = () => {
    questActions.startPomodoro(); // Incrémente les progrès pomodoro
  };

  const handleTaskComplete = () => {
    questActions.finishTask(); // Incrémente le progrès des tâches
  };

  return (
    <div>
      <button onClick={handleLogin}>Se connecter</button>
      <button onClick={handlePomodoroComplete}>Terminer un pomodoro</button>
      <button onClick={handleTaskComplete}>Terminer une tâche</button>
    </div>
  );
};
```

### 3. Accéder directement au contexte

```tsx
import { useQuest } from '../contexts/QuestContext';

const MonComposant = () => {
  const { progress, updateProgress, getProgress } = useQuest();

  // Incrémenter une quête spécifique
  const incrementLogin = () => {
    updateProgress("login", 2); // Incrémente de 2
  };

  // Obtenir le progrès d'une quête
  const loginProgress = getProgress("login");

  return (
    <div>
      <p>Progrès login: {progress.login}</p>
      <p>Progrès pomodoro: {progress.start1}</p>
      <button onClick={incrementLogin}>Incrémenter login</button>
    </div>
  );
};
```

## Types de quêtes disponibles

- `"login"` - Connexion à l'application
- `"start1"` - Terminer un pomodoro
- `"start2"` - Terminer 2 pomodoros
- `"finishTask"` - Finir une tâche

## Actions disponibles

### Actions spécifiques
- `questActions.login()` - Incrémente le progrès de connexion
- `questActions.startPomodoro()` - Incrémente les progrès pomodoro (start1 et start2)
- `questActions.finishTask()` - Incrémente le progrès des tâches

### Actions utilitaires
- `questActions.getLoginProgress()` - Retourne le progrès de connexion
- `questActions.getPomodoroProgress()` - Retourne le progrès pomodoro
- `questActions.getTaskProgress()` - Retourne le progrès des tâches
- `questActions.resetAllProgress()` - Réinitialise tous les progrès

### Action générique
- `questActions.incrementQuest(questType, amount)` - Incrémente une quête spécifique d'un montant donné

## Persistance des données

Les progrès sont automatiquement sauvegardés dans le localStorage et réinitialisés chaque jour à 7h du matin.

## Exemple complet

Voir le composant `ExampleUsage` pour un exemple complet d'utilisation de toutes les fonctionnalités. 