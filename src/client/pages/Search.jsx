import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { useNavigate, Link } from "react-router-dom";

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

  function viewBook(book) {
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

    // Navigate using the found identifier
    navigate(`/book/${bookId}`);
  }

  return (
    <div>
      <h2 className="mt-20"></h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {searchResults.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              viewBook(book);
            }}
          >
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
      {!loading && (
        <>
          <p>Show More</p>
          <p>If your search is not in the system, feel free to add it!</p>
          <Link to="/addBook">
            <button>Add Book</button>
          </Link>
        </>
      )}
    </div>
  );
}
