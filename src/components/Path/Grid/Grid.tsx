import React from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  tileColor?: string;
  backgroundColor?: string;
  className?: string;
}

const defaultProps: GridProps = {
  tileColor: '#4a90e2',
  backgroundColor: '#f5f5f5',
  className: '',
};

const Grid: React.FC<GridProps> = ({
  tileColor = defaultProps.tileColor!,
  backgroundColor = defaultProps.backgroundColor!,
  className = defaultProps.className!,
}) => {
  const cols = 10;
  const rows = 10;
  const totalTiles = cols * rows;

  const tileStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    aspectRatio: '1/1',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 10%)',
    gridTemplateRows: 'repeat(10, 10%)',
    gap: '0',
    width: '100%',
    height: '100%',
    aspectRatio: '1/1',
  };

  return (
    <div 
      className={`${styles.gridContainer} ${className}`}
      style={containerStyle}
    >
      {Array.from({ length: totalTiles }, (_, index) => (
        <div
          key={index}
          className={styles.gridTile}
          style={{
            ...tileStyle,
            backgroundColor: index % 2 === 0 ? tileColor : backgroundColor,
          }}
          data-testid={`grid-tile-${index}`}
        />
      ))}
    </div>
  );
};

export default Grid;