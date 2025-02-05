const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default TextInput;
