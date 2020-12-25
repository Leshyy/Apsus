export function TextNote({ title, info }) {
  return (
    <div>
      <h4>{title}</h4>
      <pre>{info}</pre>
    </div>
  );
}
