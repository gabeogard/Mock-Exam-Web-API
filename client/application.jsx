import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Movies} from "./movies";
import {LogIn} from "./logIn";

function FrontPage() {
    return <div>
        <h1>Welcome</h1>
        <ul>
            <li><Link to={"/movies"}>List existing movies</Link></li>
            <li><Link to={"/login"}>Log in</Link></li>
        </ul>
    </div>
}

export function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<Movies/>}/>
            <Route path={"/login"} element={<LogIn/>}/>
        </Routes>
    </BrowserRouter>
}