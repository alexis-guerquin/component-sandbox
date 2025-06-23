import React from 'react';
import styles from './3dbutton.module.css';
import { playClickSound } from '../../../utils/soundUtils';
import type { IconType } from 'react-icons';

interface ThreeDButtonProps {
  onClick?: () => void;
  text: string;
  enableSound?: boolean;
  variant?: 'rectangle' | 'round';
  icon?: React.ReactNode | IconType;
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  onClick,
  text,
  enableSound = false,
  variant = 'rectangle',
  icon,
}) => {
  const handleClick = () => {
    if (enableSound) {
      playClickSound();
    }
    onClick?.();
  };

  const buttonClass = variant === 'round' ? styles.tdbuttonRound : styles.tdbutton;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <span className={styles.icon}><IconComponent /></span>;
    }
    return <span className={styles.icon}>{icon}</span>;
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
    >
      {renderIcon()}
      {text}
    </button>
  );
};

export default ThreeDButton;
