import { useState, useEffect, useCallback } from "react";
import * as Hangul from "hangul-js";
import characterMap from "../client/utilities/CharacterMap";

export default function useTranslate(inputText) {
  const [outputText, setOutputText] = useState("");

  const translateText = useCallback(() => {
    let newText = inputText
      .split("")
      .map((char) => {
        const keyToTranslate = characterMap.find(
          (item) => item.lowerCase === char.toLowerCase()
        );

        if (!keyToTranslate) return char;

        const isUpperCase = char === char.toUpperCase();
        return isUpperCase
          ? keyToTranslate.hangulCap || keyToTranslate.hangul
          : keyToTranslate.hangul;
      })
      .join("");

    newText = Hangul.assemble(newText.split(""));
    setOutputText(newText);
  }, [inputText]);

  useEffect(() => {
    translateText();
  }, [inputText, translateText]);

  return outputText;
}
