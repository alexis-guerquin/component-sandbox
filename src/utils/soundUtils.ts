/**
 * Utilitaires pour la gestion des sons gamifiés
 */

import { sounds } from '../assets/sounds';
import type { SoundName } from '../assets/sounds';

// Cache pour les sons préchargés
const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Prépare et cache un son pour une lecture optimisée
 */
export const preloadSound = (soundPath: string): HTMLAudioElement => {
  if (audioCache.has(soundPath)) {
    return audioCache.get(soundPath)!;
  }

  const audio = new Audio(soundPath);
  audio.preload = 'auto';
  audio.volume = 0.3; // Volume par défaut à 30%
  
  audioCache.set(soundPath, audio);
  return audio;
};

/**
 * Joue un son de clic gamifié
 */
export const playClickSound = (): void => {
  try {
    // Utilise le son de clic importé
    playSoundFromFile(sounds.click);
  } catch (error) {
    console.warn('Impossible de jouer le son de clic:', error);
    // Fallback vers le son généré programmatiquement
    playGeneratedClickSound();
  }
};

/**
 * Joue un son de succès gamifié
 */
export const playSuccessSound = (): void => {
  try {
    // Utilise le son de succès importé
    playSoundFromFile(sounds.success);
  } catch (error) {
    console.warn('Impossible de jouer le son de succès:', error);
    // Fallback vers le son généré programmatiquement
    playGeneratedSuccessSound();
  }
};

/**
 * Joue un son de notification
 */
export const playNotificationSound = (): void => {
  try {
    playSoundFromFile(sounds.notification);
  } catch (error) {
    console.warn('Impossible de jouer le son de notification:', error);
  }
};

/**
 * Joue un son de fanfare de succès
 */
export const playSuccessFanfareSound = (): void => {
  try {
    playSoundFromFile(sounds.successFanfare);
  } catch (error) {
    console.warn('Impossible de jouer le son de fanfare:', error);
  }
};

/**
 * Joue un son par son nom
 */
export const playSoundByName = (soundName: SoundName): void => {
  try {
    playSoundFromFile(sounds[soundName]);
  } catch (error) {
    console.warn(`Impossible de jouer le son ${soundName}:`, error);
  }
};

/**
 * Joue un son personnalisé depuis un fichier
 */
export const playSoundFromFile = (soundPath: string): void => {
  try {
    const audio = preloadSound(soundPath);
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn('Erreur lors de la lecture du son:', error);
    });
  } catch (error) {
    console.warn('Impossible de jouer le son depuis le fichier:', error);
  }
};

/**
 * Son de clic généré programmatiquement (fallback)
 */
const playGeneratedClickSound = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configuration pour un son de clic satisfaisant
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.warn('Impossible de jouer le son de clic généré:', error);
  }
};

/**
 * Son de succès généré programmatiquement (fallback)
 */
const playGeneratedSuccessSound = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Son de succès avec une montée en fréquence
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } catch (error) {
    console.warn('Impossible de jouer le son de succès généré:', error);
  }
};

/**
 * Nettoie le cache audio
 */
export const clearAudioCache = (): void => {
  audioCache.clear();
}; 