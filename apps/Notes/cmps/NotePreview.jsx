
import { DynamicCmpPreview } from './DynamicCmpPreview.jsx';


export function NotePreview({ note,onRemove, onSelectNote}) {

    return <article className="note-area">
        <div className="note-preview" onClick={() => {onSelectNote(note.id)}} style={{backgroundColor:note.style.backgroundColor}}>
        <DynamicCmpPreview currCmp={note.type} title={note.title} info={note.info.content}/>
        <button className='remove-btn' title="Delete" onClick={(ev) => {onRemove(ev,note.id)}}>x</button>   
        </div>
    </article>
}