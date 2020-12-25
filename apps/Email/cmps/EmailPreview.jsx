export function EmailPreview({ email, onReadEmail, onDelEmail, onMarkUnread }) {
    const isEmailRead = email.isRead ? '' : 'email-read';
    return (
        <section
            className={`email-preview ${isEmailRead}`}
            onClick={() => {
                onReadEmail(email.id);
            }}
        >
            <div className="email-btns">
                <button
                    onClick={(ev) => {
                        onDelEmail(ev, email.id);
                    }}
                >
                    del
                </button>
                <button
                    onClick={(ev) => {
                        onMarkUnread(ev, email.id);
                    }}
                >
                    Mark Unread
                </button>
            </div>
            <div className="email-preview-text">
                <h2>{email.sender}</h2>
                <h3>{email.subject}</h3>
                <h4>{email.body}</h4>
            </div>
        </section>
    );
}
