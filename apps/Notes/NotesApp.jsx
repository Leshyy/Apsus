import { notesService } from "./services/notesService.js";
import { eventBusService } from "../../services/eventBusService.js";
import { NoteList } from "./cmps/NoteList.jsx";
import { NoteInput } from "./cmps/NoteInput.jsx";

export class NotesApp extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    notesService.query().then((notes) => {
      console.log(notes);
      this.setState({ notes });
    });
  };

  onRemove = (ev,noteId) => {
      ev.stopPropagation()
    notesService.removeNote(noteId).then(() => {
      this.loadNotes();
      eventBusService.emit("noteDeleted", '');
    });
  };

  onSelectNote = (noteId) => {
    notesService.getNoteById(noteId).then((note) => {
      eventBusService.emit("noteSelected", note);
    });
  };

  onUnSelectNote = () => {
    let noteId = null
    eventBusService.emit("noteUnSelected", noteId);
  }

  onSaveNote = (ev, note,cb) => {
    ev.preventDefault();
    if (note.id) {
        notesService.updateNote(note).then(() => {
          this.loadNotes();
        });
      console.log("yes id");
    } else {
      notesService.addNote(note).then(() => {
        this.loadNotes();
      });
    }
    cb()
  };

  render() {
    return (
      <section>
        <NoteInput onSaveNote={this.onSaveNote} />
        <section>
          {this.state.notes.length && (
            <NoteList
              notes={this.state.notes}
              onRemove={this.onRemove}
              onSelectNote={this.onSelectNote}
            />
          )}
        </section>
      </section>
    );
  }
}


// onHandleChange = (ev) => {
//    const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;

//    const reviewCopy = { ...this.state.review };
//    reviewCopy[ev.target.name] = value;

//    this.setState({
//        review: reviewCopy
//    });
// }

