import React from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";

export default function Keyboard() {
  return (
    <div id="keyboard">
      {keyboard.map((key) =>
        key.hangul ? (
          <div key={key.index} className="key">
            {key.hangul}
          </div>
        ) : (
          <div key={key.index} className="key">
            {key.key}
          </div>
        )
      )}
    </div>
  );
}
