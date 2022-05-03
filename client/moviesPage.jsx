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
        <div>EMPTY</div>
    );
}

export function MoviesPage() {
    return (
        <Routes>
            <Route path={"/"} element={<MoviesLandingPage/>}/>
            <Route path={"/new"} element={<MoviesLandingPage/>}/>
            <Route path={"/list"} element={<MovieList/>}/>
        </Routes>
    );
}