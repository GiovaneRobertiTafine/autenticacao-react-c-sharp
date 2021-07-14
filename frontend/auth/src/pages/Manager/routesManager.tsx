import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import People from '../../components/people';
import Products from '../../components/product';
import { isAuthenticated } from '../../services/auth.service';

export default function RoutesManager() {
    let match = useRouteMatch();
    const [authenticated, setAuthenticated] = useState<boolean>(null);

    useEffect(() => {
        console.log("use");
        isAuthenticated()
            .then((res) => {
                setAuthenticated(res);
            });

    });

    const PrivateRoute = ({ component: Component, authenticated: authenticated, ...rest }) => {
        return (<Route
            {...rest}
            render={(props) => (
                (authenticated || authenticated === null) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            )}
        />);
    };

    return (
        <Switch>
            <PrivateRoute path={`${match.path}/products`} authenticated={authenticated} component={Products} />
            <PrivateRoute path={`${match.path}/peoples`} authenticated={authenticated} component={People} />
            <Redirect path={`${match.path}`} exact to={`${match.path}/products`} />
        </Switch>

    );
}