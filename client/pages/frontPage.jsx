import {Link} from "react-router-dom";
import {useContext} from "react";
import {ExamApiContext} from "../examApiContext";

export function FrontPage() {

    return <div>
        <h1>Welcome</h1>
        <ul>
            <li><Link to={"/login"}>Log in</Link></li>
            <li><Link to={"/profile"}>Profile</Link></li>
        </ul>
    </div>
}