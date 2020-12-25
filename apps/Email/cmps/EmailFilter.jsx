export class EmailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            status: '',
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
            <section className="pet-filter">
                <input
                    type="text"
                    name="txt"
                    value={this.state.filterBy.txt}
                    placeholder="Search:"
                    autoComplete="off"
                    onChange={this.handleChange}
                />
                <select
                    value={this.state.filterBy.status}
                    name="status"
                    onChange={this.handleChange}
                >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </section>
        );
    }
}
