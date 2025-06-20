import React from 'react';
import { 
  playClickSound, 
  playSuccessSound, 
  playNotificationSound, 
  playSuccessFanfareSound, 
} from '../../../utils/soundUtils';
import styles from './SoundTester.module.css';

interface SoundTesterProps {
  className?: string;
}

const SoundTester: React.FC<SoundTesterProps> = ({ className }) => {
  return (
    <div className={`${styles.soundTester} ${className || ''}`}>
      <h3>Testeur de Sons</h3>
      <div className={styles.buttonGrid}>
        <button 
          onClick={playClickSound}
        >Son de Clic</button>          
        <button 
          onClick={playSuccessSound}
        >Son de Succès</button>
        
        <button 
          onClick={playNotificationSound}
        >Son de Notification</button>
        
        <button 
          onClick={playSuccessFanfareSound}
        >Fanfare de Succès</button>
      </div>
    </div>
  );
};

export default SoundTester; 