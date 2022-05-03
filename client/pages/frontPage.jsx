import {Link} from "react-router-dom";

export function FrontPage() {

    return <div className={"nav-wrapper"}>
        <h1>Welcome</h1>
        <div><Link to={"/login"}>Log in</Link></div>
        <div><Link to={"/profile"}>Profile</Link></div>
        <div><Link to={"/movies"}>Movies</Link></div>
    </div>
}