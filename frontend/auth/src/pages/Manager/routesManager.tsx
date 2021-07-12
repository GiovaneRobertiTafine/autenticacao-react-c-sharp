import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Products from '../../components/product';

export default function RoutesManager() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.path}`}>
                <Redirect to={`${match.path}/products`} />
            </Route>
            <Route path={`${match.path}/products`}>
                <Products />
            </Route>
        </Switch>
    );
}