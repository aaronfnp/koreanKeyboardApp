import { useState } from "react";

const StoredWords = ({ words, storedListInfo, setStoredListInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(storedListInfo?.name || "Untitled List");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTitleBlur() {
    // THIS IS FOR WHEN CLICKED OFF
    setIsEditing(false);
    setStoredListInfo((prev) => {
      return {
        ...prev,
        name: title,
      };
    });
  }

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)} className="clickable">
          {title}
        </h2>
      )}

      <div id="listContainer">
        {words.length > 0 ? (
          words.map((word, index) => (
            <span key={index}>
              {word.korean} : {word.english}
            </span>
          ))
        ) : (
          <p>No words available.</p>
        )}
      </div>
    </div>
  );
};

export default StoredWords;
