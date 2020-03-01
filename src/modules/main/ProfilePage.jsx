import React from 'react';

import { useAuth } from '../auth/AuthProvider';
import SecuredContent from '../security/SecuredContent';

const ProfilePage = () => {
    const { user } = useAuth();

    const deleteHandler = () => {
        if (window.confirm('Are you sure?')) {
            console.warn('TODO: implement delete...')
        }
    }

    return (
        <div>
            <div className="card mb-3" style={{width: 600}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={user.picture} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user.nickname}</h5>
                            <p className="card-text">
                                <strong>Email: {user.email}</strong>
                            </p>
                            <p className="card-text"><small className="text-muted">Last updated at: {user.updated_at}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <SecuredContent role="ADMIN">
                <button className="btn btn-danger" onClick={deleteHandler}>Delete User</button>
            </SecuredContent>
        </div>
        
    )
}

export default ProfilePage;