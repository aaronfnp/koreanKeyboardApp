const StoredWords = ({ words }) => {
  return (
    <div>
      <h2>Stored Words</h2>
      {words.map((word, index) => (
        <span key={index}>
          {word.korean} : {word.english}
        </span>
      ))}
    </div>
  );
};

export default StoredWords;
