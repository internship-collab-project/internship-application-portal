import {Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();

    if (!auth?.accessToken || !auth?.roles?.some(role => allowedRoles.includes(role))) {
        return <Navigate to="/" replace />
    }
         //this will redirect the user to the login page which is the home page if they are not authenticated


    return (
        <Outlet />
    );
    //this will render the child components if the user is authenticated and has the required roles
};

export default RequireAuth;
