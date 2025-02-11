import React from "react";
import ListSidebar from "../components/ListSidebar";
import ListDetails from "../components/ListDetails";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import CSVComponent from "../components/CSVComponent";
import { useState } from "react";
import Edit from "../components/Edit";

const basicWordList = {
  id: 1,
  title_en: "",
  title_kr: "",
  author: "",
  description: "",
  type: "",
  difficulty: "",
  themes: "",
  image: "",
  url: "",
  wordList: [],
};

export default function BookDisplay() {
  const [isEditing, setIsEditing] = useState(false);
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
      <button className="mt-10" onClick={() => setIsEditing((e) => !e)}>
        Edit
      </button>
      {isEditing ? (
        <Edit
          storedWords={storedWords}
          storedListInfo={storedListInfo}
          setStoredWords={setStoredWords}
          setStoredListInfo={setStoredListInfo}
        />
      ) : (
        <>
          <ListSidebar storedListInfo={storedListInfo} />
          <ListDetails
            storedWords={storedWords}
            setStoredWords={setStoredWords}
            storedListInfo={storedListInfo}
            setStoredListInfo={setStoredListInfo}
          />
        </>
      )}
      <button className="bg-black" onClick={saveWordsLocally}>
        Save Locally
      </button>
      <CSVComponent setStoredWords={setStoredWords} />
    </div>
  );
}
