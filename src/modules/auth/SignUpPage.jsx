import React from 'react';

import { useAuth } from './AuthProvider';
import Spinner from '../shared/Spinner';

import SignUpForm from './SignUpForm';

const SignUpPage = () => {
    const { isLoading, signup, authError } = useAuth();
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
                <SignUpForm signup={signup} />
            )}
        </div>
    );
}

export default SignUpPage;
