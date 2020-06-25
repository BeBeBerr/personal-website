import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/Main';
import ProjectPage from './components/projects';
import VisitorMap from './components/map';
import ContributionGraph from './components/statistics'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={MainPage} />
                    <Route exact path={'/projects'} component={ProjectPage} />
                    <Route exact path={'/visitor'} component={VisitorMap} />
                    <Route exact path={'/statistics'} component={ContributionGraph} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<MainRouter />, document.getElementById('app'));
registerServiceWorker();
