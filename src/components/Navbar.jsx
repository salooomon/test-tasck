import {Link} from "react-router-dom";
import {getCookie} from "../utils/сookieFunctions.js";

export const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/registration">Регистарция</Link>
                {getCookie("user") ? <Link to="/logout">Logout</Link> : ""}
            </nav>
        </div>
    )
}