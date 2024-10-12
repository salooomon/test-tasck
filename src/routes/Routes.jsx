import {Route, Routes} from "react-router-dom";
import {MainPage} from "../page/MainPage.jsx";
import {ChangePasswordPage} from "../page/ChangePasswordPage.jsx";
import {PrivateRoute} from "./PrivateRoute.jsx";
import {LoginPage} from "../page/LoginPage.jsx";
import {RegistrationPage} from "../page/RegistrationPage.jsx";


export const useRoutes = () => {
return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage/>} />

        <Route element={<PrivateRoute />} >
            <Route index element={<MainPage/>} />
            <Route path="/" element={<MainPage/>} />
            <Route path="/change" element={<ChangePasswordPage/>}/>
        </Route>
    </Routes>
)

}