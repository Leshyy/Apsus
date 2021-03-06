import { eventBusService } from '../../services/eventBusService.js';
import { EmailCompose } from './cmps/EmailCompose.jsx';
import { EmailDetails } from './cmps/EmailDetails.jsx';
import { EmailFilter } from './cmps/EmailFilter.jsx';
import { EmailList } from './cmps/EmailList.jsx';
import { EmailNav } from './cmps/EmailNav.jsx';
import { EmailRead } from './cmps/EmailRead.jsx';
import { EmailWelcome } from './cmps/EmailWelcome.jsx';
import { emailService } from './services/emailService.js';

const { Route, Switch } = ReactRouterDOM;

export class EmailApp extends React.Component {
    state = {
        emails: [],
        showComposeEmail: false,
        filterBy: {
            txt: '',
            status: '',
        },
        readEmails: 0,
    };
    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then((emails) => {
            this.setState({ emails }, this.getReadEmails);
        });
    };

    onReadEmail = (emailId) => {
        emailService.markAsRead(emailId).then(() => {
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
        this.setState({ showComposeEmail: !this.state.showComposeEmail });
    };
    onAddEmail = (ev, email) => {
        ev.preventDefault();
        if (!email.receivers.length || !email.subject || !email.body) {
            return;
        }
        emailService.add(email).then(() => {
            this.loadEmails();
        });
    };

    getReadEmails = () => {
        const readEmails = this.state.emails.filter((email) => {
            return email.isRead;
        });
        this.setState({ readEmails: readEmails.length });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    };

    getEmailsForDisplay = (emailsToShow) => {
        const showInbox = emailsToShow === 'inbox' ? true : false;
        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.txt, 'i');
        return this.state.emails.filter((email) => {
            if (filterBy.status === 'all' || filterBy.status === '') {
                return (
                    (filterRegex.test(email.subject) ||
                        filterRegex.test(email.sender) ||
                        filterRegex.test(email.receivers) ||
                        filterRegex.test(email.body)) &&
                    email.inbox === showInbox
                );
            } else {
                const filterRead = filterBy.status === 'read' ? true : false;
                return (
                    (filterRegex.test(email.subject) ||
                        filterRegex.test(email.sender) ||
                        filterRegex.test(email.receivers) ||
                        filterRegex.test(email.body)) &&
                    email.isRead === filterRead &&
                    email.inbox === showInbox
                );
            }
        });
    };

    render() {
        const { emails } = this.state;
        return (
            <section className="email-app main-layout">
                <div className="email-filter-compose">
                    <EmailFilter setFilter={this.onSetFilter} />
                    <button onClick={this.showComposeEmail}>Compose</button>
                </div>
                <EmailRead
                    emailsRead={this.state.readEmails}
                    emails={emails.length}
                />
                {this.state.showComposeEmail && (
                    <EmailCompose onAddEmail={this.onAddEmail} />
                )}
                <section className="main-content">
                    <EmailNav />
                    <Switch>
                        <Route
                            // sent
                            path="/email/sent"
                            render={() => (
                                <EmailList
                                    emails={this.getEmailsForDisplay('sent')}
                                    onReadEmail={this.onReadEmail}
                                    onDelEmail={this.onDelEmail}
                                    onMarkUnread={this.onMarkUnread}
                                />
                            )}
                        />
                        <Route
                            // inbox
                            path="/email/inbox"
                            render={() => (
                                <EmailList
                                    emails={this.getEmailsForDisplay('inbox')}
                                    onReadEmail={this.onReadEmail}
                                    onDelEmail={this.onDelEmail}
                                    onMarkUnread={this.onMarkUnread}
                                />
                            )}
                        />
                        <Route
                            path="/email/:emailId"
                            component={EmailDetails}
                        />
                        <Route path="/email" component={EmailWelcome} />
                    </Switch>
                </section>
            </section>
        );
    }
}
