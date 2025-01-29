import { useState, useEffect, useCallback } from "react";
import "./App.css";
import koreanKeyMap from "./utilities/koreanKeyMap";
import * as Hangul from "hangul-js";
import Keyboard from "./components/keyboard";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  function handleChange(e) {
    setInputText(e.target.value);
  }

  const translateText = useCallback(() => {
    let newText = inputText
      .split("")
      .map((char) => koreanKeyMap[char] || char)
      .join("");
    newText = Hangul.assemble(newText.split(""));
    setOutputText(newText);
  }, [inputText]);

  useEffect(() => {
    translateText();
  }, [inputText]);

  return (
    <div className="App">
      <div>
        <h1>Korean Keyboard</h1>
        <label>Input</label>
        <input
          value={inputText}
          onChange={handleChange}
          placeholder="Type in English"
        />
        <div>{inputText}</div>
        <label>Output</label>
        <input value={outputText} readOnly />
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
