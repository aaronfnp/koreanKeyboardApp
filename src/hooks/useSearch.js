import { useState } from "react";
import axios from "axios";

export default function useSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGoogleAPI = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchQuery}&key=${apiKey}`
      );

      if (response.status === 200) {
        setSearchResults(response.data.items || []); // Handle cases where no results are returned
      }
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const googleIdentifierSearch = async (identifier) => {
    if (!identifier || identifier === "null") return; // Prevent null/empty API requests

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${identifier}`
      );
      if (response.status === 200) {
        setSearchResults(response.data.items || []);
      }
    } catch (err) {
      setError("Failed to find book.");
    }
  };

  const findIdentifier = async (book) => {
    const identifiers =
      book.industryIdentifiers || book.volumeInfo?.industryIdentifiers || [];

    // Tries to get ISBN_13 and ISBN_10
    const isbn13 = identifiers.find((id) => id.type === "ISBN_13")?.identifier;
    const isbn10 = identifiers.find((id) => id.type === "ISBN_10")?.identifier;

    // If the book has an identifier with type "OTHER", use that as a fallback
    const otherIdentifier = identifiers.find(
      (id) => id.type === "OTHER"
    )?.identifier;

    // If no ISBN found, fallback to "OTHER" or alert
    const bookId =
      isbn13 || isbn10 || otherIdentifier || book.title + book.publishedDate;

    return bookId;
  };

  return {
    searchResults,
    loading,
    error,
    searchGoogleAPI,
    googleIdentifierSearch,
    findIdentifier,
  };
}
