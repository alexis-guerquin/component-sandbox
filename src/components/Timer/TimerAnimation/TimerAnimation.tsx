import React from "react";
import styles from "./TimerAnimation.module.css";

interface TimerAnimationProps {
  timeLeft: number;
  totalTime: number;
  mode: "pomodoro" | "break";
}

const TimerAnimationComponent: React.FC<TimerAnimationProps> = ({
  timeLeft,
  totalTime,
  mode,
}) => {
  const progress = Math.min(Math.max(timeLeft / totalTime, 0), 1);

  // En pomodoro on vide, en break on remplit
  const percent = mode === "pomodoro" ? progress : 1 - progress;
  const heightPercent = percent * 100;
  const yPercent = 100 - heightPercent;

  return (
    <div className={styles.pleft}>
      <div className={styles.coffeeContainer}>
        <svg
          className={styles.coffeeSvg}
          viewBox="0 0 120 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Clip path pour la forme de tasse */}
          <defs>
            <clipPath id="coffeeClip">
              <path d="M20 10h60v60a30 30 0 0 1-60 0z" />
            </clipPath>
          </defs>

          {/* Tasse */}
          <path
            d="M20 10h60v60a30 30 0 0 1-60 0z"
            fill="#D2B48C"
            stroke="#533634"
            strokeWidth="3"
          />

          {/* Poignée */}
          <path
            d="M80 30
               a10 10 0 0 1 0 40
               a5 10 0 0 0 0 -40"
            fill="#533634"
            stroke="#533634"
            strokeWidth="3"
          />

          {/* Liquide */}
          <rect
            x="0"
            y={`${yPercent}%`}
            width="100%"
            height={`${heightPercent}%`}
            fill="#533634"
            clipPath="url(#coffeeClip)"
          />
        </svg>
      </div>
    </div>
  );
};

// re-render when props changes
const TimerAnimation = React.memo(TimerAnimationComponent, (prev, next) => {
  return (
    prev.timeLeft === next.timeLeft &&
    prev.totalTime === next.totalTime &&
    prev.mode === next.mode
  );
});

export default TimerAnimation; 