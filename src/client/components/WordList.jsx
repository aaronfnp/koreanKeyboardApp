const StoredWords = ({ words, storedListInfo }) => {
  return (
    <div>
      <h2 onClick={() => ""}>{storedListInfo.name || "Untitled List"}</h2>
      <div id="listContainer">
        {words.map((word, index) => (
          <span key={index}>
            {word.korean} : {word.english}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StoredWords;
