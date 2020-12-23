import { notesService } from "./services/notesService.js";
import { NoteList } from "./cmps/NoteList.jsx";

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

  onRemove=(noteId)=>{
    notesService.removeNote(noteId).then(()=>{
    this.loadNotes()})
  }

  render() {
    return (
      <section>
        <h2>Notes App</h2>
        <section>
          {this.state.notes.length && <NoteList notes={this.state.notes} onRemove={this.onRemove}/>}
        </section>
      </section>
    );
  }
}
