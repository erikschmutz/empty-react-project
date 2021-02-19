import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SignIn from './pages/SignIn';
import Data from './pages/Data';
import F0F from './pages/404';

export const browserHistory = createBrowserHistory();

export default function App() {
    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/login">
                    <SignIn />
                </Route>
                <Route path="/data">
                    <Data />
                </Route>
                <Route path="">
                    <F0F />
                </Route>
            </Switch>
        </Router>
    );
}
