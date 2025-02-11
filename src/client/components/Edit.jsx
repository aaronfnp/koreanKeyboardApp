import React, { useState } from "react";

export default function Edit({ storedListInfo, setStoredListInfo }) {
  function handleChange(e) {
    setStoredListInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const [themeToAdd, setThemeToAdd] = useState("");

  function handleAddTheme() {
    if (themeToAdd.trim() === "") return;
    setStoredListInfo((prev) => ({
      ...prev,
      themes: [...prev.themes, themeToAdd],
    }));
    setThemeToAdd("");
  }

  function handleRemoveTheme(index) {
    setStoredListInfo((prev) => ({
      ...prev,
      themes: prev.themes.filter((_, i) => i !== index),
    }));
  }

  return (
    <>
      <div className="mt-20">
        <label>English Title</label>
        <input
          name="title_en"
          value={storedListInfo.title_en}
          onChange={handleChange}
        />

        <label>Korean Title</label>
        <input
          name="title_kr"
          value={storedListInfo.title_kr}
          onChange={handleChange}
        />

        <label>Author</label>
        <input
          name="author"
          value={storedListInfo.author}
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          name="description"
          value={storedListInfo.description}
          onChange={handleChange}
        />

        <label>Type</label>
        <input
          name="type"
          value={storedListInfo.type}
          onChange={handleChange}
        />

        <label>Difficulty</label>
        <input
          name="difficulty"
          value={storedListInfo.difficulty}
          onChange={handleChange}
        />

        <label>Themes</label>

        <input
          type="text"
          value={themeToAdd}
          onChange={(e) => setThemeToAdd(e.target.value)}
          placeholder="Add a theme"
        />
        <button onClick={handleAddTheme}>Add Theme</button>

        <label>Link</label>
        <input name="url" value={storedListInfo.url} onChange={handleChange} />
      </div>
    </>
  );
}
