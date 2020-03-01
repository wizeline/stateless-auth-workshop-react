import { useAuth } from '../auth/AuthProvider';

const SecuredContent = ({ children, fallback, role}) => {
    const { isAuthenticated, isAuthorized } = useAuth();

    if (!isAuthenticated || !isAuthorized(role)) {

        if (fallback) {
            return fallback;
        }

        return null;
    };

    return children;
};

export default SecuredContent;
