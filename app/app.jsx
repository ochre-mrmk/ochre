import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { reduxReactRouter, ReduxRouter, pushState } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createHistory } from 'history';
import searchApp from './redux/reducers';
import { addResults } from './redux/actions';
import Results from './views/results.jsx';

let store = compose(
    reduxReactRouter({ createHistory })
)(createStore)(searchApp);
const dispatch = store.dispatch;

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    }
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div style={{
                    paddingTop: '150px'
                }}>
                <div style={{
                        margin: '0 auto',
                        maxWidth: 'none',
                        width: '1139px',
                        textAlign: 'center'
                    }}>
                    <div>
                        <h1 style={{
                                fontSize: '4.5em',
                                textTransform: 'capitalize',
                                marginBottom: '30px'
                            }}>Ochre</h1>
                    </div>
                    <div>
                        <input type="text" id="q" name="q" style={{
                                padding: '10px',
                                fontSize: '1.2em',
                                width: '65%'
                            }} />
                    </div>
                </div>
            </div>
        );
    }
}

let Appx = connect(
    // Use a selector to subscribe to state
    state => ({
        q: state.router.location.query.q,
        results: state.results
    }),
    // Use an action creator for navigation
    { pushState }
)(App);

let routes = (
    <Route path="/" component={Appx}>
        <Route path="/:q" component={Results} />
    </Route>
);

class Root extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        {routes}
                    </ReduxRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));
