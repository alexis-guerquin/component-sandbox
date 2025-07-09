# Composant Timer

Un composant Timer Pomodoro moderne avec animation et support pour deux variantes : complète et widget.

## Fonctionnalités

- ⏱️ **Timer Pomodoro** : 25 minutes de travail, 5 minutes de pause
- 🎨 **Animation visuelle** : Tasse de café qui se vide/se remplit selon le mode
- 📱 **Responsive** : S'adapte aux différentes tailles d'écran
- 🎯 **Deux variantes** : Version complète et widget flottant
- 🔄 **État global** : Synchronisation entre toutes les instances du timer
- ♿ **Accessible** : Support complet pour les lecteurs d'écran

## Structure des fichiers

```
src/components/Timer/
├── Timer.tsx                    # Composant principal
├── Timer.module.css             # Styles du composant principal
├── Timer.test.tsx              # Tests du composant
├── index.ts                     # Export principal
├── TimerAnimation/
│   ├── TimerAnimation.tsx       # Animation de la tasse de café
│   └── TimerAnimation.module.css # Styles de l'animation
├── TimerProvider/
│   └── TimerProvider.tsx        # Contexte global du timer
├── TimerWidget/
│   ├── TimerWidget.tsx          # Widget flottant
│   ├── TimerWidget.module.css   # Styles du widget
│   └── TimerWidgetWithContext.tsx # Widget avec contexte
└── README.md                    # Documentation
```

## Utilisation

### Version complète

```tsx
import Timer from './components/Timer';

function App() {
  return (
    <TimerProvider>
      <Timer variant="full" />
    </TimerProvider>
  );
}
```

### Widget flottant

```tsx
import TimerWidgetWithContext from './components/Timer/TimerWidget/TimerWidgetWithContext';

function App() {
  return (
    <TimerProvider>
      <TimerWidgetWithContext />
    </TimerProvider>
  );
}
```

## Props

### Timer

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'full' \| 'widget'` | `'full'` | Type d'affichage du timer |
| `className` | `string` | `''` | Classes CSS supplémentaires |

### TimerWidget

| Prop | Type | Description |
|------|------|-------------|
| `timeLeft` | `number` | Temps restant en secondes |
| `totalTime` | `number` | Temps total en secondes |
| `isRunning` | `boolean` | État d'exécution du timer |
| `mode` | `'pomodoro' \| 'break'` | Mode actuel du timer |
| `onStart` | `() => void` | Fonction de démarrage |
| `onPause` | `() => void` | Fonction de pause |
| `onStop` | `() => void` | Fonction d'arrêt |
| `className` | `string` | Classes CSS supplémentaires |

## Contexte Timer

Le composant utilise un contexte React pour partager l'état du timer entre tous les composants :

```tsx
import { useTimer } from './components/Timer/TimerProvider/TimerProvider';

function MyComponent() {
  const { timerState, startTimer, pauseTimer, stopTimer } = useTimer();
  
  return (
    <div>
      <p>Temps restant : {timerState.timeLeft}</p>
      <button onClick={startTimer}>Démarrer</button>
    </div>
  );
}
```

## Animation

L'animation utilise une tasse de café SVG qui :
- **Mode Pomodoro** : Se vide progressivement (25 → 0 minutes)
- **Mode Pause** : Se remplit progressivement (0 → 5 minutes)

L'animation est fluide avec des transitions CSS et des effets visuels.

## Tests

Le composant inclut des tests complets avec React Testing Library :

- ✅ Rendu des éléments
- ✅ Interactions utilisateur
- ✅ Changements d'état
- ✅ Accessibilité
- ✅ Responsive design

## Styles

### Couleurs
- **Gradient principal** : `#667eea` → `#764ba2`
- **Bouton primaire** : `#4CAF50` → `#45a049`
- **Tasse de café** : `#D2B48C` (tasse), `#533634` (liquide)

### Responsive
- **Desktop** : Timer complet avec tous les contrôles
- **Tablet** : Adaptation des tailles et espacements
- **Mobile** : Widget compact, contrôles empilés

## Dernière mise à jour

**Date** : 2024-01-XX  
**Version** : 1.0.0  
**Tests** : ✅ Tous les tests passent  
**Accessibilité** : ✅ WCAG 2.1 AA

## Liens utiles

- [Tests](./Timer.test.tsx)
- [Storybook](./Timer.stories.tsx) (à créer)
- [Page de démonstration](./TimerPage.tsx) (à créer) 