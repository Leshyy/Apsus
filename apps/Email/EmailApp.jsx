import { eventBusService } from '../../services/eventBusService.js';
import { EmailAdd } from './cmps/EmailAdd.jsx';
import { EmailDetails } from './cmps/EmailDetails.jsx';
import { EmailList } from './cmps/EmailList.jsx';
import { UnReadEmails } from './cmps/UnReadEmails.jsx';
import { emailService } from './services/emailService.js';

const { Route, Switch } = ReactRouterDOM;

export class EmailApp extends React.Component {
    state = {
        emails: [],
        composeEmail: false,
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
            eventBusService.emit('readEmail', '');
            this.loadEmails();
        });
    };
    onMarkUnread = (ev, emailId) => {
        ev.stopPropagation();
        ev.preventDefault();
        emailService.markAsUnRead(emailId).then(() => {
            this.loadEmails();
        });
    };
    onDelEmail = (ev, emailId) => {
        ev.stopPropagation();
        ev.preventDefault();
        emailService.remove(emailId).then(() => {
            this.loadEmails();
        });
    };

    showComposeEmail = () => {
        this.setState({ composeEmail: !this.state.composeEmail });
    };
    onAddEmail = (ev, email) => {
        ev.preventDefault();
        if (!email.receivers.length || !email.subject || !email.body) {
            console.log('emial', email);
            console.log('no empty fields allowed!');
            return;
        }
        console.log('added email');
        emailService.add(email).then(() => {
            this.loadEmails();
        });
    };

    render() {
        const { emails } = this.state;
        return (
            <section>
                <h2>Email App</h2>
                <button onClick={this.showComposeEmail}>Compose</button>
                {this.state.composeEmail && (
                    <EmailAdd onAddEmail={this.onAddEmail} />
                )}
                {/* TODO - unread emails fix it */}
                <Switch>
                    <Route path="/email/:emailId" component={EmailDetails} />
                    <Route
                        path="/email"
                        render={() => (
                            <EmailList
                                emails={emails}
                                onReadEmail={this.onReadEmail}
                                onDelEmail={this.onDelEmail}
                                onMarkUnread={this.onMarkUnread}
                            />
                        )}
                    />
                </Switch>
            </section>
        );
    }
}
