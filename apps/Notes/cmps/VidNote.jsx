export function VidNote({ title, info }) {
    return (
      <div className="note-vid">
        <iframe width="220" height="140" src={info}></iframe>
        <h5>{title}</h5>
      </div>
    );
  }