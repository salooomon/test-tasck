import {Route, Routes} from "react-router-dom";
// import {MainPage} from "../page/MainPage.jsx";
import {ChangePasswordPage} from "../page/ChangePasswordPage.jsx";

import {LoginPage} from "../page/LoginPage.jsx";
import {RegistrationPage} from "../page/RegistrationPage.jsx";
import {ArticlesPage} from "../page/article/ArticlesPage.jsx";
import {ArticlePage} from "../page/article/ArticlePage.jsx";
import {PrivateRoute} from "./PrivateRoute.jsx";


export const useRoutes = () => {
return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage/>} />

        <Route element={<PrivateRoute />} >
            <Route index element={<ArticlesPage/>} />
            <Route path="/" element={<ArticlesPage/>} />
            <Route path="/article/:id" element={<ArticlePage/>} />
            <Route path="/change" element={<ChangePasswordPage/>}/>
        </Route>
    </Routes>
)

}