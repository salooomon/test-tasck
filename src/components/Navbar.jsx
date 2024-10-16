import {Link, useNavigate} from "react-router-dom";
import {deleteCookie, getCookie} from "../utils/сookieFunctions.js";

export const Navbar = () => {
    const navigate = useNavigate();
    const onLogout = () => {
        deleteCookie("user")
    }
    return (
        <div>
            <nav>
                <Link to="/">Статьи</Link>
                <Link to="/change">Сменить пароль</Link>
                {getCookie("user") ? <Link to="/login" onClick={onLogout}>Выход</Link> : ""}
            </nav>
        </div>
    )
}