import { Component } from 'react';
import { BrowserRouter, Redirect, Route, RouterProps, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Manager from './pages/Manager';
import { isAuthenticated } from './services/auth.service';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             isAuthenticated() ?
//                 <Component {...props} /> :
//                 <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//         }
//     />
// );

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/manager" component={Manager} />
                <Route path="/" exact component={Logon} />
            </Switch>
        </BrowserRouter>
    );
}