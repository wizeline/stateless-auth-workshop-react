import auth0 from 'auth0-js';

import { AUTH_CONFIG, AUTH_REALM } from '../../constants';

const AUTH_REDIRECT_URI = `${window.location.protocol}//${window.location.host}`;
const AUTH_TOKEN_KEY = 'auth-token';

var authClient = new auth0.WebAuth({
    ...AUTH_CONFIG,
    redirectUri: AUTH_REDIRECT_URI,
});

const signup = (username, email, password) => {
    return new Promise(resolve => {
        authClient.signup({
            connection: AUTH_REALM,
            username,
            email,
            password,
        }, resolve);
    });
}

const login = (username, password) => {
    return new Promise(resolve => {
        authClient.login({
            realm: AUTH_REALM,
            username,
            password,
        }, resolve)
    });
}

const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);

    return authClient.logout({
        returnTo: AUTH_REDIRECT_URI,
        clientID: AUTH_CONFIG.clientID,
    });
}

const fetchUserInfo = (locationHash) => {
    return new Promise((resolve, reject) => {
        authClient.parseHash({ hash: locationHash.slice(1) }, async (error, authResult) => {
            if (error) {
                return reject(error);
            }
            window.localStorage.setItem(AUTH_TOKEN_KEY, authResult.accessToken);

            const user = await getUserInfo(authResult.accessToken);

            resolve(user);
        });
    });
}

const getUserInfo = (accessToken) => {
    return new Promise((resolve, reject) => {
        authClient.client.userInfo(accessToken, function(error, user) {
            if (error) {
                return reject(error);
            }

            // This is only for DEMO purposes and should be removed
            user.roles = ['ADMIN'];
            
            return resolve(user);
        });
    });
}

const getAccessToken = () =>  window.localStorage.getItem(AUTH_TOKEN_KEY);

export default authClient;
export {
    signup,
    login,
    logout,
    fetchUserInfo,
    getUserInfo,
    getAccessToken,
}
