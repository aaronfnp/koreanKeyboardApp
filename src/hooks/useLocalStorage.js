import React, { useCallback } from "react";
import { useEffect } from "react";

const useLocalStorage = (wordList, storedListInfo) => {
  const saveWordsLocally = useCallback(() => {
    window.localStorage.setItem("LOCAL_LIST", JSON.stringify(storedListInfo));
    window.localStorage.setItem("LOCAL_WORDLIST", JSON.stringify(wordList));
  }, [wordList, storedListInfo.id]);

  const removeLocalWordList = useCallback(() => {
    // May want to add check to remove only if on current word list later on
    window.localStorage.removeItem(
      "LOCAL_LISTID",
      JSON.stringify(storedListInfo.id)
    );
    window.localStorage.removeItem("LOCAL_WORDLIST", JSON.stringify(wordList));
  }, []);

  useEffect(() => {
    saveWordsLocally();
  }, [wordList, saveWordsLocally]);

  return {
    saveWordsLocally,
    removeLocalWordList,
  };
};

export default useLocalStorage;
