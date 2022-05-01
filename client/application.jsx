import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LogIn, LogInPage} from "./logIn";
import {Profile} from "./profile";
import {useContext} from "react";
import {ExamApiContext} from "./examApiContext"
import {useLoading} from "./useLoading"
import {FrontPage} from "./frontPage";

export async function postJSON(url, object) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(object)
    })
    if (!res.ok){
        throw new Error(`Failed to post ${res.status}: ${res.statusText}`)
    }
}


export async function fetchJSON(url){
    const res = await fetch(url)
    if(!res.ok){
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`)
    }
    return await res.json()
}

export function Application() {
    const {fetchLogin} = useContext(ExamApiContext)
    const {data, error, loading, reload} = useLoading(fetchLogin)

    if(error){
        return <div>Error: {error.toString()}</div>
    }
    if (loading){
        return <div>Please wait...</div>
    }

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/login/*"} element={<LogInPage config={data.config} reload={reload}/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
}