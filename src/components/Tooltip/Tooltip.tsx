import React, { useEffect, useRef } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  title: string;
  description: string;
  isVisible: boolean;
  position: {
    top: string;
    left: string;
  };
  variant: 'primary' | 'secondary' | 'grey';
  className?: string;
  'data-testid'?: string;
  onClose?: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  description,
  isVisible = false,
  position,
  variant = 'primary',
  className = '',
  'data-testid': dataTestId,
  onClose,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const tooltipStyle: React.CSSProperties = {
    top: position.top,
    left: position.left,
    transform: 'translate(-50%, -100%)',
  };

  const tooltipClass = `${styles.tooltip} ${styles[`tooltip${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${className}`;

  return (
    <div 
      ref={tooltipRef}
      className={tooltipClass} 
      style={tooltipStyle} 
      data-testid={dataTestId}
    >
      <div className={styles.tooltipTitle}>
        {title}
      </div>
      <div className={styles.tooltipDescription}>
        {description}
      </div>
      <div className={`${styles.tooltipArrow} ${styles[`tooltipArrow${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}></div>
    </div>
  );
};

export default Tooltip; 