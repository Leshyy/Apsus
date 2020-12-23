import { EmailList } from './cmps/EmailList.jsx';
import { emailService } from './services/emailService.js';

const { Route, Switch } = ReactRouterDOM;

export class EmailApp extends React.Component {
    state = {
        emails: [],
    };
    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then((emails) => {
            this.setState({ emails });
        });
    };

    onReadEmail = (emailId) => {
        emailService.markAsRead(emailId).then(() => {
            this.loadEmails();
        });
    };

    render() {
        const { emails } = this.state;
        return (
            <section>
                <h2>Email App</h2>
                <EmailList emails={emails} onReadEmail={this.onReadEmail} />
            </section>
        );
    }
}
