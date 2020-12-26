export function ImgNote({ title, info }) {
    return (
      <div className="note-img">
        <img src={info}/> 
        <h4>{title}</h4>
      </div>
    );
  }