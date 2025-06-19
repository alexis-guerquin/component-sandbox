import React from 'react';
import styles from './3dbutton.module.css';
import { playClickSound } from '../../../utils/soundUtils';

interface ThreeDButtonProps {
  onClick?: () => void;
  text: string;
  enableSound?: boolean;
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  onClick,
  text,
  enableSound = false,
}) => {
  const handleClick = () => {
    if (enableSound) {
      playClickSound();
    }
    onClick?.();
  };

  return (
    <button
      className={styles.tdbutton}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ThreeDButton;
