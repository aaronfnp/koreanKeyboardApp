import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Keyboard from "./components/keyboard";
import useLocalStorage from "../hooks/useLocalStorage";
import TextInput from "./components/TextInput";
import StoredWords from "./components/WordList";
import useTranslate from "../hooks/useTranslate";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputEng, setEngText] = useState("");
  const [isShifted, setIsShifted] = useState(false);
  const [storedWords, setStoredWords] = useState([]);

  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    1
  );

  const outputText = useTranslate(inputText);

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleEnglishChange(e) {
    setEngText(e.target.value);
  }

  function handleClick() {
    console.log(`adding ${outputText}`);
    setStoredWords((prev) => [
      ...prev,
      { korean: outputText, english: inputEng },
    ]);
    setInputText("");
    setEngText("");
  }

  return (
    <div className="App">
      <h1>Korean Keyboard</h1>
      <TextInput
        label="Input Korean"
        value={inputText}
        onChange={handleChange}
        placeholder="This will output below in Korean"
      />
      <TextInput
        label="Input English Meaning"
        value={inputEng}
        onChange={handleEnglishChange}
        placeholder="Type in an English translation"
      />
      <div className="output-container">
        <label>Output</label>
        <textarea
          value={`${outputText} ${inputEng ? `means ${inputEng}` : ""}`}
          placeholder="Translation here"
          readOnly
        />
        <button onClick={handleClick}>Store Word</button>
        <button onClick={saveWordsLocally}>Save Locally</button>
      </div>
      <div className="keyboard-container">
        <Keyboard isShifted={isShifted} setIsShifted={setIsShifted} />
      </div>
      <StoredWords words={storedWords} />
    </div>
  );
}

export default App;
