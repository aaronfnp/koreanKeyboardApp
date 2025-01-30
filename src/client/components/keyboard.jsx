import React from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";

export default function Keyboard() {
  return (
    <div id="keyboard">
      {keyboard.map((key) =>
        key.hangul ? (
          <div key={key.index} className="key">
            <div className="altKey">{key.key}</div>
            <div className="mainKey">{key.hangul}</div>
          </div>
        ) : (
          <div key={key.index} className="key">
            {key.hangul}
          </div>
        )
      )}
    </div>
  );
}
