import React from 'react';
import { Redirect } from '@reach/router';

import { useAuth } from '../auth/AuthProvider';

const PrivateRoute = ({ component: Component, redirect, fallback, role, ...props}) => {
    const { isAuthenticated, isAuthorized } = useAuth();

    if (!isAuthenticated || !isAuthorized(role)) {
        if (redirect) {
            return <Redirect to={redirect} noThrow />
        }

        if (fallback) {
            return fallback;
        }

        return null;
    };

    return <Component {...props} />;
};

export default PrivateRoute;
