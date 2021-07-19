import { useRouteMatch, Link, NavLink } from "react-router-dom";
import { Perfil } from "../../enums/perfil.enum";
import { user } from "../../services/auth.service";
import RoutesManager from "./routesManager";

export default function Manager() {
    let match = useRouteMatch();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Auth</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <NavLink activeClassName="active-link-nav" to={`${match.url}/products`} >
                                    <button className="btn btn-outline-success me-2">
                                        Products
                                    </button>
                                </NavLink >
                            </li>
                            {
                                (user && (user.perfil === Perfil.Administrator)) ?
                                    <li className="nav-item">
                                        <NavLink activeClassName="active-link-nav" to={`${match.url}/peoples`} >
                                            <button className="btn btn-outline-success me-2">
                                                Peoples
                                            </button>
                                        </NavLink >

                                    </li>
                                    : null
                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li><Link to="/" className="dropdown-item">Sair</Link></li>

                                </ul>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
            <RoutesManager />
        </>

    );
};;