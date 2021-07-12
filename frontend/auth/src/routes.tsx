import { Component } from 'react';
import { BrowserRouter, Route, RouterProps, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Manager from './pages/Manager';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <Component {...props} />
        }
    />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <PrivateRoute path="/manager" component={Manager} />
            </Switch>
        </BrowserRouter>
    );
}