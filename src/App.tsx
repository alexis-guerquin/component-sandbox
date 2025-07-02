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

function App() {
  return (
    <div className="app">
      <QuestProvider>
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
      </QuestProvider>
    </div>
  );
}

export default App;
