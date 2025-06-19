/**
 * Export des sons gamifiés
 */

// Sons de base
export const clickSound = '/src/assets/sounds/click-sound.mp3';
export const notificationSound = '/src/assets/sounds/notification-sound.mp3';
export const successSound = '/src/assets/sounds/success.mp3';
export const successFanfareSound = '/src/assets/sounds/success-fanfare.mp3';

// Objet regroupant tous les sons
export const sounds = {
  click: clickSound,
  notification: notificationSound,
  success: successSound,
  successFanfare: successFanfareSound,
} as const;

// Type pour les noms de sons
export type SoundName = keyof typeof sounds; 