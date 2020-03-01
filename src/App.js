import React from 'react';
import { Router } from '@reach/router';

import './App.scss';

import AuthProvider from './modules/auth/AuthProvider';

import SignUpPage from './modules/auth/SignUpPage';
import LoginPage from './modules/auth/LoginPage';
import HomePage from './modules/main/HomePage';
import ProfilePage from './modules/main/ProfilePage';

import PrivateRoute from './modules/security/PrivateRoute';
import NavBar from './modules/shared/NavBar';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="container pt-5">
        <div className="row justify-content-center">
          <Router>
            <LoginPage path="login" />
            <SignUpPage path="signup" />
            <PrivateRoute path="profile" redirect="login" component={ProfilePage} />
            <HomePage default />
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
