import "./App.css";
import SelectionBar from "./Components/SelectionBar/SelectionBar";
import DogView from "./Components/DogView/DogView";
import DogAdd from "./Components/DogAdd/DogAdd";
import { useState } from "react";

function App() {
  const [view, setView] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DogNetwork</h1>
      </header>
      <body>
        <div className="App-main">
          <SelectionBar setView={setView} />
          <div hidden={!view}>{view === "view" ? <DogView /> : <DogAdd />}</div>
        </div>
      </body>
    </div>
  );
}

export default App;
