import React, { useState, useEffect } from "react";
import ListSidebar from "../components/ListSidebar";
import ListDetails from "../components/ListDetails";
import useLocalStorage from "../../hooks/useLocalStorage";
import CSVComponent from "../components/CSVComponent";
import BookForm from "../components/BookForm";
import StudyContainer from "../components/StudyContainer";
import useSearch from "../../hooks/useSearch";
import { useParams } from "react-router-dom";

const bookSchema = {
  bookId: "", // Google Books ID
  isFromGoogleAPI: false,
  identifier: "", // Uses isbn or whatever else available
  title_en: "", // English title from API
  title_kr: "", // Korean title (if applicable OR manual entry)
  author: "", // First author or "Multiple Authors"
  description: "", // Book summary
  publishedDate: "", // Date if available
  type: "BOOK", // Default type
  difficulty: "", // Manual entry or inferred later
  googleCategories: [], // Could extract from categories
  userThemes: [], // Users will input suggested themes
  image: "", // Thumbnail URL
  url: "", // Google Books link
  wordList: [], // Will be populated later
};

export default function BookDisplay() {
  const [mode, setMode] = useState("viewing"); // "viewing" | "editing" | "studying"
  const [storedWords, setStoredWords] = useState([]);
  const [storedListInfo, setStoredListInfo] = useState(bookSchema);
  const { saveWordsLocally, removeLocalWordList } = useLocalStorage(
    storedWords,
    storedListInfo,
    setStoredWords,
    setStoredListInfo
  );

  const { googleIdentifierSearch, searchResults, loading } = useSearch();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      await googleIdentifierSearch(id); // Using router's "id" param, maybe rename to identifier due to google id != identifier
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // Updates storedListInfo after searchResults is updated
  useEffect(() => {
    const updateStoredListInfo = async () => {
      if (searchResults.length > 0) {
        console.log(searchResults[0].volumeInfo);
        const extractedData = extractBookData(searchResults[0]);
        setStoredListInfo(extractedData);
      }
    };

    updateStoredListInfo();
  }, [searchResults]);

  const extractBookData = (book) => {
    return {
      bookId: book.id || "", // Google Books ID
      isFromGoogleAPI: true, // extracting sets to true, if not default is false
      title_en: book.volumeInfo?.title || "Unknown Title",
      title_kr: "", // Can be manually assigned later
      author: book.volumeInfo?.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author",
      description: book.volumeInfo?.description || "No description available.",
      publishedDate: book.volumeInfo?.publishedDate, // Date if available
      type: book.volumeInfo?.printType || "BOOK", //  Can be manually re-assigned later if manga
      difficulty: "", // Can be manually assigned later
      googleCategories: book.volumeInfo?.categories || [],
      userThemes: "",
      image: book.volumeInfo?.imageLinks?.thumbnail || "",
      url: book.volumeInfo?.infoLink || "", // Uses google api for info, but maybe buylink later?
      wordList: [], // Will be populated later
    };
  };

  if (loading) return <p>Loading...</p>;
  if (!storedListInfo || storedListInfo.bookId === "1")
    return <p>List not found</p>;

  return (
    <div className="list-page">
      <ListSidebar storedListInfo={storedListInfo} />

      {mode === "editing" ? (
        <BookForm
          mode="edit"
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
          setMode={setMode}
        />
      ) : mode === "suggesting" ? (
        <BookForm
          mode="suggestThemes"
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
          setMode={setMode}
        />
      ) : mode === "studying" ? (
        <StudyContainer
          storedWords={storedWords}
          setStoredWords={setStoredWords}
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
        />
      ) : (
        <ListDetails
          storedWords={storedWords}
          setStoredWords={setStoredWords}
          storedListInfo={storedListInfo}
          setStoredListInfo={setStoredListInfo}
        />
      )}

      <div>
        {/* <button onClick={saveWordsLocally}>Save Locally</button> */}
        <CSVComponent setStoredWords={setStoredWords} />
        {storedListInfo.isFromGoogleAPI ? (
          <button onClick={() => setMode("suggesting")}>Suggest Themes</button>
        ) : (
          <button onClick={() => setMode("editing")}>Edit</button>
        )}
        <button onClick={() => setMode("studying")}>Study</button>
        <button onClick={() => setMode("viewing")}>View</button>
      </div>
    </div>
  );
}
