const { NavLink, withRouter } = ReactRouterDOM;

function _AppHeader() {
    return (
        <header className="app-header">
            <h1>Apsus~</h1>
            <ul className="app-header-nav">
                <li>
                    <NavLink activeClassName="my-active" exact to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/email">Emails</NavLink>
                </li>
                <li>
                    <NavLink to="/notes">Notes</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </header>
    );
}

//HOC - higher order component
export const AppHeader = withRouter(_AppHeader);
