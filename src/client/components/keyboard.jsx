import React from "react";
import "./Keyboard.css";

export default function Keyboard() {
  const virtualKeyboardLength = 40;

  return (
    <div id="keyboard">
      {Array.from({ length: virtualKeyboardLength }).map((_, index) => (
        <div key={index} className="key">
          1
        </div>
      ))}
    </div>
  );
}
