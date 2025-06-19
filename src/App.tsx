import './App.css';
import DailyQuest from './components/Quests/DailyQuest/DailyQuest';
import { QuestProvider } from './contexts/QuestContext';
import ComponentTester from './components/Quests/ComponentTester/ComponentTester';
import SoundTester from './components/SoundTester/SoundTester';

function App() {
  return (
    <div className="app">
      <QuestProvider>
        <ComponentTester />
        <div className="daily-missions">
          <DailyQuest
            style="pomodoro"
          />
        </div>
      </QuestProvider>
      <SoundTester />
    </div>
  );
}

export default App;
