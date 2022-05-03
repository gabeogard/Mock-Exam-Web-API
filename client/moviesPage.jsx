import {Route, Routes, Link} from "react-router-dom";
import {useLoading} from "./useLoading";
import {fetchJSON} from "./application";
import {useState} from "react";


function MoviesLandingPage() {
    return (
        <div className={"nav-wrapper"}>
            <h1>Movies</h1>
            <div>
                <Link to={"/movies/list"}>List movies</Link>
            </div>
            <div>
                <Link to={"/movies/new"}>Add new movie</Link>
            </div>
        </div>
    );
}

function MovieList() {
    const { loading, error, data } = useLoading(async () =>
        fetchJSON("/api/movies")
    );

    if(loading){
        return (<div>Please wait..</div>)
    }
    if(error){
        return (<div>{error.toString()}</div>)
    }

    console.log(data)
    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {data?.map((movies) => (
                    <li key={movies.title}>{movies.title}</li>
                ))}
            </ul>
        </div>
    );
}

function AddMovies() {
    return (
        <div>
            <h1>Add new movie</h1>
        </div>
    )
}

export function MoviesPage() {
    return (
        <Routes>
            <Route path={"/"} element={<MoviesLandingPage/>}/>
            <Route path={"/new"} element={<AddMovies/>}/>
            <Route path={"/list"} element={<MovieList/>}/>
        </Routes>
    );
}