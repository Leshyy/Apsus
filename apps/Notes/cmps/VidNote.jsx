export function VidNote({ title, info }) {
    return (
      <div className="note-vid">
        <iframe width="320" height="240" src={`${info.replace('watch?v=', 'embed/')}`} ></iframe>
        <h5>{title}</h5>
      </div>
    );
  }