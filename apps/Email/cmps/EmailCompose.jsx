export class EmailCompose extends React.Component {
    state = {
        email: {
            receivers: [],
            subject: '',
            body: '',
        },
    };

    handleChange = (ev) => {
        const currField = ev.target.name;
        const emailCopy = { ...this.state.email };
        if (currField === 'receivers') {
            emailCopy[currField] = [ev.target.value];
        } else emailCopy[currField] = ev.target.value;
        this.setState({ email: emailCopy });
    };

    render() {
        const { email } = this.state;
        return (
            <section className="email-add">
                <form action="">
                    <input
                        name="receivers"
                        type="text"
                        placeholder="to:"
                        autoComplete="off"
                        value={email.receivers}
                        onChange={this.handleChange}
                    />
                    <input
                        name="subject"
                        type="text"
                        placeholder="subject:"
                        autoComplete="off"
                        value={email.subject}
                        onChange={this.handleChange}
                    />
                    <textarea
                        name="body"
                        value={email.body}
                        onChange={this.handleChange}
                    ></textarea>
                    <button
                        onClick={(ev) => {
                            this.props.onAddEmail(ev, email);
                            this.setState({
                                email: {
                                    receivers: [],
                                    subject: '',
                                    body: '',
                                },
                            });
                        }}
                    >
                        Send
                    </button>
                </form>
            </section>
        );
    }
}
