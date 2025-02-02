import React, { useEffect, useState } from "react";
import "./Keyboard.css";
import keyboard from "../utilities/koreanKeyMap";

export default function Keyboard({ isShifted, setIsShifted, isActive }) {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setIsCapsLockOn(e.getModifierState("CapsLock"));
      if (e.key === "Shift") setIsShifted(true);
      setActiveKey(e.key.toLowerCase());
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") setIsShifted(false);
      setActiveKey(null);
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
    <div id="keyboard">
      <div className="row">
        {keyboard.slice(0, 10).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
            isActive={activeKey === key.lowerCase}
          />
        ))}
      </div>
      <div className="row">
        {keyboard.slice(10, 19).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
            isActive={activeKey === key.lowerCase}
          />
        ))}
      </div>
      <div className="row">
        {keyboard.slice(19).map((key) => (
          <Key
            key={key.lowerCase}
            keyData={key}
            isUppercaseMode={isUppercaseMode}
            isActive={activeKey === key.lowerCase}
          />
        ))}
      </div>
      <div className="mode">
        {isUppercaseMode ? "Uppercase Mode" : "Lowercase Mode"}
      </div>
    </div>
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
