export default function Notes({
  saveMsg,
  textareaValue,
  handleTextAreaChange,
}) {
  return (
    <div className="notes-text">
      <h3>{saveMsg}</h3>
      <textarea
        value={textareaValue}
        onChange={handleTextAreaChange}
        rows={10}
        cols={30}
        className="notes-textarea"
      ></textarea>
    </div>
  );
}
