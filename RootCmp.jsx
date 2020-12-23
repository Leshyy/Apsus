import { AppHeader } from './cmps/AppHeader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { EmailApp } from './apps/Email/EmailApp.jsx';
import { NotesApp } from './apps/Notes/NotesApp.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <Switch>
                <Route path="/email" component={EmailApp} />
                <Route path="/notes" component={NotesApp} />
                <Route path="/about" component={AboutPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}
