import { eventBusService } from '../../../services/eventBusService.js';

export class NoteInput extends React.Component {
    state = {
        note: {
            type: 'textNote',
            id: null,
            title: '',
            label: '',
            isPinned: false,
            info: {
                content: '',
            },
            createdAt: Date.now(),
            style: {
                backgroundColor: 'darkseagreen',
            }
        },
        inputColor: null
    };

    componentDidMount() {
        eventBusService.on('noteSelected', (note) => {
            this.setState({ note: note, inputColor: null });
        });
        eventBusService.on('noteDeleted', () => {
            this.clearInput();
        });
    }


    onHandleChange = (ev) => {
        const currField = ev.target.name;
        const noteCopy = { ...this.state.note };
        if (this.state.note.id && currField === 'type') {
            console.log('cannot change type of existing note');
            return
        } else if (currField === 'content') {
            noteCopy.info.content = ev.target.value;
        } else if (this.state.note.id && currField === 'style') {
            noteCopy.style.backgroundColor = ev.target.value;
            this.setState({ note: noteCopy });
            console.log(this.state.note.style.backgroundColor);
            this.props.onSaveNote(
                ev,
                this.state.note,
                this.doNothingCb)
        } else if (!this.state.note.id && currField === 'style') {
            noteCopy.style.backgroundColor = ev.target.value;
            this.setState({ inputColor: ev.target.value })
        } else {
            noteCopy[currField] = ev.target.value;
        }
        this.setState({ note: noteCopy });
    };

    doNothingCb() {
        return
    }

    clearInput = () => {
        const note = {
            type: 'textNote',
            id: null,
            title: '',
            label: '',
            isPinned: false,
            info: {
                content: '',
            },
            createdAt: Date.now(),
            style: {
                backgroundColor: 'darkseagreen',
            }
        }
        this.setState({ note: note, inputColor: null });

    };

    onHandlePinning = () => {
        const noteCopy = { ...this.state.note }
        if (noteCopy.isPinned === false) {
            noteCopy.isPinned = true
            this.setState({ note: noteCopy })
            console.log('pinned truthed');
        } else {
            noteCopy.isPinned = false
            this.setState({ note: noteCopy })
            console.log('pinned falsed');
        }
    }


    render() {
        let dynamicInputColor = this.state.inputColor
        let noteType = this.state.note.type
        let dynamicPlaceholder
        if (noteType === 'textNote') dynamicPlaceholder = 'Write a note...'
        else if (noteType === 'imgNote') dynamicPlaceholder = 'Enter image url'
        else if (noteType === 'videoNote') dynamicPlaceholder = 'Enter Youtube video url'
        else if (noteType === 'todoNote') dynamicPlaceholder = 'Enter todo list items, seperated by a comma ( , )'
        else {
            dynamicPlaceholder = 'Make something you want to keep...'
        }
        return (
            <section>
                <div className="note-input-main">
                    <form
                        className="notes-form"
                        onSubmit={(ev) => {
                            this.props.onSaveNote(
                                ev,
                                this.state.note,
                                this.clearInput
                            );
                        }}>
                        <input
                            style={{ backgroundColor: dynamicInputColor }}
                            type="text"
                            autoComplete="off"
                            placeholder="Title"
                            name="title"
                            value={this.state.note.title}
                            onChange={this.onHandleChange}
                        />
                        <textarea
                            style={{ backgroundColor: dynamicInputColor }}
                            placeholder={dynamicPlaceholder}
                            name="content"
                            value={this.state.note.info.content}
                            onChange={this.onHandleChange}
                        ></textarea>
                        <div className="input-btn">
                            <div className="type-menu" >
                                <button type="button" name="type" value="textNote" className={(noteType === 'textNote') ? 'btn-on' : 'btn-off'} onClick={this.onHandleChange}>Text</button>
                                <button type="button" name="type" value="imgNote" className={(noteType === 'imgNote') ? 'btn-on' : 'btn-off'} onClick={this.onHandleChange}>Img</button>
                                <button type="button" name="type" value="videoNote" className={(noteType === 'videoNote') ? 'btn-on' : 'btn-off'} onClick={this.onHandleChange}>Vid</button>
                                <button type="button" name="type" value="todoNote" className={(noteType === 'todoNote') ? 'btn-on' : 'btn-off'} onClick={this.onHandleChange}>Todo</button>
                            </div>
                            <div className="color-menu" >
                                <button type="button" name="style" value="darkseagreen" title="green" style={{ backgroundColor: "darkseagreen" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="antiquewhite" title="off-white" style={{ backgroundColor: "antiquewhite" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="lightblue" title="blue" style={{ backgroundColor: "lightblue" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="lightgoldenrodyellow" title="light yellow" style={{ backgroundColor: "lightgoldenrodyellow" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="darkorange" title="orange" style={{ backgroundColor: "darkorange" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="indianred" title="light red" style={{ backgroundColor: "indianred" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="lightgrey" title="grey" style={{ backgroundColor: "lightgrey" }} onClick={this.onHandleChange}></button>
                                <button type="button" name="style" value="rosybrown" title="brownish" style={{ backgroundColor: "rosybrown" }} onClick={this.onHandleChange}></button>
                            </div>
                            <div className="control-menu">
                                <button type="button" className={(this.state.note.isPinned) ? "pinning-btn pinned" : "pinning-btn"} name="isPinned" onClick={this.onHandlePinning}> Pin/Unpin</button>
                                <button type="button" className="clear-btn" onClick={this.clearInput}> Clear/Unselect</button>
                                <button type="submit" className="submit-btn">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* {<iframe style={{display:'block', margin: 'auto'}} src="https://www.dimensyo.com/DARYA_Lamp_Terrazzo_30cm.glb" id="Lamp_Terrazzo_30cm.glb" width="360" height="440" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0"></iframe>} */}
                <div>
                    {/* <iframe style={{display:"block", margin: 'auto'}} allowtransparency="true" src="https://library.dimensyo.com/Demo_Ring_DHR08.glb" id="Ring_DHR08.glb" width="360" height="440" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0"></iframe> */}
                </div>
            </section>
        );
    }
}