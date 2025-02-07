import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import useLocalStorage from "../hooks/useLocalStorage";
import StoredWords from "./components/WordList";
import useTranslate from "../hooks/useTranslate";
import InputContainer from "./components/InputContainer";
import CSVComponent from "./components/CSVComponent";
import BookDisplay from "./components/BookDisplay";

const basicWordList = {
  id: 1,
  name: "",
  user: "",
  type: "",
  difficulty: "",
  themes: "",
  image: "",
  wordList: [],
};

function App() {
  const [inputText, setInputText] = useState("");
  const [inputEng, setEngText] = useState("");
  const [isShifted, setIsShifted] = useState(false);
  const [storedWords, setStoredWords] = useState([]);
  const [storedListInfo, setStoredListInfo] = useState(basicWordList);

  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    storedListInfo,
    setStoredWords,
    setStoredListInfo
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
      {/* <Header /> */}
      <BookDisplay
        storedWords={storedWords}
        setStoredWords={setStoredWords}
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      />
      {/* <h1>Korean Keyboard</h1> */}
      {/* <InputContainer
        inputText={inputText}
        setInputText={setInputText}
        inputEng={inputEng}
        setEngText={setEngText}
        outputText={outputText}
      />
      <button onClick={handleClick}>Store Word</button> */}
      {/* <button onClick={saveWordsLocally}>Save Locally</button> */}

      {/* <Keyboard isShifted={isShifted} setIsShifted={setIsShifted} /> */}
      {/* <StoredWords
        storedWords={storedWords}
        setStoredWords={setStoredWords}
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      /> */}
      {/* <CSVComponent setStoredWords={setStoredWords} /> */}
    </div>
  );
}

export default App;
