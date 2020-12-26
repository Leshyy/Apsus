const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
    state = {
        showNav: false,
    };
    render() {
        return (
            <header className="app-header">
                <h1>Apsus~</h1>
                <div
                    className="hamburger"
                    onClick={() => {
                        let showNav = !this.state.showNav;
                        this.setState({ showNav });
                    }}
                >
                    <h2>&#9776;</h2>
                </div>
                <ul
                    className={`app-header-nav ${
                        this.state.showNav ? 'show' : ''
                    }`}
                >
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
}

//HOC - higher order component
export const AppHeader = withRouter(_AppHeader);
