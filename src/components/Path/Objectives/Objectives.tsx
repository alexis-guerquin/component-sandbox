import React from 'react';
import styles from './Objectives.module.css';
import ThreeDButton from '../../Buttons/3DButton/3dbutton';

export interface ObjectivesProps {
  tileColor?: string;
  backgroundColor?: string;
  buttonText?: string;
  onObjectiveClick?: (position: number) => void;
  className?: string;
}

const defaultProps: ObjectivesProps = {
//   tileColor: '#4a90e2',
//   backgroundColor: '#f5f5f5',
  buttonText: 'w',
  onObjectiveClick: () => {},
  className: '',
};

const Objectives: React.FC<ObjectivesProps> = ({
//   tileColor = defaultProps.tileColor!,
  backgroundColor = defaultProps.backgroundColor!,
  buttonText = defaultProps.buttonText!,
  onObjectiveClick = defaultProps.onObjectiveClick!,
  className = defaultProps.className!,
}) => {
  const objectivePositions = [
    [1, 9],
    [5, 12],
    [9, 14],
    [13, 12],
    [17, 9],
    [21, 6],
    [25, 9],
    [29, 12],
    [33, 14],
    [37, 12],
    [41, 9],
    [45, 6],
    [49, 9],
  ];

  const handleObjectiveClick = (position: number) => {
    onObjectiveClick(position);
  };

  // Calculer les dimensions de la grille basées sur les positions des objectifs
  const maxRow = Math.max(...objectivePositions.map(([row]) => row));
  const maxCol = Math.max(...objectivePositions.map(([, col]) => col));
  
  // Ajouter une marge pour s'assurer que tous les objectifs sont visibles
  const gridRows = maxRow + 3; // +3 pour la marge
  const gridCols = maxCol + 3; // +3 pour la marge

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, ${100 / gridCols}%)`,
    gridTemplateRows: `repeat(${gridRows}, ${100 / gridRows}%)`,
    gap: '0',
    width: '100%',
    aspectRatio: `${gridCols}/${gridRows}`,
  };

  // Créer un tableau d'éléments basé sur les dimensions calculées
  const gridItems = Array.from({ length: gridRows * gridCols }, (_, index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    
    // Vérifier si cette position contient un objectif
    const objectiveIndex = objectivePositions.findIndex(([r, c]) => r === row && c === col);
    
    if (objectiveIndex !== -1) {
      return (
        <div
          key={`objective-${objectiveIndex}`}
          className={styles.objectiveButton}
          data-testid={`objective-button-${objectiveIndex}`}
        >
          <ThreeDButton
            text={buttonText}
            variant="round"
            onClick={() => handleObjectiveClick(objectiveIndex)}
            enableSound={true}
          />
        </div>
      );
    }
    
    // Case normale de la grille
    const tileStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      aspectRatio: '1/1',
    //   border: '1px solid rgba(0, 0, 0, 0.1)',
    //   backgroundColor: index % 2 === 0 ? tileColor : backgroundColor,
    };
    
    return (
      <div
        key={`tile-${index}`}
        className={styles.gridTile}
        style={tileStyle}
        data-testid={`grid-tile-${index}`}
      />
    );
  });

  return (
    <div 
      className={`${styles.objectivesContainer} ${className}`}
      style={containerStyle}
    >
      {gridItems}
    </div>
  );
};

export default Objectives; 