import React from 'react';
import { Link } from '@reach/router';

import { useAuth } from '../auth/AuthProvider';

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <Link className="navbar-brand" to="/">Auth SPA</Link>
            {isAuthenticated ? (
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Log Out</button>
            ) : (
                <div>
                    <Link className="btn btn-outline-primary my-2 my-sm-0 mr-3" to="/login">Log In</Link>
                    <Link className="btn btn-outline-success my-2 my-sm-0 mr-3" to="/signup">Sign Up</Link>
                </div>
            )}
            
        </nav>
    )
}

export default NavBar;