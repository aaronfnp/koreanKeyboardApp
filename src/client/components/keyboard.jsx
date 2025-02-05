import React, { useEffect, useState } from "react";
import "./Keyboard.css";
import characterMap from "../utilities/CharacterMap";

export default function Keyboard({ isShifted, setIsShifted, isActive }) {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setIsCapsLockOn(e.getModifierState("CapsLock"));
      if (e.key === "Shift") setIsShifted(true);
      const key = e.key.toLowerCase();
      setActiveKeys((prevKeys) => {
        if (!prevKeys.includes(key)) {
          return [...prevKeys, key];
        }
        return prevKeys;
      });
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") setIsShifted(false);
      setActiveKeys((prevKeys) =>
        prevKeys.filter((key) => key !== e.key.toLowerCase())
      );
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setIsShifted]);

  const isUppercaseMode = isShifted || isCapsLockOn;

  return (
    <>
      {isVisible && (
        <div className="keyboard-container">
          <div id="keyboard">
            <div className="row">
              {characterMap.slice(0, 10).map((key) => (
                <Key
                  key={key.lowerCase}
                  keyData={key}
                  isUppercaseMode={isUppercaseMode}
                  isActive={activeKeys.includes(key.lowerCase)}
                />
              ))}
            </div>
            <div className="row">
              {characterMap.slice(10, 19).map((key) => (
                <Key
                  key={key.lowerCase}
                  keyData={key}
                  isUppercaseMode={isUppercaseMode}
                  isActive={activeKeys.includes(key.lowerCase)}
                />
              ))}
            </div>
            <div className="row">
              {characterMap.slice(19).map((key) => (
                <Key
                  key={key.lowerCase}
                  keyData={key}
                  isUppercaseMode={isUppercaseMode}
                  isActive={activeKeys.includes(key.lowerCase)}
                />
              ))}
            </div>
            <div className="mode">
              {isUppercaseMode ? "Uppercase Mode" : "Lowercase Mode"}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Keyboard" : "View Keyboard"}
      </button>
    </>
  );
}

const Key = ({ keyData, isUppercaseMode, isActive }) => {
  return (
    <div className={`key ${isActive ? "active" : ""}`}>
      <div className="altKey">
        {isUppercaseMode ? keyData.upperCase : keyData.lowerCase}
      </div>
      <div className="mainKey">
        {isUppercaseMode ? keyData.hangulCap || keyData.hangul : keyData.hangul}
      </div>
    </div>
  );
};
