import { useState, useEffect, useCallback } from "react";
import "./App.css";
import keyboard from "./utilities/koreanKeyMap";
import * as Hangul from "hangul-js";
import Keyboard from "./components/keyboard";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isShifted, setIsShifted] = useState(false);
  const [storedWords, setStoredWords] = useState([]);

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleClick() {
    console.log(`adding ${outputText}`);
    setStoredWords((prev) => [...prev, { korean: outputText }]);
  }

  const translateText = useCallback(() => {
    let newText = inputText
      .split("")
      .map((char) => {
        const keyToTranslate = keyboard.find(
          (item) => item.lowerCase === char.toLowerCase()
        );

        if (!keyToTranslate) return char;

        const isUpperCase = char === char.toUpperCase();
        return isUpperCase
          ? keyToTranslate.hangulCap || keyToTranslate.hangul
          : keyToTranslate.hangul;
      })
      .join("");

    newText = Hangul.assemble(newText.split(""));
    setOutputText(newText);
  }, [inputText]);

  useEffect(() => {
    translateText();
  }, [inputText]);

  return (
    <div className="App">
      <h1>Korean Keyboard</h1>
      <div className="input-container">
        <label>Input</label>
        <input
          value={inputText}
          onChange={handleChange}
          placeholder="Type in English"
        />
      </div>
      <div className="output-container">
        <label>Output</label>
        <textarea value={outputText} placeholder="Translation here" readOnly />
        <button onClick={handleClick}>Store Word</button>
      </div>
      <div className="keyboard-container">
        <Keyboard isShifted={isShifted} setIsShifted={setIsShifted} />
      </div>
      <h2>Stored Words</h2>
      {storedWords.map((word) => (
        <span>{word.korean}</span>
      ))}
    </div>
  );
}

export default App;
