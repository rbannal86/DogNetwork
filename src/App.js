import './App.css';
import DogView from './Components/DogView/DogView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DogNetwork</h1>
      </header>
      <div>
        <div className="App-main">
          <DogView />
        </div>
      </div>
    </div>
  );
}

export default App;
