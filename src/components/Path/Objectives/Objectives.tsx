import React, { useState } from 'react';
import styles from './Objectives.module.css';
import ThreeDButton from '../../Buttons/3DButton/3dbutton';
import { FaPlus } from 'react-icons/fa';

export interface ObjectivesProps {
  onObjectiveClick?: (position: number) => void;
}

const defaultProps: ObjectivesProps = {
  onObjectiveClick: () => {},
};

// Interface pour les données d'objectif
interface ObjectiveData {
  id: number;
  title: string;
  description: string;
  position: [number, number];
  icon?: React.ReactNode;
}

const Objectives: React.FC<ObjectivesProps> = ({
  onObjectiveClick = defaultProps.onObjectiveClick!,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Données des objectifs avec descriptions
  const objectivesData: ObjectiveData[] = [
    {
      id: 0,
      title: "Objectif 1",
      description: "Premier objectif à accomplir dans votre parcours d'apprentissage",
      icon: <FaPlus />,
      position: [7, 1]
    },
    {
      id: 1,
      title: "Objectif 2", 
      description: "Deuxième étape vers la maîtrise des compétences",
      icon: <FaPlus />,
      position: [5, 4]
    },
    {
      id: 2,
      title: "Objectif 3",
      description: "Troisième objectif pour progresser dans votre formation",
      icon: <FaPlus />,
      position: [4, 7]
    },
    {
      id: 3,
      title: "Objectif 4",
      description: "Quatrième étape de votre parcours d'apprentissage", 
      icon: <FaPlus />,
      position: [5, 10]
    },
    {
      id: 4,
      title: "Objectif 5",
      description: "Cinquième objectif pour approfondir vos connaissances",
      icon: <FaPlus />,
      position: [7, 13]
    },
    {
      id: 5,
      title: "Objectif 6",
      description: "Sixième étape vers l'excellence dans votre domaine",
      icon: <FaPlus />,
      position: [9, 10]
    },
    {
      id: 6,
      title: "Objectif 7",
      description: "Septième objectif pour perfectionner vos compétences",
      icon: <FaPlus />,
      position: [10, 7]
    },
    {
      id: 7,
      title: "Objectif 8",
      description: "Dernier objectif pour compléter votre formation",
      icon: <FaPlus />,
      position: [9, 4]
    }
  ];

  const objectivePositions = objectivesData.map(obj => obj.position);

  const handleObjectiveClick = (position: number) => {
    // Basculer l'affichage de la bulle
    setActiveTooltip(activeTooltip === position ? null : position);
    onObjectiveClick(position);
  };

  // Calculer les dimensions de la grille basées sur les positions des objectifs
  const maxRow = Math.max(...objectivePositions.map(([row]) => row));
  const maxCol = Math.max(...objectivePositions.map(([, col]) => col));
  
  // Ajouter une marge pour s'assurer que tous les objectifs sont visibles
  const gridRows = maxRow + 3; // +3 pour la marge
  const gridCols = maxCol + 3; // +3 pour la marge

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, ${100 / gridCols}%)`,
    gridTemplateRows: `repeat(${gridRows}, ${100 / gridRows}%)`,
    gap: '0',
    width: '100%',
    aspectRatio: `${gridCols}/${gridRows}`,
  };

  // Composant de bulle de description
  const Tooltip: React.FC<{ objective: ObjectiveData; isVisible: boolean }> = ({ objective, isVisible }) => {
    if (!isVisible) return null;

    const tooltipStyle: React.CSSProperties = {
      top: `${(objective.position[0] / gridRows) * 100 - 5}%`,
      left: `${(objective.position[1] / gridCols) * 100 + 3}%`,
      transform: 'translate(-50%, -100%)',
    };

    return (
      <div 
        className={styles.tooltip} 
        style={tooltipStyle} 
        data-testid={`tooltip-${objective.id}`}
      >
        <div className={styles.tooltipTitle}>
          {objective.title}
        </div>
        <div className={styles.tooltipDescription}>
          {objective.description}
        </div>
        <div className={styles.tooltipArrow}></div>
      </div>
    );
  };

  // Créer un tableau d'éléments basé sur les dimensions calculées
  const gridItems = Array.from({ length: gridRows * gridCols }, (_, index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    
    // Vérifier si cette position contient un objectif
    const objectiveData = objectivesData.find((obj) => obj.position[0] === row && obj.position[1] === col);
    
    if (objectiveData) {
      return (
        <div
          key={`objective-${objectiveData.id}`}
          className={styles.objectiveButton}
          data-testid={`objective-button-${objectiveData.id}`}
        >
          <ThreeDButton
            text={""}
            icon={objectiveData.icon}
            variant="round"
            onClick={() => handleObjectiveClick(objectiveData.id)}
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
      className={`${styles.objectivesContainer}`}
      style={containerStyle}
    >
      {gridItems}
      {objectivesData.map((objective) => (
        <Tooltip
          key={`tooltip-${objective.id}`}
          objective={objective}
          isVisible={activeTooltip === objective.id}
        />
      ))}
    </div>
  );
};

export default Objectives; 