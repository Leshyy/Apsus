import { notesService } from './services/notesService.js';
import { eventBusService } from '../../services/eventBusService.js';
import { NoteList } from './cmps/NoteList.jsx';
import { NoteInput } from './cmps/NoteInput.jsx';
import { NoteFilter } from './cmps/NoteFilter.jsx';

export class NotesApp extends React.Component {
    state = {
        notes: [],
        filterBy:{
            txt:''
        }
    };

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then((notes) => {
            this.setState({ notes });
        });
    };

    onRemove = (ev, noteId) => {
        ev.stopPropagation();
        notesService.removeNote(noteId).then(() => {
            this.loadNotes();
            eventBusService.emit('noteDeleted', '');
        });
    };

    onPinNote = (ev,noteId) => {
        ev.stopPropagation();
        notesService.pinNote(noteId).then(() => {
            this.loadNotes();
            eventBusService.emit('notePinned', '');
        });  
    }

    onSelectNote = (noteId) => {
        notesService.getNoteById(noteId).then((note) => {
            eventBusService.emit('noteSelected', note);
        });
    };

    onUnSelectNote = () => {
        let noteId = null;
        eventBusService.emit('noteUnSelected', noteId);
    };

    onSaveNote = (ev, note, cb) => {
        ev.preventDefault();
        if (note.id) {
            notesService.updateNote(note).then(() => {
                this.loadNotes();
            });
            console.log('yes id');
        } else {
            notesService.addNote(note).then(() => {
                this.loadNotes();
            });
        }
        cb();
    };

    onSetFilter = (filterBy)=>{
        this.setState({filterBy})
    }

    getNotesForDisplay=()=>{
        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.txt, 'i');
        return this.state.notes.filter(note=>{
            return( filterRegex.test(note.info.content)||
             filterRegex.test(note.title)||
             filterRegex.test(note.type)||
             filterRegex.test(note.label)||
             filterRegex.test(note.style.backgroundColor)
            )
        })          
    }

    render() {
        return (
            <section>     
                    <NoteFilter setFilter={this.onSetFilter}/>
                <section className="main-layout-notes">
                    <NoteInput onSaveNote={this.onSaveNote} />
                    {this.state.notes.length && (
                        <NoteList
                            notes={this.getNotesForDisplay()}
                            onRemove={this.onRemove}
                            onSelectNote={this.onSelectNote}
                            onPinNote={this.onPinNote}
                        />
                    )}
                </section>
            </section>
        );
    }
}