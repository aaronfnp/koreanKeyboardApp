import React from "react";

export default function StudyContainer() {
  const exampleTypes = ["Flashcards", "Test", "Match"];

  return (
    <div id="study-container">
      {exampleTypes.map((e) => (
        <div className="study-box">{e}</div>
      ))}
    </div>
  );
}
