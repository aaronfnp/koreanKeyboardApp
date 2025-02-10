import React from "react";
import ListSidebar from "../components/ListSidebar";
import ListDetails from "../components/ListDetails";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import CSVComponent from "../components/CSVComponent";
import { useState } from "react";

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

export default function BookDisplay() {
  const [storedWords, setStoredWords] = useState([]);
  const [storedListInfo, setStoredListInfo] = useState(basicWordList);
  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    storedListInfo,
    setStoredWords,
    setStoredListInfo
  );
  const { id } = useParams();
  //   const list = lists.find((l) => l.id === parseInt(id, 10));

  if (!storedListInfo) return <p>List not found</p>;

  return (
    <div className="list-page">
      <ListSidebar storedListInfo={storedListInfo} />
      <ListDetails
        storedWords={storedWords}
        setStoredWords={setStoredWords}
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      />
      <CSVComponent setStoredWords={setStoredWords} />
    </div>
  );
}
