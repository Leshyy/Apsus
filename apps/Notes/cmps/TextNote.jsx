export function TextNote({ title, info }) {
  return (
    <div className="note-text">
      <h4>{title}</h4>
      <pre>{info}</pre>
    </div>
  );
}
