import { notesService } from './services/notesService.js';
import { NoteList } from './cmps/NoteList.jsx';

export class NotesApp extends React.Component {
    state = {
        notes: [],
    };

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then((notes) => {
            this.setState({ notes });
        });
    };

    render() {
        return (
            <section>
                <h2>Notes App</h2>
                <section>
                    {this.state.notes.length && (
                        <NoteList notes={this.state.notes} />
                    )}
                </section>
            </section>
        );
    }
}
