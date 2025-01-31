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
      <div className="row">
        {keyboard.slice(0, 10).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
          />
        ))}
      </div>
      <div className="row">
        {keyboard.slice(10, 19).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
          />
        ))}
      </div>
      <div className="row">
        {keyboard.slice(19).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
          />
        ))}
      </div>
      <div className="mode">
        {isUppercaseMode ? "Uppercase Mode" : "Lowercase Mode"}
      </div>
    </div>
  );
}

const Key = ({ keyData, isUppercaseMode }) => {
  return (
    <div className="key">
      <div className="altKey">
        {isUppercaseMode ? keyData.upperCase : keyData.lowerCase}
      </div>
      <div className="mainKey">
        {isUppercaseMode ? keyData.hangulCap || keyData.hangul : keyData.hangul}
      </div>
    </div>
  );
};
