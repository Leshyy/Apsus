export function ImgNote({ title, info }) {
    return (
      <div className="note-img">
        <img src={`${info}`}/> 
        <h5>{title}</h5>
      </div>
    );
  }