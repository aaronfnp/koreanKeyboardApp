import React from "react";
import { useState } from "react";

export default function Flashcard() {
  const [flip, setFlip] = useState(false);
  return (
    <div>
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="front">front</div>
        <div className="back">back</div>
      </div>
    </div>
  );
}
