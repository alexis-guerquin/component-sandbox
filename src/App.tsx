import './App.css';
import DailyQuest from './components/Quests/DailyQuest/DailyQuest';
import { QuestProvider } from './contexts/QuestContext';
import ComponentTester from './components/Testers/ComponentTester/ComponentTester';
import SoundTester from './components/Testers/SoundTester/SoundTester';
import SessionEndTester from './components/Testers/SessionEndTester/SessionEndTester';
import TutorialPath from './components/TutorialPath/TutorialPath';
import ThreeDButton from './components/Buttons/3DButton/3dbutton';
import { FaPlus } from 'react-icons/fa';
// import Grid from './components/Path/Grid/Grid';
import Objectives from './components/Path/Objectives';
import Timer from './components/Timer/Timer';
import TimerWidgetWithContext from './components/Timer/TimerWidget/TimerWidgetWithContext';
import { TimerProvider, useTimer } from './hooks/useTimer';

// Composant pour afficher le temps total cumulé
const TotalPomodoroTime = () => {
  const { totalPomodoroTime, formatTime } = useTimer();
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <div style={{ fontWeight: 'bold' }}>Temps Total Pomodoro</div>
      <div>{formatTime(totalPomodoroTime)}</div>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <QuestProvider>
        <TimerProvider>
          <TotalPomodoroTime />
          
          <div className="tester">
            <ComponentTester />
            <SoundTester />
            <SessionEndTester />
            <div className="buttons">
              <ThreeDButton text="Default" enableSound={true} />
              <ThreeDButton text="Round" variant="round" enableSound={true}/>
              <ThreeDButton text="" icon={FaPlus} variant="round" enableSound={true} />
              <ThreeDButton text="Icon + text" icon={FaPlus} enableSound={true} />
            </div>
          </div>

          <div className="components">
            <div className="timer-section">
              <Timer variant="full" />
            </div>
            <div className="daily-missions">
              <DailyQuest
                style="pomodoro"
              />
            </div>
            <div className="tutorial-path">
              <TutorialPath />
            </div>
            <div className="grid">
            <Objectives 
              // onObjectiveClick={(position) => console.log(`Mission ${position} complétée`)}
            />
            </div>
          </div>

          {/* Widget Timer qui apparaît sur toutes les pages */}
          <TimerWidgetWithContext />
        </TimerProvider>
      </QuestProvider>
    </div>
  );
}

export default App;
