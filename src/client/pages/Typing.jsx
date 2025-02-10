import React from "react";
import { useState } from "react";
import Keyboard from "../components/Keyboard";
import InputContainer from "../components/InputContainer";
import useTranslate from "../../hooks/useTranslate";
import useLocalStorage from "../../hooks/useLocalStorage";

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

export default function Typing() {
  const [inputText, setInputText] = useState("");
  const [inputEng, setEngText] = useState("");
  const [isShifted, setIsShifted] = useState(false);
  const [storedWords, setStoredWords] = useState([]);
  const [storedListInfo, setStoredListInfo] = useState(basicWordList);

  const outputText = useTranslate(inputText);

  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    storedListInfo,
    setStoredWords,
    setStoredListInfo
  );

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
    <div>
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
    </div>
  );
}
