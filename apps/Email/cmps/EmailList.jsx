import { EmailPreview } from './EmailPreview.jsx';

const { Link } = ReactRouterDOM;

export function EmailList({ emails, onReadEmail, onDelEmail, onMarkUnread }) {
    return (
        <section>
            {emails.map((email) => {
                return (
                    <Link to={`/email/${email.id}`} key={email.id}>
                        <EmailPreview
                            email={email}
                            onReadEmail={onReadEmail}
                            onDelEmail={onDelEmail}
                            onMarkUnread={onMarkUnread}
                        />
                    </Link>
                );
            })}
        </section>
    );
}
