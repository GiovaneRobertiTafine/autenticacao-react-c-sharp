import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Product from './pages/Product';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/product" component={Product} />
            </Switch>
        </BrowserRouter>
    );
}