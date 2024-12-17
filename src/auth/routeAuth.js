import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => {
    const token = Cookies.get('token');
    return Boolean(token);
}

export const RouteAuth = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to='/login' replace />
    }
    return children;
}