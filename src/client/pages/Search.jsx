import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { searchResults, loading, error, searchGoogleAPI } = useSearch();

  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      searchGoogleAPI(query);
    }
  }, [query]);

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
      <p>Show More</p>
      <p>If your search is not in the system, feel free to add it!</p>
      <button onClick={() => navigate(`/addBook`)}>Add Book</button>
    </div>
  );
}
