import React, { useState } from "react";
import Flashcard from "./Flashcard";

export default function StudyContainer({ storedWords }) {
  const exampleTypes = ["Flashcards", "Test", "Match"];
  const [activeType, setActiveType] = useState("");

  return (
    <>
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

      <div>
        <p>Selected: {activeType || "None"}</p>
        {activeType === "Flashcards" && <Flashcard storedWords={storedWords} />}
      </div>
    </>
  );
}
