import React from 'react';
import styles from './3dbutton.module.css';
import { playClickSound } from '../../../utils/soundUtils';
import type { IconType } from 'react-icons';

type ButtonState = 'locked' | 'doable' | 'done';

interface ThreeDButtonProps {
  onClick?: () => void;
  text: string;
  enableSound?: boolean;
  variant?: 'rectangle' | 'round';
  icon?: React.ReactNode | IconType;
  state?: ButtonState;
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  onClick,
  text,
  enableSound = false,
  variant = 'rectangle',
  icon,
  state = 'doable',
}) => {
  const handleClick = () => {
    if (enableSound) {
      playClickSound();
    }
    onClick?.();
  };

  const baseButtonClass = variant === 'round' ? styles.tdbuttonRound : styles.tdbutton;
  const stateClass = styles[`tdbutton${state.charAt(0).toUpperCase() + state.slice(1)}`];
  const buttonClass = `${baseButtonClass} ${stateClass}`;

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
      // disabled={state === 'locked'}
    >
      {renderIcon()}
      {text}
    </button>
  );
};

export default ThreeDButton;
