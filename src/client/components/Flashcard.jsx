import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Flashcard({ storedWords }) {
  const [flip, setFlip] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextCard() {
    if (isShuffle) randomizeIndex();
    else
      setCurrentIndex((prev) => (prev < storedWords.length - 1 ? prev + 1 : 0));
  }

  function prevCard() {
    if (isShuffle) randomizeIndex();
    else
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : storedWords.length - 1));
  }

  function randomizeIndex() {
    const newNum = Math.floor(Math.random() * storedWords.length);
    if (newNum !== currentIndex) setCurrentIndex(newNum);
    else randomizeIndex();
  }

  return (
    storedWords.length > 0 && (
      <>
        <div id="flashcard-container">
          <button onClick={prevCard}>
            <ArrowLeftIcon className="w-8 h-8 text-gray-700" />
          </button>

          <div
            className={`card ${flip ? "flip" : ""}`}
            onClick={() => setFlip(!flip)}
          >
            {!flip ? (
              <div className="front">{storedWords[currentIndex].korean}</div>
            ) : (
              <div className="back">{storedWords[currentIndex].english}</div>
            )}
          </div>

          <button onClick={nextCard}>
            <ArrowRightIcon className="w-8 h-8 text-gray-700" />
          </button>
        </div>
        <button onClick={() => setIsShuffle(!isShuffle)}>
          Shuffle: {isShuffle ? "On" : "Off"}
        </button>
      </>
    )
  );
}
