import express from "express";
import {MongoClient, ServerApiVersion} from "mongodb";
import { getMovies, postMovie } from "./movieController.js";


export function MoviesApi() {

    const router = new express.Router();
    router.get("/", getMovies);

    router.post("/new", postMovie)

    return router
}