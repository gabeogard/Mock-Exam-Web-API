import {BrowserRouter, Link, Route} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Welcome</h1>
        <ul>
            <li><Link to={"/movies"}>List existing movies</Link></li>
            <li><Link to={"/login"}>Log in</Link></li>
        </ul>
    </div>
}

function Movies() {
    return null;
}

export function Application() {
    return <BrowserRouter>
        <Route path={"/"} element={<FrontPage/>}/>
        <Route path={"/movies/*"} element={<Movies/>}/>
    </BrowserRouter>
}