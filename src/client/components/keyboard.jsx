import React, { useEffect, useState } from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";

export default function Keyboard({ isShifted, setIsShifted }) {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyEvent = (e) => {
      setIsCapsLockOn(e.getModifierState("CapsLock"));
      if (e.key === "Shift") setIsShifted(e.type === "keydown");
    };

    document.addEventListener("keydown", handleKeyEvent);
    document.addEventListener("keyup", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
      document.removeEventListener("keyup", handleKeyEvent);
    };
  }, [setIsShifted]);

  const isUppercaseMode = isShifted || isCapsLockOn;

  return (
    <div id="keyboard">
      {keyboard.map((key) => (
        <div key={key.lowerCase} className="key">
          <div className="altKey">
            {isUppercaseMode ? key.upperCase : key.lowerCase}
          </div>
          <div className="mainKey">
            {isUppercaseMode ? key.hangulCap || key.hangul : key.hangul}
          </div>
        </div>
      ))}
      <div>{isUppercaseMode ? "Uppercase Mode" : "Lowercase Mode"}</div>
    </div>
  );
}
