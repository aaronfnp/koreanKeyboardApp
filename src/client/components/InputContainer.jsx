import TextInput from "./TextInput";

function InputContainer({
  inputText,
  setInputText,
  inputEng,
  setEngText,
  outputText,
}) {
  return (
    <div className="input-container">
      <TextInput
        label="Input Korean"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="This will output below in Korean"
      />
      
      <TextInput
        label="Input English Meaning"
        value={inputEng}
        onChange={(e) => setEngText(e.target.value)}
        placeholder="Type in an English translation"
      />
      
      <div className="output-container">
        <label>Output</label>
        <textarea
          value={`${outputText} ${inputEng ? `means ${inputEng}` : ""}`}
          placeholder="Translation here"
          readOnly
        />
      </div>
    </div>
  );
}

export default InputContainer;
