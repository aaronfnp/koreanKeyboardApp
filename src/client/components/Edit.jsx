import React from "react";

export default function Edit({
  storedWords,
  storedListInfo,
  setStoredWords,
  setStoredListInfo,
}) {
  function handleChange(e) {
    setStoredListInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <label>English Title</label>
      <input
        name="title_en"
        value={storedListInfo.title_en}
        onChange={handleChange}
      />
      <label>Korean Title</label>
      <input
        name="title_kr"
        value={storedListInfo.title_en}
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
      <input name="type" value={storedListInfo.type} onChange={handleChange} />
      <label>Difficulty</label>
      <input
        name="difficulty"
        value={storedListInfo.difficulty}
        onChange={handleChange}
      />
      <label>Themes</label>
      <input
        name="themes"
        value={storedListInfo.themes}
        onChange={handleChange}
      />
      <label>Link</label>
      <input name="url" value={storedListInfo.url} onChange={handleChange} />
    </>
  );
}
