import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/Main';
import ProjectPage from './components/projects'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={MainPage} />
                    <Route exact path={'/projects'} component={ProjectPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<MainRouter />, document.getElementById('app'));
registerServiceWorker();
