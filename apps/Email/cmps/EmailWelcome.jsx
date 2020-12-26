const { Link } = ReactRouterDOM;
export function EmailWelcome() {
    return (
        <section className="email-welcome">
            <h2>Welcome To Your Email!</h2>
            <h3>
                Browse{' '}
                <Link to="/email/inbox">
                    <span>Emails</span>
                </Link>
            </h3>
        </section>
    );
}
