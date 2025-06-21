import './App.css';
import DailyQuest from './components/Quests/DailyQuest/DailyQuest';
import { QuestProvider } from './contexts/QuestContext';
import ComponentTester from './components/Testers/ComponentTester/ComponentTester';
import SoundTester from './components/Testers/SoundTester/SoundTester';

function App() {
  return (
    <div className="app">
      <QuestProvider>
        <div className="tester">
          <ComponentTester />
          <SoundTester />
        </div>
        <div className="daily-missions">
          <DailyQuest
            style="pomodoro"
          />
        </div>
      </QuestProvider>
    </div>
  );
}

export default App;
