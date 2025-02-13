import React, { useState } from "react";
import useSearch from "../../hooks/useSearch";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { searchResults, loading, error, searchGoogleAPI } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchGoogleAPI(query);
    }
  };

  return (
    <div>
      <div className="mt-20"></div>
      <h2>Search Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title"
        />
        <button type="submit">Search</button>
      </form>

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
