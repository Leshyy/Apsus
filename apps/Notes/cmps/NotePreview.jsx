
export function NotePreview({ note,onRemove, onSelectNote}) {

    return <article className="note-area">
        <div className="note-preview" onClick={() => {onSelectNote(note.id)}}>
        <h4>{note.title}</h4>
        <pre>{note.info.txt}</pre>
        <button className='remove-btn' title="Delete" onClick={(ev) => {onRemove(ev,note.id)}}>x</button>   
        </div>
    </article>
}
