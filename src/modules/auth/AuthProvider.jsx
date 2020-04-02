import React from 'react';
import { navigate } from '@reach/router';

import { signup, login, logout, fetchUserInfo, getUserInfo, getAccessToken } from './authClient';
import Spinner from '../shared/Spinner';

const AuthContext = React.createContext({});

const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("Can't use this hook outside the AuthProvider.");
    }
    return context;
}

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(false);
    const [authError, setAuthError] = React.useState('');

    const isAuthorized = (role) => {
        return user.roles.includes(role);
    }

    const signupFn = async (username, email, password) => {
        setIsLoading(true);
        setAuthError('');

        const error = await signup(username, email, password);

        setIsLoading(false);

        if (error) {
            setAuthError('Error while registering new user');
        } else {
            loginFn(username, password)
        }
    }

    const loginFn = async (username, password) => {
        setIsLoading(true);
        setAuthError('');

        const error = await login(username, password);

        if (error) {
            setAuthError(error.error_description);
        }
        setIsLoading(false);
    }

    const onFetchUser = user => {
        onGetUser(user);
        navigate('/', { replace: true });
    }

    const onGetUser = user => {
        setUser(user);
        setIsLoading(false);
    }

    const onAuthError = error => {
        setAuthError(error);
        setIsLoading(false);
        navigate('/login', { replace: true });
    }

    const value = {
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        authError,
        isAuthorized,
        signup: signupFn,
        login: loginFn,
        logout,
    }

    React.useEffect(() => {
        if (window.location.hash.includes('access_token')) {
            fetchUserInfo(window.location.hash)
                .then(onFetchUser)
                .catch(onAuthError)

        } else if (getAccessToken()) {
            getUserInfo(getAccessToken())
                .then(onGetUser)
                .catch(onAuthError)
        } else {
            setIsLoading(false);
        }
    }, []);


    return (
        <AuthContext.Provider value={value}>
            {isLoading ? (
                <Spinner />
            ) : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export {
    useAuth,
}
