import {useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isAuthenticated} from "../store/storage/authorizationStorage.js";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/сookieFunctions.js";

export const PrivateRoute = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    useEffect( () => {
        dispatch(isAuthenticated("user"));
    }, []);

    const location = useLocation();

    return (
        authState.isAuth === true ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}