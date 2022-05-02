import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LogInPage} from "./pages/logIn";
import {Profile} from "./pages/profile";
import {useContext} from "react";
import {ExamApiContext} from "./lib/examApiContext"
import {useLoading} from "./lib/useLoading"
import {FrontPage} from "./pages/frontPage";


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
            <Route path={"/"} element={<FrontPage />}/>
            <Route path={"/login/*"} element={<LogInPage reload={reload}/>}/>
            <Route path={"/profile"} element={<Profile user={data?.user} reload={reload}/>}/>
        </Routes>
    </BrowserRouter>
}