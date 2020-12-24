import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes, onRemove, onSelectNote}) {
    return (
        <section className="note-list">
            {notes.map((note) => {
                return <NotePreview key={note.id} note={note} onRemove={onRemove} onSelectNote={onSelectNote}/>;
            })}
        </section>
    );
}
