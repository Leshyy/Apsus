
import { DynamicCmpPreview } from './DynamicCmpPreview.jsx';


export function NotePreview({ note, onRemove, onSelectNote, onPinNote }) {

    return <article>
        <div className="note-preview" onClick={() => { onSelectNote(note.id) }} style={{ backgroundColor: note.style.backgroundColor }}>
            <DynamicCmpPreview currCmp={note.type} title={note.title} info={note.info.content} />
            <button className='remove-btn' title="Delete" onClick={(ev) => { onRemove(ev, note.id) }}></button>
            <button className={(note.isPinned) ? 'pinned-btn' : 'pin-btn'} title="Pin/Unpin" onClick={(ev) => { onPinNote(ev, note.id) }}></button>
            <button className='color-pallete-btn' title="Color" onClick={(ev) => { onColorNote(ev, note.id) }}></button>
        </div>
    </article>
    
}