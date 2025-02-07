import React from "react";
import ListSidebar from "../components/ListSidebar";
import ListDetails from "../components/ListDetails";
import { useParams } from "react-router-dom";

const BookDisplay = ({
  storedWords,
  setStoredWords,
  storedListInfo,
  setStoredListInfo,
}) => {
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
    </div>
  );
};

export default BookDisplay;
