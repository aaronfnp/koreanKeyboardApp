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
      <label>Name</label>
      <input name="name" value={storedListInfo.name} onChange={handleChange} />
      <label>User</label>
      <input name="user" value={storedListInfo.user} onChange={handleChange} />
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
    </>
  );
}
