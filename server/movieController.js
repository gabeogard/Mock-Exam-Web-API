import { mongoClient } from "./database.js";

export { getMovies, postMovie };

async function getMovies(req, res) {
    const movies = await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("movies")
        .find()
        .map(({ title, year, plot, genres, poster, id, imdb }) => ({
            title,
            year,
            plot,
            genres,
            poster,
            id,
            imdb,
        }))
        .limit(100)
        .toArray();
    return res.json(movies);
}

async function postMovie(req, res) {
    const { title, year, plot, genres, poster, id, imdb } = req.body;
    await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("movies")
        .insertOne({ title, year, plot, genres, poster, id, imdb });
    res.sendStatus(201).json({ message: "Movie added successfully" });
}