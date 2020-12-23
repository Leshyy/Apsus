export function EmailPreview({ email, onReadEmail }) {
    const isEmailRead = email.isRead ? '' : 'email-read';
    return (
        <section
            className={`email-preview ${isEmailRead}`}
            onClick={() => {
                onReadEmail(email.id);
            }}
        >
            <h2>{email.sender}</h2>
            <h3>{email.subject}</h3>
            <p>{email.body}</p>
        </section>
    );
}
