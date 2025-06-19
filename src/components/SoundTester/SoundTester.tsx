import React from 'react';
import { 
  playClickSound, 
  playSuccessSound, 
  playNotificationSound, 
  playSuccessFanfareSound,
  playSoundByName 
} from '../../utils/soundUtils';
import type { SoundName } from '../../assets/sounds';
import styles from './SoundTester.module.css';

interface SoundTesterProps {
  className?: string;
}

const SoundTester: React.FC<SoundTesterProps> = ({ className }) => {
  const handleSoundTest = (soundName: SoundName) => {
    playSoundByName(soundName);
  };

  return (
    <div className={`${styles.soundTester} ${className || ''}`}>
      <h3>Testeur de Sons</h3>
      <div className={styles.buttonGrid}>
        <button 
          onClick={playClickSound}
          className={styles.soundButton}
        >
          Son de Clic
        </button>
        
        <button 
          onClick={playSuccessSound}
          className={styles.soundButton}
        >
          Son de Succès
        </button>
        
        <button 
          onClick={playNotificationSound}
          className={styles.soundButton}
        >
          Son de Notification
        </button>
        
        <button 
          onClick={playSuccessFanfareSound}
          className={styles.soundButton}
        >
          Fanfare de Succès
        </button>
      </div>
      
      <div className={styles.byNameSection}>
        <h4>Test par nom :</h4>
        <div className={styles.buttonGrid}>
          <button 
            onClick={() => handleSoundTest('click')}
            className={styles.soundButton}
          >
            Par nom: click
          </button>
          
          <button 
            onClick={() => handleSoundTest('success')}
            className={styles.soundButton}
          >
            Par nom: success
          </button>
          
          <button 
            onClick={() => handleSoundTest('notification')}
            className={styles.soundButton}
          >
            Par nom: notification
          </button>
          
          <button 
            onClick={() => handleSoundTest('successFanfare')}
            className={styles.soundButton}
          >
            Par nom: successFanfare
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundTester; 