
import { DynamicCmpPreview } from './DynamicCmpPreview.jsx';


export function NotePreview({ note, onRemove, onSelectNote, onPinNote }) {

    return <article>
        <div className="note-preview" onClick={() => { onSelectNote(note.id) }} style={{ backgroundColor: note.style.backgroundColor }}>
            <DynamicCmpPreview currCmp={note.type} title={note.title} info={note.info.content} />
            <button className='remove-btn' title="Delete" onClick={(ev) => { onRemove(ev, note.id) }}>x</button>
            <button className={(note.isPinned) ? 'pin-btn pinned' : 'pin-btn'} title="Pin/Unpin Note" onClick={(ev) => { onPinNote(ev, note.id) }}>!</button>
        </div>
    </article>
    
}