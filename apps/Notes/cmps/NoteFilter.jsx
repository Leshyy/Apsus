export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
        },
    };

    handleChange = (ev) => {
        ev.persist();
        const filterBy = { ...this.state.filterBy };
        filterBy[ev.target.name] = ev.target.value;

        this.setState({ filterBy }, () => {
            this.props.setFilter(this.state.filterBy);
        });
    };

    render() {
        return (
            <section className="note-filter">
                <input className="filter-bar"
                    type="text"
                    name="txt"
                    value={this.state.filterBy.txt}
                    placeholder="Search by text or color"
                    autoComplete="off"
                    onChange={this.handleChange}
                />
                
            </section>
        );
    }
}
