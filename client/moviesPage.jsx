import {Route, Routes, Link} from "react-router-dom";

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
    return (
        <div>
            <h1>Movie List</h1>
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