import React, { useCallback, useEffect } from "react";

const localVars = { list: "LOCAL_LIST", words: "LOCAL_WORDS" };

const useLocalStorage = (
  wordList,
  storedListInfo,
  setStoredWords,
  setStoredListInfo
) => {
  const saveWordsLocally = useCallback(() => {
    window.localStorage.setItem(localVars.list, JSON.stringify(storedListInfo));
    window.localStorage.setItem(localVars.words, JSON.stringify(wordList));
  }, [wordList, storedListInfo]);

  const removeLocalWordList = useCallback(() => {
    window.localStorage.removeItem(localVars.list);
    window.localStorage.removeItem(localVars.words);
  }, []);

  const loadLocally = useCallback(() => {
    const localList = window.localStorage.getItem(localVars.list);
    const localWords = window.localStorage.getItem(localVars.words);
    if (localList && localWords) {
      setStoredWords(JSON.parse(localWords));
      setStoredListInfo(JSON.parse(localList));
    }
  }, [setStoredWords, setStoredListInfo]);

  useEffect(() => {
    loadLocally();
  }, []);

  useEffect(() => {
    if (wordList.length > 1) {
      saveWordsLocally();
    }
  }, [wordList]);

  return {
    saveWordsLocally,
    removeLocalWordList,
  };
};

export default useLocalStorage;
