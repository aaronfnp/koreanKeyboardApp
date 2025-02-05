import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import useLocalStorage from "../hooks/useLocalStorage";
import StoredWords from "./components/WordList";
import useTranslate from "../hooks/useTranslate";
import InputContainer from "./components/InputContainer";

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
      <InputContainer
        inputText={inputText}
        setInputText={setInputText}
        inputEng={inputEng}
        setEngText={setEngText}
        outputText={outputText}
      />
      <button onClick={handleClick}>Store Word</button>
      <button onClick={saveWordsLocally}>Save Locally</button>

      <Keyboard isShifted={isShifted} setIsShifted={setIsShifted} />
      <StoredWords words={storedWords} />
    </div>
  );
}

export default App;
