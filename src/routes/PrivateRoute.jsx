import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isAuthenticated} from "../store/storage/AuthorizationStorage.js";

export const PrivateRoute = () => {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("user");
        if(isAuthenticated(token).payload === null){
            setAuth(false)
        } else {

            setAuth(true);
        }

    }, [])

    const location = useLocation()

    return (
        isAuth === true ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}