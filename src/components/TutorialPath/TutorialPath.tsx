import React, { useEffect, useRef, useState } from "react";
import styles from "./TutorialPath.module.css";
import ThreeDButton from "../Buttons/3DButton/3dbutton";

const steps = [1, 2, 3, 4, 5];

const TutorialPath: React.FC = () => {
  const [progressStep, setProgressStep] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const handleClick = (index: number) => {
    if (index <= progressStep && progressStep < steps.length - 1) {
      setProgressStep(progressStep + 1);
    }
  };

  useEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      setPathLength(totalLength);
    }
  }, []);

  const getPointAt = (index: number) => {
    if (!pathRef.current || pathLength === 0) return { x: 0, y: 0 };
    const t = index / (steps.length - 1);
    const point = pathRef.current.getPointAtLength(t * pathLength);
    return { x: point.x, y: point.y };
  };

  return (
    <div className={styles.tutorialContainer}>
      <div className={styles.desktop}>
        <svg
          className={styles.connector}
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 40 200 Q 200 -40 360 200"
            fill="none"
            stroke="#ddd"
            strokeWidth="4"
          />
          <path
            d="M 40 200 Q 200 -40 360 200"
            fill="none"
            stroke="var(--brown-900)"
            strokeWidth="4"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - progressStep / (steps.length - 1))}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>

        <div className={styles.diamond} />

        {steps.map((step, index) => {
          const { x, y } = getPointAt(index);
          return (
            <div
              key={index}
              className={styles.step}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThreeDButton
                text={index <= progressStep ? step.toString() : "🔒"}
                onClick={() => handleClick(index)}
                variant="round"
                enableSound={true}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.mobile}>
        <div className={styles.diamond} />
        {steps.map((step, index) => (
          <ThreeDButton
            key={index}
            text={index <= progressStep ? step.toString() : "🔒"}
            onClick={() => handleClick(index)}
            variant="round"
          />
        ))}
      </div>
    </div>
  );
};

export default TutorialPath;