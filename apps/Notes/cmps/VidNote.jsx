export function VidNote({ title, info }) {
    return (
      <div className="note-vid">
        <iframe src={info} width="260" height="180"  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h4>{title}</h4>
      </div>
    );
  }