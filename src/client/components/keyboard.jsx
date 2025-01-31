import React from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";
import { useEffect } from "react";

export default function Keyboard({ isShifted, setIsShifted }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Shift") {
        setIsShifted(true);
      }
      if (e.key === "CapsLock") {
        setIsShifted((prev) => !prev);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setIsShifted(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div id="keyboard">
      {keyboard.map((key) =>
        isShifted && key.hangulCap ? (
          <div key={key.index} className="key">
            <div className="altKey">{key.upperCase}</div>
            <div className="mainKey">{key.hangulCap}</div>
          </div>
        ) : (
          <div key={key.index} className="key">
            <div className="altKey">{key.lowerCase}</div>
            <div className="mainKey">{key.hangul}</div>
          </div>
        )
      )}
      {isShifted ? <div>Shifted</div> : <div>Not Shifted</div>}
    </div>
  );
}
