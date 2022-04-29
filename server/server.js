import express from 'express'
import * as path from "path";

const app = express()

app.use(express.static(path.resolve("../dist")))

app.use((req, res, next) => {
    if (req.method === "GET") {
        // TODO: We probably should return 404 instead of index.html for api-calls as well
        res.sendFile(path.resolve("client", "..", "..", "dist", "index.html"));
    } else {
        next();
    }
})

app.listen(process.env.PORT || 3000)

