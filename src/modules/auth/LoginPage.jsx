import React from 'react';

import { useAuth } from './AuthProvider';
import Spinner from '../shared/Spinner';

import LoginForm from './LoginForm';

const LoginPage = () => {
    const { isLoading, login, authError } = useAuth();
    return (
        <div className="auth-wrapper">
            {authError && (
                <div className="alert alert-danger">
                    {authError}
                </div>
            )}
            {isLoading ? (
                <Spinner />
            ) : (
                <LoginForm login={login} />
            )}
        </div>
    );
}

export default LoginPage;
