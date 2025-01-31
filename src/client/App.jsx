import { useState, useEffect, useCallback } from "react";
import "./App.css";
import keyboard from "./utilities/koreanKeyMap";
import * as Hangul from "hangul-js";
import Keyboard from "./components/keyboard";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isShifted, setIsShifted] = useState(false);

  function handleChange(e) {
    setInputText(e.target.value);
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
      <div>
        <h1>Korean Keyboard</h1>
        <label>Input</label>
        <div>{inputText}</div>
        <input
          value={inputText}
          onChange={handleChange}
          placeholder="Type in English"
        />
        <label>Output</label>
        <textarea value={outputText} readOnly />
      </div>
      <Keyboard isShifted={isShifted} setIsShifted={setIsShifted} />
    </div>
  );
}

export default App;
