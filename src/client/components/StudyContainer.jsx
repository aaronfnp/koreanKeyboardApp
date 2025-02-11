import React, { useState } from "react";
import Flashcard from "./Flashcard";
import StudyWordList from "./WordList";

export default function StudyContainer({
  storedWords,
  setStoredWords,
  storedListInfo,
  setStoredListInfo,
}) {
  const exampleTypes = ["Flashcards", "Test", "Match"];
  const [activeType, setActiveType] = useState("Flashcards");

  return (
    <>
      <main className="list-details mt-10 rounded-lg">
        <div id="study-container">
          {exampleTypes.map((e) => (
            <div
              key={e}
              className="study-box cursor-pointer"
              onClick={() => setActiveType(e)}
            >
              {e}
            </div>
          ))}
        </div>

        {activeType && (
          <div id="study-viewer">
            <p>Selected: {activeType}</p>
            {activeType === "Flashcards" && (
              <Flashcard storedWords={storedWords} />
            )}
          </div>
        )}
        <StudyWordList
          storedWords={storedWords}
          setStoredWords={setStoredWords}
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
        />
      </main>
    </>
  );
}
