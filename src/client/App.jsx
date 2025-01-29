import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import koreanKeyMap from "./components/koreanKeyMap";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleTranslate(e) {}

  return (
    <div className="App">
      <div>
        <h1>Korean Keyboard</h1>
        <label>Input</label>
        <input value={inputText} onChange={handleChange} />
        <div>{inputText}</div>
        <label>Output</label>
        <input value={outputText} />
      </div>
    </div>
  );
}

export default App;
