import React from "react";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Flashcard({ storedWords }) {
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextCard() {
    setCurrentIndex((prev) => (prev < storedWords.length - 1 ? prev + 1 : 0));
  }

  function prevCard() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : storedWords.length - 1));
  }
  return (
    storedWords[currentIndex] && (
      <div>
        <button onClick={prevCard}>
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div
          className={`card ${flip ? "flip" : ""}`}
          onClick={() => setFlip(!flip)}
        >
          <div className="front">{storedWords[currentIndex].korean}</div>
          <div className="back">{storedWords[currentIndex].english}</div>
        </div>

        <button onClick={nextCard}>
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    )
  );
}
