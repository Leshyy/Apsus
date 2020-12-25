const { Link } = ReactRouterDOM;

export function EmailNav() {
    return (
        <div>
            <Link to={`/email/sent`}>
                <h2>sent</h2>
            </Link>
            <Link to={`/email`}>
                <h2>inbox</h2>
            </Link>
        </div>
    );
}
