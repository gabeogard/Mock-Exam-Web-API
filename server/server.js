import express from 'express'
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {fileURLToPath} from "url"
import { LoginApi } from "./loginApi.js"

dotenv.config()

const app = express()
const file = fileURLToPath(import.meta.url)
const directory = path.dirname(file)

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use(express.static("../client/dist"))
app.use(express.static(path.resolve(directory, "..", "client", "dist")))

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
       res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
       next();
   }
})

app.use("/api/login", LoginApi());

const server = app.listen(process.env.PORT || 3000, () =>{
    console.log(`Started server on http://localhost:${server.address().port}`)
})

