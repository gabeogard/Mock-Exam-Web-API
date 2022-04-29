import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {LogIn, LogInCallback} from "./logIn";
import {Profile} from "./profile";

function FrontPage() {
    return <div>
        <h1>Welcome</h1>
        <ul>
            <li><Link to={"/login"}>Log in</Link></li>
            <li><Link to={"/profile"}>Profile</Link></li>
        </ul>
    </div>
}

export function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/login"} element={<LogIn/>}/>
            <Route path={"/login/callback"} element={<LogInCallback/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
}