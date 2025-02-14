import React, { useState } from "react";
import useBooks from "../../hooks/useBook";
import { useParams } from "react-router-dom";

const exampleSchema = {
  bookId: "",
  isFromGoogleAPI: false,
  identifier: "",
  title_en: "",
  title_kr: "",
  author: "",
  description: "",
  publishedDate: "",
  type: "BOOK",
  difficulty: "",
  googleCategories: [],
  userThemes: [],
  image: "",
  url: "",
  wordList: [],
};

export default function BookForm({
  mode,
  storedListInfo,
  setStoredListInfo,
  setMode,
}) {
  const [themeToAdd, setThemeToAdd] = useState("");

  const { addBook } = useBooks();
  const { id } = useParams();

  function handleChange(e) {
    setStoredListInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value || "", // Ensure empty string fallback
    }));
  }

  function handleAddTheme() {
    if (themeToAdd.trim() === "") return;
    setStoredListInfo((prev) => ({
      ...prev,
      userThemes: [...(prev.userThemes ?? []), themeToAdd], // Ensure array
    }));
    setThemeToAdd("");
  }

  function handleRemoveTheme(index) {
    setStoredListInfo((prev) => ({
      ...prev,
      userThemes: prev.userThemes?.filter((_, i) => i !== index) ?? [],
    }));
  }

  const handleNewBookSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...storedListInfo,
      bookId: String(storedListInfo.bookId),
    };

    console.log(`Adding ${newBook}`);
    addBook(newBook);
    console.log("Added!");
  };

  const handleGoogleBookSubmit = async (e) => {
    e.preventDefault();
    console.log("Prevented Default");

    const newBook = {
      bookId: String(storedListInfo.bookId),
      indentifier: id,
      isFromGoogleAPI: true,
      wordList: storedListInfo.wordList ?? [], // Keep existing list
      userThemes: storedListInfo.userThemes ?? [],
    };

    addBook(newBook);
    setMode("viewing");
  };

  return (
    <div className="mt-20 space-y-4">
      {mode === "create" && (
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Input New Book</h2>

          <label>English Title</label>
          <input
            name="title_en"
            value={storedListInfo.title_en ?? ""}
            onChange={handleChange}
          />

          <label>Korean Title</label>
          <input
            name="title_kr"
            value={storedListInfo.title_kr ?? ""}
            onChange={handleChange}
          />

          <label>Author</label>
          <input
            name="author"
            value={storedListInfo.author ?? ""}
            onChange={handleChange}
          />

          <label>Description</label>
          <input
            name="description"
            value={storedListInfo.description ?? ""}
            onChange={handleChange}
          />

          <label>Published Date</label>
          <input
            name="publishedDate"
            value={storedListInfo.publishedDate ?? ""}
            onChange={handleChange}
          />

          <label>Difficulty</label>
          <input
            name="difficulty"
            value={storedListInfo.difficulty ?? ""}
            onChange={handleChange}
          />

          <label>Suggested Themes</label>
          <input
            type="text"
            value={themeToAdd}
            onChange={(e) => setThemeToAdd(e.target.value)}
            placeholder="Add a theme"
          />
          <button onClick={handleAddTheme}>Add Theme</button>
          {storedListInfo.userThemes ? (
            storedListInfo.userThemes.map((t) => <div>{t}</div>)
          ) : (
            <div></div>
          )}

          <label>Type</label>
          <input
            name="type"
            value={storedListInfo.type ?? ""}
            onChange={handleChange}
          />

          <label>Image URL</label>
          <input
            name="image"
            value={storedListInfo.image ?? ""}
            onChange={handleChange}
          />

          <label>Other URL</label>
          <input
            name="url"
            value={storedListInfo.url ?? ""}
            onChange={handleChange}
          />

          <label>ISBN</label>
          <input
            name="identifier"
            value={storedListInfo.identifier ?? ""}
            onChange={handleChange}
          />

          <form onSubmit={handleNewBookSubmit}>
            <button type="submit">Add This Book</button>
          </form>
        </div>
      )}

      {mode === "edit" && (
        <>
          <h2 className="text-lg font-semibold">Update Input Book</h2>

          <label>English Title</label>
          <input
            name="title_en"
            value={storedListInfo.title_en ?? ""}
            onChange={handleChange}
          />

          <label>Description</label>
          <input
            name="description"
            value={storedListInfo.description ?? ""}
            onChange={handleChange}
          />

          <label>Difficulty</label>
          <input
            name="difficulty"
            value={storedListInfo.difficulty ?? ""}
            onChange={handleChange}
          />

          <form onSubmit={handleNewBookSubmit}>
            <button type="submit">Save Changes</button>
          </form>
        </>
      )}

      {mode === "suggestThemes" && (
        <>
          <h2 className="text-lg font-semibold">Suggest Themes</h2>

          <label>Suggested Themes</label>
          <input
            type="text"
            value={themeToAdd}
            onChange={(e) => setThemeToAdd(e.target.value)}
            placeholder="Add a theme"
          />
          <button onClick={handleAddTheme}>Add Theme</button>

          <ul className="space-y-1">
            {storedListInfo.userThemes?.length ? (
              storedListInfo.userThemes.map((theme, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>{theme}</span>
                  <button
                    onClick={() => handleRemoveTheme(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No themes added yet.</p>
            )}
          </ul>

          <label>Difficulty</label>
          <input
            name="difficulty"
            value={storedListInfo.difficulty ?? ""}
            onChange={handleChange}
          />

          <form onSubmit={handleGoogleBookSubmit}>
            <button type="submit">Save Changes</button>
          </form>
        </>
      )}
    </div>
  );
}
