import React from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";

export default function Keyboard() {
  return (
    <div id="keyboard">
      {keyboard.map((key, index) => (
        <div key={key.index} className="key">
          {key.hangul || key.key}
        </div>
      ))}
    </div>
  );
}
