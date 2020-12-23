
export function NotePreview({ note,onRemove }) {



    return <article className="note-preview">
        <p>{note.info.txt}</p>
        <button className='remove-btn' onClick={() => {onRemove(note.id)}}>x</button>   
    </article>
}
