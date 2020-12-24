import { eventBusService } from '../../../services/eventBusService.js';

export class NoteInput extends React.Component {
    state = {
        note: {
            id: null,
            title: '',
            info: {
                txt: '',
            },
        },
    };

    componentDidMount() {
        eventBusService.on('noteSelected', (note) => {
            this.setState({ note });
        });
        eventBusService.on('noteDeleted', () => {
            this.clearInput();
        });
    }

    onHandleChange = (ev) => {
        const currField = ev.target.name;
        const noteCopy = { ...this.state.note };
        if (currField === 'title') {
            noteCopy.title = ev.target.value;
        } else {
            noteCopy.info.txt = ev.target.value;
        }
        this.setState({ note: noteCopy });
    };

    clearInput = () => {
        const note = {
            id: null,
            title: '',
            info: {
                txt: '',
            },
        };
        this.setState({ note });
    };

    render() {
        return (
            <section>
                <div className="notes-inputs">
                    <form
                        className="notes-form"
                        onSubmit={(ev) => {
                            this.props.onSaveNote(
                                ev,
                                this.state.note,
                                this.clearInput
                            );
                        }}
                    >
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Title"
                            name="title"
                            value={this.state.note.title}
                            onChange={this.onHandleChange}
                        />
                        <textarea
                            placeholder="Make a note..."
                            name="txt"
                            value={this.state.note.info.txt}
                            onChange={this.onHandleChange}
                        ></textarea>
                        <button type="button" onClick={this.clearInput}>
                            Clear
                        </button>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </section>
        );
    }
}
