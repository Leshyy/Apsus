export function VidNote({ title, info }) {
    return (
      <div className="note-vid">
        <iframe src={info} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h4>{title}</h4>
      </div>
    );
  }