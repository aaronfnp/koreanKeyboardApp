import React, { useState } from "react";
import Flashcard from "./Flashcard";

export default function StudyContainer({ storedWords }) {
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
      </main>
    </>
  );
}
