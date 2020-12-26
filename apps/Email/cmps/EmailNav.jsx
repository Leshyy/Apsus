const { Link } = ReactRouterDOM;

export function EmailNav() {
    return (
        <section className="email-nav">
            <ul>
                <li>
                    <Link to="/email/inbox">inbox</Link>
                </li>
                <li>
                    <Link to="/email/sent">sent</Link>
                </li>
            </ul>
        </section>
    );
}
