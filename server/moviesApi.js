import express from "express";

export function MoviesApi() {
    const movies = [
        {
            title:"Movie"
        },
        {
            title: "Movie2"
        },
        {
            title: "Faggot"
        }
    ]
    const router = new express.Router();
    router.get("/", (req,res) => {
        res.json(movies);
    })

    router.post("/new", (req,res) => {
        res.sendStatus(500)
    })

    return router
}