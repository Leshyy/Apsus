import { AppHeader } from './cmps/AppHeader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { EmailPage } from './pages/EmailPage.jsx';
import { NotesPage } from './pages/NotesPage.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <Switch>
                <Route path="/email" component={EmailPage} />
                <Route path="/notes" component={NotesPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}
