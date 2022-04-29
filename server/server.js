import express from 'express'
import * as path from "path";

const app = express()

app.use(express.static(path.resolve("client","..","..","dist")))

app.listen(process.env.PORT || 3000)

