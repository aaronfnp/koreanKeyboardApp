import React, { useState } from "react";
import ListSidebar from "../components/ListSidebar";
import ListDetails from "../components/ListDetails";
import useLocalStorage from "../../hooks/useLocalStorage";
import CSVComponent from "../components/CSVComponent";
import Edit from "../components/Edit";
import StudyContainer from "../components/StudyContainer";

const basicWordList = {
  id: 1,
  title_en: "",
  title_kr: "",
  author: "",
  description: "",
  type: "",
  difficulty: "",
  themes: [],
  image: "",
  url: "",
  wordList: [],
};

export default function BookDisplay() {
  const [mode, setMode] = useState("viewing"); // "viewing" | "editing" | "studying"
  const [storedWords, setStoredWords] = useState([]);
  const [storedListInfo, setStoredListInfo] = useState(basicWordList);
  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    storedListInfo,
    setStoredWords,
    setStoredListInfo
  );

  if (!storedListInfo) return <p>List not found</p>;

  return (
    <div className="list-page">
      <ListSidebar storedListInfo={storedListInfo} />

      {mode === "editing" ? (
        <Edit
          storedWords={storedWords}
          storedListInfo={storedListInfo}
          setStoredWords={setStoredWords}
          setStoredListInfo={setStoredListInfo}
        />
      ) : mode === "studying" ? (
        <StudyContainer
          storedWords={storedWords}
          setStoredWords={setStoredWords}
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
        />
      ) : (
        <ListDetails
          storedWords={storedWords}
          setStoredWords={setStoredWords}
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
        />
      )}

      <div>
        <button onClick={saveWordsLocally}>Save Locally</button>
        <CSVComponent setStoredWords={setStoredWords} />
        <button onClick={() => setMode("editing")}>Edit</button>
        <button onClick={() => setMode("studying")}>Study</button>
        <button onClick={() => setMode("viewing")}>View</button>
      </div>
    </div>
  );
}
