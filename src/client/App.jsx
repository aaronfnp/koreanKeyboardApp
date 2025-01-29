import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  function handleChange(e) {
    setInputText(e.target.value)
  }

  return (
    <div className="App">
      <div>
        <h1>Korean Keyboard</h1>
        <label>Input</label>
        <input value={inputText} onChange={handleChange}/>
        <div>{inputText}</div>
        <label>Output</label>
        <input />
      </div>
    </div>
  );
}

export default App;
