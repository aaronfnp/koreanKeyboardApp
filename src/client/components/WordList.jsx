import { useState } from "react";

const StoredWords = ({
  storedWords,
  storedListInfo,
  setStoredListInfo,
  setStoredWords,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(storedListInfo?.name || "Untitled List");
  const [activeId, setActiveId] = useState(null); // To track which word is being edited

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setStoredListInfo((prev) => ({ ...prev, name: newTitle }));
  }

  function handleTitleBlur() {
    setIsEditing(false);
    setStoredListInfo((prev) => ({ ...prev, name: title }));
  }

  function handleWordChange(e, index, field) {
    setStoredWords((prevWords) =>
      prevWords.map((word, i) =>
        i === index ? { ...word, [field]: e.target.value } : word
      )
    );
  }

  function handleWordClick(index) {
    setActiveId(index);
  }

  return (
    <div>
      {/* {isEditing ? (
        <EditableTitle
          title={title}
          handleTitleChange={handleTitleChange}
          handleTitleBlur={handleTitleBlur}
        />
      ) : (
        <NonEditableTitle title={title} setIsEditing={setIsEditing} />
      )} */}

      <span
        onClick={() => setIsEditing(!isEditing)}
        style={{ color: "#007BFF", cursor: "pointer" }}
      >
        Edit List
      </span>

      <div id="listContainer">
        {storedWords.length > 0 ? (
          storedWords.map((word, index) => (
            <div key={index}>
              {isEditing ? (
                <EditableWord
                  word={word}
                  index={index}
                  handleWordChange={handleWordChange}
                />
              ) : (
                <NonEditableWord
                  word={word}
                  index={index}
                  handleWordClick={handleWordClick}
                />
              )}
            </div>
          ))
        ) : (
          <p>No words available.</p>
        )}
      </div>
    </div>
  );
};

const EditableTitle = ({ title, handleTitleChange, handleTitleBlur }) => (
  <input
    type="text"
    value={title}
    onChange={handleTitleChange}
    onBlur={handleTitleBlur}
  />
);

const NonEditableTitle = ({ title, setIsEditing }) => <h2>{title}</h2>;

const EditableWord = ({ word, index, handleWordChange }) => (
  <div>
    <input
      type="text"
      value={word.korean}
      onChange={(e) => handleWordChange(e, index, "korean")}
    />
    <input
      type="text"
      value={word.english}
      onChange={(e) => handleWordChange(e, index, "english")}
    />
  </div>
);

const NonEditableWord = ({ word, index, handleWordClick }) => (
  <span onClick={() => handleWordClick(index)}>
    {word.korean} : {word.english}
  </span>
);

export default StoredWords;
