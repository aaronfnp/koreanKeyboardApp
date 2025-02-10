import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import StoredWords from "./components/WordList";
import useTranslate from "../hooks/useTranslate";
import InputContainer from "./components/InputContainer";
import CSVComponent from "./components/CSVComponent";
import BookDisplay from "./pages/BookDisplay";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputEng, setEngText] = useState("");
  const [isShifted, setIsShifted] = useState(false);

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
      <Header />
      <Routes>
        <Route path="/" element={<BookDisplay />} />
        <Route path="/input" element={<InputContainer />} />
        {/* Add more routes as needed */}
      </Routes>
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
