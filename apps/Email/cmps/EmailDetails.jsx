import { emailService } from '../services/emailService.js';

export class EmailDetails extends React.Component {
    state = {
        email: null,
    };

    componentDidMount() {
        this.loadEmail();
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.match.params.emailId !== prevProps.match.params.emailId
        ) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params;
        emailService.getEmailById(emailId).then((email) => {
            this.setState({ email });
        });
    };
    onHideEmail = () => {
        this.props.history.push('/email');
    };

    render() {
        const email = this.state.email;
        if (!email) return <div></div>;
        const receivers = email.receivers.join(', ');
        return (
            <section className="email-details">
                <h1>From: {email.sender}</h1>
                <h2>To:{receivers}</h2>
                <h3>Subject: {email.subject}</h3>
                <p>{email.body}</p>
                <button onClick={this.onHideEmail}>Hide Email</button>
            </section>
        );
    }
}
