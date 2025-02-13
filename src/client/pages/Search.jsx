import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { searchResults, loading, error, searchGoogleAPI } = useSearch();
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (query) {
      searchGoogleAPI(query);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchGoogleAPI(inputValue);
    }
  };

  return (
    <div>
      <h2 className="mt-20"></h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            {book.volumeInfo.imageLinks?.thumbnail ? (
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <div>Thumbnail Not Available</div>
            )}
            <strong>{book.volumeInfo.title}</strong> by{" "}
            {book.volumeInfo.authors?.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
