import { useRouteMatch, Link, NavLink } from "react-router-dom";
import RoutesManager from "./routesManager";

export default function Manager() {
    let match = useRouteMatch();

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Auth</a>
                    <div className="d-flex">
                        <NavLink activeClassName="active-link-nav" to={`${match.url}/products`} >
                            <button className="btn btn-outline-success me-2">
                                Products
                            </button>
                        </NavLink >
                        <NavLink activeClassName="active-link-nav" to={`${match.url}/peoples`} >
                            <button className="btn btn-outline-success me-2">
                                Peoples
                            </button>
                        </NavLink >
                    </div>
                </div>
            </nav>
            <RoutesManager />
        </>

    );
};