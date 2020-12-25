import { EmailPreview } from './EmailPreview.jsx';

const { Link } = ReactRouterDOM;

export function EmailList({ emails, onReadEmail, onDelEmail, onMarkUnread }) {
    return (
        <section className="email-list">
            {/* <table>
                <thead>
                    <tr>
                        <td>From</td>
                        <td>subject</td>
                        <td>body</td>
                    </tr>
                </thead>
                <tbody> */}
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
            {/* </tbody>
            </table> */}
        </section>
    );
}
