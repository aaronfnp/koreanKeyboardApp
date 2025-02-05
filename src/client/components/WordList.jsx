const StoredWords = ({ words }) => {
  return (
    <div>
      <h2>Stored Words</h2>
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
