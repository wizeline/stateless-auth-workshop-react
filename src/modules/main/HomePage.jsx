import React from 'react';
import { Link } from '@reach/router';

import { useAuth } from '../auth/AuthProvider';

const HomePage = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div>
            <h2>Home</h2>
            {isAuthenticated ? (
                <div>
                    <h4 className="py-3">Welcome {user.name}</h4>
                    <Link className="btn btn-success" to="/profile">Go to Profile</Link>
                </div>
            ) : (
                <div className="alert alert-warning alert-dismissible fade show mt-5" role="alert">
                    Hi there! Please <Link className="text-info" to="/login"><strong>log in</strong></Link> to unblock access to your profile...
                </div>
            )}
        </div>
    )

};

export default HomePage;
