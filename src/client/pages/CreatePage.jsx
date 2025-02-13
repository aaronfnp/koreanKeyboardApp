import React from "react";
import Edit from "../components/Edit";
import { useState } from "react";

export default function CreatePage() {
  const [storedWords, setStoredWords] = useState("");
  const [storedListInfo, setStoredListInfo] = useState("");

  return (
    <div className="mt-40">
      <Edit
        storedWords={storedWords}
        storedListInfo={storedListInfo}
        setStoredWords={setStoredWords}
        setStoredListInfo={setStoredListInfo}
      />
    </div>
  );
}
