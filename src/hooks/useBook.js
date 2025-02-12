import { useState, useEffect } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books when the component mounts, may change to non effect later
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (newBook) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        newBook
      );
      if (response.status === 201) {
        // Update state with the new book
        setBooks((prevBooks) => [...prevBooks, response.data]);
      }
    } catch (err) {
      setError("Failed to add book.");
    }
  };

  return { books, loading, error, addBook };
};

export default useBooks;
