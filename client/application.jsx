import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LogInPage} from "./pages/logIn";
import {Profile} from "./pages/profile";
import {useContext} from "react";
import {LoginApiContext} from "./loginApiContext"
import {useLoading} from "./useLoading"
import {FrontPage} from "./pages/frontPage";
import {MoviesPage} from "./moviesPage";

export async function postJSON(url, object) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
    if (!res.ok) {
        throw new Error(`Failed to post ${res.status}: ${res.statusText}`)
    }
}

export class HttpError extends Error {
    constructor(status, statusText) {
        super(statusText);
        this.status = status;
    }
}


export async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

export function Application() {
    const {fetchLogin, endSession, registerLogin} = useContext(LoginApiContext)
    const {data, error, loading, reload} = useLoading(fetchLogin)

    if (error) {
        return <div>Error: {error.toString()}</div>
    }
    if (loading) {
        return <div>Please wait...</div>
    }

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/login/*"} element={<LogInPage config={data?.config} reload={reload}/>}/>
            <Route path={"/profile"} element={<Profile user={data?.user} reload={reload}/>}/>
            <Route path={"/movies/*"} element={<MoviesPage/>}/>
        </Routes>
    </BrowserRouter>
}